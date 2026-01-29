<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user/model/store';
import { useI18nStore } from '@/entities/i18n/model/store';

const userStore = useUserStore();
const i18n = useI18nStore();
const router = useRouter();

const hasAccess = computed(() => {
  const roles = userStore.user?.roles ?? [];
  return roles.includes('admin') || roles.includes('organizer');
});

const form = ref({
  title: '',
  date: '',
  time: '',
  platform: 'CodeQuest',
  difficulty: 'medium'
});

const platformOptions = ['Codeforces', 'AtCoder', 'LeetCode', 'ICPC', 'HackerRank', 'CodeQuest'];
const difficultyOptions = ['easy', 'beginner', 'medium', 'intermediate', 'hard', 'mixed', 'sprint'];
const error = ref<string | null>(null);

const submit = () => {
  error.value = null;
  if (!form.value.title || !form.value.date || !form.value.time) {
    error.value = i18n.t('contests.createRequired');
    return;
  }
  alert(i18n.t('contests.createSuccess'));
  router.push('/contests');
};

const cancel = () => {
  router.push('/contests');
};
</script>

<template>
  <main class="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
    <div v-if="!userStore.user" class="w-full max-w-[800px] bg-surface-dark border border-surface-border rounded-2xl p-8 text-center">
      <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ i18n.t('admin.loginTitle') }}</h1>
      <p class="text-text-secondary mb-6">{{ i18n.t('admin.loginText') }}</p>
      <RouterLink to="/auth" class="inline-flex h-11 items-center justify-center rounded-xl px-6 bg-primary hover:bg-blue-600 text-white text-sm font-bold">
        {{ i18n.t('header.login') }}
      </RouterLink>
    </div>

    <div v-else-if="!hasAccess" class="w-full max-w-[800px] bg-surface-dark border border-surface-border rounded-2xl p-8 text-center">
      <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ i18n.t('admin.accessDeniedTitle') }}</h1>
      <p class="text-text-secondary mb-6">{{ i18n.t('admin.accessDeniedText') }}</p>
      <RouterLink to="/contests" class="inline-flex h-11 items-center justify-center rounded-xl px-6 bg-surface-highlight border border-surface-border text-white text-sm font-bold">
        {{ i18n.t('contests.title') }}
      </RouterLink>
    </div>

    <div v-else class="w-full max-w-[900px] flex flex-col gap-8">
      <section class="rounded-2xl border border-surface-border bg-[#111a22] p-6 sm:p-8">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl sm:text-4xl font-black text-white">{{ i18n.t('contests.addModalTitle') }}</h1>
          <p class="text-text-secondary">{{ i18n.t('contests.createNote') }}</p>
        </div>
      </section>

      <section class="bg-surface-dark border border-surface-border rounded-2xl p-6 sm:p-8">
        <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="submit">
          <label class="flex flex-col gap-2 md:col-span-2">
            <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('contests.addNameLabel') }}</span>
            <input
              v-model="form.title"
              type="text"
              :placeholder="i18n.t('contests.addNamePlaceholder')"
              class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm focus:ring-primary focus:border-primary"
            />
          </label>
          <label class="flex flex-col gap-2">
            <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('contests.addDate') }}</span>
            <input v-model="form.date" type="date" class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm" />
          </label>
          <label class="flex flex-col gap-2">
            <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('contests.addTime') }}</span>
            <input v-model="form.time" type="time" class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm" />
          </label>
          <label class="flex flex-col gap-2">
            <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('common.platform') }}</span>
            <select v-model="form.platform" class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm">
              <option v-for="platform in platformOptions" :key="platform" :value="platform">{{ platform }}</option>
            </select>
          </label>
          <label class="flex flex-col gap-2">
            <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('common.difficulty') }}</span>
            <select v-model="form.difficulty" class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm">
              <option v-for="difficulty in difficultyOptions" :key="difficulty" :value="difficulty">{{ i18n.t(`contests.difficulty.${difficulty}`) }}</option>
            </select>
          </label>
          <div class="md:col-span-2 flex flex-col sm:flex-row gap-3 mt-2">
            <button type="submit" class="flex-1 h-11 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 transition-colors">
              {{ i18n.t('contests.addCreate') }}
            </button>
            <button type="button" @click="cancel" class="flex-1 h-11 rounded-lg bg-surface-highlight border border-surface-border text-white font-bold hover:bg-surface-border transition-colors">
              {{ i18n.t('contests.addCancel') }}
            </button>
          </div>
          <p v-if="error" class="md:col-span-2 text-sm text-red-400">{{ error }}</p>
        </form>
      </section>
    </div>
  </main>
</template>
