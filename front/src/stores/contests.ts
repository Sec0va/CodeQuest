import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import {useStorage} from '@vueuse/core';
import {useUserStore} from '@/stores/user';
import {API_BASE} from '@/shared/config/api';

export interface Contest {
    id: string;
    title: string;
    platform: string;
    startTime: string;
    duration?: string | null;
    url?: string | null;
    description?: string | null;
    difficulty?: string | null;
    icon?: string | null;
    imageUrl?: string | null;
    background?: string | null;
}

export const useContestsStore = defineStore('contests', () => {
    const userStore = useUserStore();
    const contests = ref<Contest[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const apiBase = API_BASE;
    const token = useStorage<string | null>('codequest_token', null, localStorage);
    const favoritesByUser = useStorage<Record<string, string[]>>('codequest_favorites', {}, localStorage);

    const favoritesKey = computed(() => (userStore.user?.id ? `user:${userStore.user.id}` : 'guest'));
    const favoriteIds = computed(() => favoritesByUser.value[favoritesKey.value] ?? []);
    const favoritesCount = computed(() => favoriteIds.value.length);
    const favoriteContests = computed(() =>
        contests.value.filter((contest) => favoriteIds.value.includes(contest.id))
    );

    const setFavoriteIds = (ids: string[]) => {
        favoritesByUser.value = {
            ...favoritesByUser.value,
            [favoritesKey.value]: ids
        };
    };

    const toggleFavorite = (id: string) => {
        const ids = new Set(favoriteIds.value);
        if (ids.has(id)) {
            ids.delete(id);
        } else {
            ids.add(id);
        }
        setFavoriteIds(Array.from(ids));
    };

    const isFavorite = (id: string) => favoriteIds.value.includes(id);

    const clearFavorites = () => {
        if (!favoriteIds.value.length) return;
        setFavoriteIds([]);
    };

    async function apiFetch<T>(path: string, options: RequestInit = {}) {
        const response = await fetch(`${apiBase}${path}`, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(token.value ? {'Authorization': `Bearer ${token.value}`} : {}),
                ...options.headers
            },
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data?.message ?? 'Request failed');
        }
        return data as T;
    }

    async function fetchContests() {
        loading.value = true;
        error.value = null;
        try {
            const data = await apiFetch<Contest[]>('/api/contests');
            contests.value = Array.isArray(data) ? data : [];
        } catch (e: any) {
            error.value = e?.message ?? 'Failed to load contests';
        } finally {
            loading.value = false;
        }
    }

    async function createContest(payload: Omit<Contest, 'id'>) {
        loading.value = true;
        error.value = null;
        try {
            const created = await apiFetch<Contest>('/api/contests', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            contests.value = [created, ...contests.value];
            return created;
        } catch (e: any) {
            error.value = e?.message ?? 'Failed to create contest';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function deleteContest(id: string) {
        loading.value = true;
        error.value = null;
        try {
            await apiFetch(`/api/contests/${id}`, {
                method: 'DELETE'
            });
            contests.value = contests.value.filter((contest) => contest.id !== id);
            if (favoriteIds.value.includes(id)) {
                setFavoriteIds(favoriteIds.value.filter((favId) => favId !== id));
            }
        } catch (e: any) {
            error.value = e?.message ?? 'Failed to delete contest';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    return {
        contests,
        loading,
        error,
        favoriteIds,
        favoritesCount,
        favoriteContests,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        fetchContests,
        createContest,
        deleteContest
    };
});
