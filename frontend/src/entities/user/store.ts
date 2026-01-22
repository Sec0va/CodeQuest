import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface User {
  username: string;
  email: string;
  handle: string;
  location: string;
  avatar?: string | null;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  const init = () => {
    const stored = localStorage.getItem('codequest_user');
    if (stored) {
      try {
        user.value = JSON.parse(stored);
      } catch (e) {
        console.error("Ошибка парсинга пользователя", e);
        localStorage.removeItem('codequest_user');
      }
    }
  };

  const login = (userData: User) => {
    user.value = userData;
    localStorage.setItem('codequest_user', JSON.stringify(userData));
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('codequest_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates };
      localStorage.setItem('codequest_user', JSON.stringify(user.value));
    }
  };

  const avatarUrl = computed(() => {
    if (user.value?.avatar) return user.value.avatar;
    return `https://ui-avatars.com/api/?background=2b8cee&color=fff&size=128&name=${user.value?.username || 'User'}`;
  });

  return { user, init, login, logout, updateProfile, avatarUrl };
});