<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user/store';

const userStore = useUserStore();
const router = useRouter();
const showNotifs = ref(false);

const handleLogout = () => {
  userStore.logout();
  router.push('/');
};
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-surface-border bg-[#111a22]/95 backdrop-blur-sm">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Логотип -->
      <RouterLink to="/" class="flex items-center gap-4 text-white cursor-pointer group">
        <div class="flex items-center justify-center size-8 rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-[20px]">terminal</span>
        </div>
        <h2 class="text-white text-xl font-bold leading-tight tracking-tight">CodeQuest</h2>
      </RouterLink>
      
      <!-- Навигация (Desktop) -->
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink to="/" class="text-sm transition-colors hover:text-white" active-class="text-white font-bold" :class="{'text-text-secondary font-medium': $route.path !== '/'}">Главная</RouterLink>
        <RouterLink to="/contests" class="text-sm transition-colors hover:text-white" active-class="text-white font-bold" :class="{'text-text-secondary font-medium': $route.path !== '/contests'}">Соревнования</RouterLink>
        <RouterLink to="/calendar" class="text-sm transition-colors hover:text-white" active-class="text-white font-bold" :class="{'text-text-secondary font-medium': $route.path !== '/calendar'}">Календарь</RouterLink>
        <RouterLink to="/info" class="text-sm transition-colors hover:text-white" active-class="text-white font-bold" :class="{'text-text-secondary font-medium': $route.path !== '/info'}">О нас</RouterLink>
      </nav>

      <!-- Авторизация / Профиль -->
      <div class="flex items-center gap-4">
        <template v-if="userStore.user">
          <!-- Уведомления -->
          <div class="relative">
            <button @click="showNotifs = !showNotifs" class="flex items-center justify-center rounded-full size-10 hover:bg-surface-dark text-white transition-colors relative">
              <span class="material-symbols-outlined">notifications</span>
              <span class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-background-dark"></span>
            </button>
            <div v-if="showNotifs" class="absolute right-0 mt-2 w-64 bg-surface-dark border border-surface-border rounded-xl shadow-xl z-50 p-4 animate-fadeIn">
              <h4 class="text-white font-bold text-sm mb-2">Уведомления</h4>
              <p class="text-text-secondary text-xs">Здесь пока пусто. Мы сообщим, когда появятся новые соревнования!</p>
            </div>
          </div>
          
          <!-- Аватар -->
          <RouterLink to="/profile" class="relative cursor-pointer group">
            <div class="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary" :style="{ backgroundImage: `url('${userStore.avatarUrl}')` }"></div>
          </RouterLink>

          <!-- Выход -->
          <button @click="handleLogout" class="flex items-center justify-center gap-2 rounded-lg h-9 px-3 bg-surface-dark hover:bg-red-900/50 border border-surface-border hover:border-red-500/50 text-white text-xs font-bold transition-all ml-2">
            <span class="material-symbols-outlined text-[16px]">logout</span>
          </button>
        </template>
        
        <template v-else>
          <RouterLink to="/auth" class="hidden md:flex items-center justify-center rounded-lg h-9 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all shadow-lg shadow-primary/20">
            <span>Войти</span>
          </RouterLink>
          <RouterLink to="/auth" class="md:hidden text-white">
            <span class="material-symbols-outlined">login</span>
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>