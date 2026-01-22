<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/entities/user/store';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const isEditModalOpen = ref(false);
const editForm = ref({ username: '', handle: '', location: '' });

onMounted(() => {
  if (!userStore.user) {
    router.push('/auth');
  } else {
    syncEditForm();
  }
});

const syncEditForm = () => {
  if (userStore.user) {
    editForm.value = { ...userStore.user };
  }
};

const saveProfile = () => {
  userStore.updateProfile(editForm.value);
  isEditModalOpen.value = false;
};
</script>

<template>
  <main v-if="userStore.user" class="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
    <div class="w-full max-w-[1100px] flex flex-col gap-8">
      <!-- Profile Header -->
      <section class="rounded-xl bg-surface-dark border border-surface-highlight p-6 sm:p-8 shadow-sm">
        <div class="flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div class="flex items-center gap-6">
            <div class="bg-center bg-no-repeat bg-cover rounded-full size-24 sm:size-32 ring-4 ring-background-dark bg-slate-700" :style="{ backgroundImage: `url('${userStore.avatarUrl}')` }"></div>
            <div class="flex flex-col gap-1">
              <h1 class="text-white text-2xl sm:text-3xl font-bold leading-tight">{{ userStore.user.username }}</h1>
              <p class="text-primary text-base sm:text-lg font-medium">{{ userStore.user.handle }}</p>
              <div class="flex items-center gap-1 text-text-secondary text-sm">
                <span class="material-symbols-outlined text-[16px]">location_on</span>
                <span>{{ userStore.user.location }}</span>
              </div>
            </div>
          </div>
          <button @click="isEditModalOpen = true" class="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-surface-highlight hover:bg-[#2e455c] text-white text-sm font-bold transition-colors w-full sm:w-auto mt-4 md:mt-0">
            <span class="material-symbols-outlined text-[20px]">edit</span><span>Редактировать</span>
          </button>
        </div>
      </section>

      <!-- Stats -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 flex flex-col gap-2">
          <p class="text-sm font-medium uppercase tracking-wider text-text-secondary">Рейтинг</p>
          <p class="text-white text-4xl font-bold">1854</p>
        </div>
        <div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 flex flex-col gap-2">
          <p class="text-sm font-medium uppercase tracking-wider text-text-secondary">Участий</p>
          <p class="text-white text-4xl font-bold">42</p>
        </div>
        <div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 flex flex-col gap-2">
          <p class="text-sm font-medium uppercase tracking-wider text-text-secondary">Решено задач</p>
          <p class="text-white text-4xl font-bold">530</p>
        </div>
      </section>

      <!-- History & Achievements -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 flex flex-col gap-6">
          <h3 class="text-xl font-bold text-white">История соревнований</h3>
          <div class="flex flex-col gap-3">
            <div class="bg-surface-dark border border-surface-highlight rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="size-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                  <span class="material-symbols-outlined">emoji_events</span>
                </div>
                <div>
                  <h4 class="font-bold text-white">Codeforces Round #920</h4>
                  <p class="text-xs text-text-secondary">15 Января 2026</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold text-white">Rank: 234</p>
                <p class="text-xs text-green-400">+45 rating</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <h3 class="text-xl font-bold text-white">Достижения</h3>
          <div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 grid grid-cols-3 gap-4">
            <div class="flex flex-col items-center gap-2 text-center group cursor-help">
              <div class="size-12 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center border border-yellow-500/30">
                <span class="material-symbols-outlined text-[24px]">local_fire_department</span>
              </div>
              <span class="text-xs text-white font-medium">Стрик</span>
            </div>
            <div class="flex flex-col items-center gap-2 text-center group cursor-help">
              <div class="size-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center border border-blue-500/30">
                <span class="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <span class="text-xs text-white font-medium">Pro</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="isEditModalOpen = false"></div>
      <div class="bg-[#111a22] border border-surface-highlight w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
        <h3 class="text-xl font-bold text-white mb-4">Редактировать профиль</h3>
        <div class="flex flex-col gap-4">
          <label class="flex flex-col gap-1">
            <span class="text-sm text-text-secondary">Имя пользователя</span>
            <input v-model="editForm.username" class="rounded-lg bg-surface-dark border-surface-highlight text-white focus:ring-primary focus:border-primary" />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm text-text-secondary">Хэндл (@login)</span>
            <input v-model="editForm.handle" class="rounded-lg bg-surface-dark border-surface-highlight text-white focus:ring-primary focus:border-primary" />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm text-text-secondary">Город / Страна</span>
            <input v-model="editForm.location" class="rounded-lg bg-surface-dark border-surface-highlight text-white focus:ring-primary focus:border-primary" />
          </label>
          <div class="flex gap-3 mt-2">
            <button @click="saveProfile" class="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-2 rounded-lg">Сохранить</button>
            <button @click="isEditModalOpen = false" class="flex-1 bg-surface-dark hover:bg-surface-highlight text-white font-bold py-2 rounded-lg border border-surface-highlight">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>