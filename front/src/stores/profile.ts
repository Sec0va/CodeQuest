import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { API_BASE } from '@/shared/config/api';

export interface ProfileStats {
    rating: number;
    participations: number;
    solved: number;
    wins: number;
}

export interface ProfileHistoryItem {
    id: string;
    contestId: string;
    title: string;
    platform: string;
    startTime: string;
    rank: number;
    ratingDelta: number;
    solved: number;
    isWinner: boolean;
}

export interface ProfileResponse {
    stats: ProfileStats;
    history: ProfileHistoryItem[];
}

export const useProfileStore = defineStore('profile', () => {
    const stats = ref<ProfileStats | null>(null);
    const history = ref<ProfileHistoryItem[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const apiBase = API_BASE;
    const token = useStorage<string | null>('codequest_token', null, localStorage);

    async function apiFetch<T>(path: string, options: RequestInit = {}) {
        const response = await fetch(`${apiBase}${path}`, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(token.value ? { 'Authorization': `Bearer ${token.value}` } : {}),
                ...options.headers
            }
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data?.message ?? 'Request failed');
        }
        return data as T;
    }

    async function fetchProfile() {
        loading.value = true;
        error.value = null;
        try {
            const data = await apiFetch<ProfileResponse>('/api/profile');
            stats.value = data?.stats ?? null;
            history.value = Array.isArray(data?.history) ? data.history : [];
        } catch (e: any) {
            error.value = e?.message ?? 'Failed to load profile';
        } finally {
            loading.value = false;
        }
    }

    function reset() {
        stats.value = null;
        history.value = [];
        error.value = null;
        loading.value = false;
    }

    return { stats, history, loading, error, fetchProfile, reset };
});
