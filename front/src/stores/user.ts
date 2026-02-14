import {defineStore} from 'pinia';
import {useStorage} from '@vueuse/core';
import {API_BASE} from '@/shared/config/api';

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    avatar?: string | null;
    location?: string | null;
    rating?: number;
    participations?: number;
    solved?: number;
}

export const useUserStore = defineStore('user', () => {
    // useStorage автоматически сохраняет данные в localStorage
    const user = useStorage<User | null>('codequest_user', null, localStorage, {mergeDefaults: true});
    const token = useStorage<string | null>('codequest_token', null, localStorage);
    const apiBase = API_BASE;

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

    async function apiPost<T>(path: string, payload: Record<string, unknown>) {
        return apiFetch<T>(path, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }

    async function fetchUser() {
        try {
            const userData = await apiFetch<User>('/api/auth/me');
            user.value = { ...userData };
        } catch (e) {
           // console.error('Failed to fetch user', e);
           // Optional: clear user if unauthorized
           // logout();
        }
    }

    async function login(identifier: string, password: string) {
        // identifier assumed to be email for now
        const data = await apiPost<{
            token: string;
            user: {
                id: string;
                name: string;
                email: string;
                role: string;
                avatar?: string;
                location?: string;
                rating?: number;
                participations?: number;
                solved?: number;
            }
        }>('/api/auth/login', {email: identifier, password});
        token.value = data.token;
        user.value = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            avatar: data.user.avatar || null,
            location: data.user.location || null,
            rating: data.user.rating || 0,
            participations: data.user.participations || 0,
            solved: data.user.solved || 0
        };
    }

    async function register(data: {
        name: string;
        email: string;
        password: string;
        location?: string | null;
        avatar?: string | null
    }) {
        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            location: data.location || null,
            avatar: data.avatar || null
        };

        await apiPost<{ message: string; userId: string }>('/api/auth/register', payload);

        // Auto login
        await login(data.email, data.password);
    }

    async function logout() {
        try {
            await apiPost('/api/auth/logout', {});
        } catch (e) {
            console.error('Logout failed', e);
        } finally {
            user.value = null;
            token.value = null;
        }
    }

    function updateProfile(updatedData: Partial<User>) {
        if (user.value) {
            user.value = {...user.value, ...updatedData};
        }
    }

    return {user, login, register, logout, updateProfile, fetchUser};
});
