
<script setup lang="ts">
import {computed, ref} from 'vue';
import {useUserStore} from '@/stores/user';
import {useI18nStore} from '@/stores/i18n';
import {RouterLink} from 'vue-router';

const userStore = useUserStore();
const i18n = useI18nStore();
const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001';

const hasAccess = computed(() => {
  return userStore.user?.role === 'admin';
});

const assignForm = ref({
  identifier: '',
  role: 'admin',
  adminKey: localStorage.getItem('codequest_admin_key') ?? ''
});
const assignError = ref<string | null>(null);
const assignSuccess = ref<string | null>(null);
const isAssigning = ref(false);

const submitAssign = async () => {
  assignError.value = null;
  assignSuccess.value = null;

  if (!assignForm.value.identifier || !assignForm.value.role || !assignForm.value.adminKey) {
    assignError.value = i18n.t('admin.assignRequired');
    return;
  }

  try {
    isAssigning.value = true;
    localStorage.setItem('codequest_admin_key', assignForm.value.adminKey);
    const response = await fetch(`${apiBase}/api/admin/assign-role`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(assignForm.value)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.message ?? i18n.t('admin.assignFailed'));
    }
    assignSuccess.value = i18n.t('admin.assignSuccess');
  } catch (error) {
    assignError.value = error instanceof Error ? error.message : i18n.t('admin.assignFailed');
  } finally {
    isAssigning.value = false;
  }
};
</script>

<template>
  <main class="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
    <div v-if="!userStore.user"
         class="w-full max-w-[800px] bg-surface-dark border border-surface-border rounded-2xl p-8 text-center">
      <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ i18n.t('admin.loginTitle') }}</h1>
      <p class="text-text-secondary mb-6">{{ i18n.t('admin.loginText') }}</p>
      <RouterLink to="/auth"
                  class="inline-flex h-11 items-center justify-center rounded-xl px-6 bg-primary hover:bg-blue-600 text-white text-sm font-bold">
        {{ i18n.t('header.login') }}
      </RouterLink>
    </div>

    <div v-else-if="!hasAccess"
         class="w-full max-w-[800px] bg-surface-dark border border-surface-border rounded-2xl p-8 text-center">
      <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ i18n.t('admin.accessDeniedTitle') }}</h1>
      <p class="text-text-secondary">{{ i18n.t('admin.accessDeniedText') }}</p>
    </div>

    <div v-else class="w-full max-w-[1200px] flex flex-col gap-8">
      <section class="rounded-2xl border border-surface-border bg-[#111a22] p-6 sm:p-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-3xl sm:text-4xl font-black text-white">{{ i18n.t('admin.title') }}</h1>
            <p class="text-text-secondary mt-2 max-w-2xl">{{ i18n.t('admin.subtitle') }}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs uppercase tracking-widest text-primary font-bold">{{ i18n.t('admin.badge') }}</span>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-surface-dark border border-surface-border rounded-xl p-5">
          <p class="text-xs text-text-secondary uppercase tracking-wide">{{ i18n.t('admin.stats.users') }}</p>
          <p class="text-3xl font-black text-white mt-2">0</p>
        </div>
        <div class="bg-surface-dark border border-surface-border rounded-xl p-5">
          <p class="text-xs text-text-secondary uppercase tracking-wide">{{ i18n.t('admin.stats.contests') }}</p>
          <p class="text-3xl font-black text-white mt-2">0</p>
        </div>
        <div class="bg-surface-dark border border-surface-border rounded-xl p-5">
          <p class="text-xs text-text-secondary uppercase tracking-wide">{{ i18n.t('admin.stats.reports') }}</p>
          <p class="text-3xl font-black text-white mt-2">0</p>
        </div>
        <div class="bg-surface-dark border border-surface-border rounded-xl p-5">
          <p class="text-xs text-text-secondary uppercase tracking-wide">{{ i18n.t('admin.stats.roles') }}</p>
          <p class="text-3xl font-black text-white mt-2">3</p>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-surface-dark border border-surface-border rounded-2xl p-6">
          <h2 class="text-xl font-bold text-white mb-4">{{ i18n.t('admin.assignTitle') }}</h2>
          <form class="grid grid-cols-1 md:grid-cols-3 gap-4" @submit.prevent="submitAssign">
            <label class="flex flex-col gap-2 md:col-span-2">
              <span class="text-xs uppercase tracking-wide text-text-secondary">{{
                  i18n.t('admin.assignIdentifier')
                }}</span>
              <input
                  v-model="assignForm.identifier"
                  class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm focus:ring-primary focus:border-primary"
                  :placeholder="i18n.t('admin.assignPlaceholder')"
              />
            </label>
            <label class="flex flex-col gap-2">
              <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('admin.assignRole') }}</span>
              <select v-model="assignForm.role"
                      class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm">
                <option value="admin">{{ i18n.t('admin.roles.admin') }}</option>
                <option value="organizer">{{ i18n.t('admin.roles.organizer') }}</option>
                <option value="user">{{ i18n.t('admin.roles.user') }}</option>
              </select>
            </label>
            <label class="flex flex-col gap-2 md:col-span-2">
              <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('admin.assignKey') }}</span>
              <input
                  v-model="assignForm.adminKey"
                  class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm focus:ring-primary focus:border-primary"
                  type="password"
                  placeholder="dev-admin-key"
              />
            </label>
            <div class="flex items-end">
              <button :disabled="isAssigning"
                      class="h-11 w-full rounded-lg bg-primary text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                {{ i18n.t('admin.assignSubmit') }}
              </button>
            </div>
          </form>
          <p v-if="assignError" class="mt-3 text-sm text-red-400">{{ assignError }}</p>
          <p v-if="assignSuccess" class="mt-3 text-sm text-green-400">{{ assignSuccess }}</p>
        </div>
        <div class="bg-[#111a22] border border-surface-border rounded-2xl p-6">
          <h3 class="text-lg font-bold text-white mb-3">{{ i18n.t('admin.statusTitle') }}</h3>
          <div class="flex flex-col gap-3 text-sm text-text-secondary">
            <div class="flex items-center justify-between">
              <span>{{ i18n.t('admin.status.api') }}</span>
              <span class="text-green-400 font-semibold">OK</span>
            </div>
            <div class="flex items-center justify-between">
              <span>{{ i18n.t('admin.status.database') }}</span>
              <span class="text-green-400 font-semibold">OK</span>
            </div>
            <div class="flex items-center justify-between">
              <span>{{ i18n.t('admin.status.version') }}</span>
              <span class="text-slate-300">0.1</span>
            </div>
          </div>
          <p class="mt-4 text-xs text-text-secondary">{{ i18n.t('admin.comingSoon') }}</p>
        </div>
      </section>
    </div>
  </main>
</template>
