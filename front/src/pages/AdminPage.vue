<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
import {useUserStore} from '@/stores/user';
import {useI18nStore} from '@/stores/i18n';
import {RouterLink} from 'vue-router';
import {API_BASE} from '@/shared/config/api';

const userStore = useUserStore();
const i18n = useI18nStore();

type ServiceStatus = 'ok' | 'down' | 'loading' | 'unknown';
type AdminSummary = {
  users: number;
  contests: number;
  results: number;
  roles: number;
};

type UserSummary = {
  id: string;
  name: string;
  email: string;
  role: string;
  rating: number;
  participations: number;
  solved: number;
};

const apiBase = API_BASE;

const hasAccess = computed(() => {
  return userStore.user?.role === 'admin';
});

const storedAdminKey = localStorage.getItem('codequest_admin_key');
const normalizedAdminKey = storedAdminKey === 'admin' || !storedAdminKey ? 'dev-admin-key' : storedAdminKey;
if (normalizedAdminKey !== storedAdminKey) {
  localStorage.setItem('codequest_admin_key', normalizedAdminKey);
}
const adminKey = ref(normalizedAdminKey);

const status = ref({
  api: 'loading' as ServiceStatus,
  database: 'loading' as ServiceStatus,
  version: '-'
});
const statusError = ref<string | null>(null);
let statusInterval: number | undefined;

const summary = ref<AdminSummary>({
  users: 0,
  contests: 0,
  results: 0,
  roles: 0
});
const summaryError = ref<string | null>(null);
const isSummaryLoading = ref(false);

const users = ref<UserSummary[]>([]);
const usersError = ref<string | null>(null);
const isUsersLoading = ref(false);

const assignForm = ref({
  identifier: '',
  role: 'admin'
});
const assignError = ref<string | null>(null);
const assignSuccess = ref<string | null>(null);
const isAssigning = ref(false);

const awardForm = ref({
  identifier: '',
  contestId: '',
  rank: 1,
  ratingDelta: 0,
  solved: 0
});
const awardError = ref<string | null>(null);
const awardSuccess = ref<string | null>(null);
const isAwarding = ref(false);

const statusLabel = (value: ServiceStatus) => {
  const labels = i18n.tm('admin.statusValues') as Record<string, string> | undefined;
  if (labels && value in labels) {
    return labels[value];
  }
  if (value === 'ok') return 'OK';
  if (value === 'down') return 'Down';
  if (value === 'loading') return '...';
  return '-';
};

const statusClass = (value: ServiceStatus) => {
  if (value === 'ok') return 'text-green-400 font-semibold';
  if (value === 'down') return 'text-red-400 font-semibold';
  if (value === 'loading') return 'text-slate-400';
  return 'text-slate-400';
};

const normalizeStatus = (value: unknown): ServiceStatus => {
  if (value === 'ok') return 'ok';
  if (value === 'down') return 'down';
  return 'unknown';
};

const roleLabel = (value: string) => {
  const roles = i18n.tm('admin.roles') as Record<string, string> | undefined;
  if (roles && value in roles) {
    return roles[value];
  }
  return value;
};

const adminFetch = async <T>(path: string, options: RequestInit = {}) => {
  if (!adminKey.value) {
    throw new Error(i18n.t('admin.keyRequired'));
  }
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': adminKey.value,
      ...options.headers
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message ?? i18n.t('admin.requestFailed'));
  }
  return data as T;
};

const fetchSummary = async () => {
  summaryError.value = null;
  isSummaryLoading.value = true;
  try {
    const data = await adminFetch<AdminSummary>('/api/admin/summary');
    summary.value = {
      users: Number.isFinite(data?.users) ? data.users : 0,
      contests: Number.isFinite(data?.contests) ? data.contests : 0,
      results: Number.isFinite(data?.results) ? data.results : 0,
      roles: Number.isFinite(data?.roles) ? data.roles : 0
    };
  } catch (error) {
    summaryError.value = error instanceof Error ? error.message : i18n.t('admin.summaryFailed');
  } finally {
    isSummaryLoading.value = false;
  }
};

const fetchUsers = async () => {
  usersError.value = null;
  isUsersLoading.value = true;
  try {
    const data = await adminFetch<{ users: UserSummary[] }>('/api/admin/users?limit=8');
    users.value = Array.isArray(data?.users) ? data.users : [];
  } catch (error) {
    usersError.value = error instanceof Error ? error.message : i18n.t('admin.usersFailed');
  } finally {
    isUsersLoading.value = false;
  }
};

const refreshAdminData = async () => {
  summaryError.value = null;
  usersError.value = null;
  if (!adminKey.value) {
    summaryError.value = i18n.t('admin.keyRequired');
    return;
  }
  localStorage.setItem('codequest_admin_key', adminKey.value);
  await Promise.all([fetchSummary(), fetchUsers()]);
};

const fetchStatus = async (silent = false) => {
  statusError.value = null;
  if (!silent) {
    status.value = {
      ...status.value,
      api: 'loading',
      database: 'loading'
    };
  }
  try {
    const response = await fetch(`${apiBase}/api/status`, {credentials: 'include'});
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.message ?? 'Status request failed');
    }
    status.value = {
      api: normalizeStatus(data?.api),
      database: normalizeStatus(data?.database),
      version: typeof data?.version === 'string' && data.version.trim() ? data.version : '-'
    };
  } catch (error) {
    status.value = {
      ...status.value,
      api: 'down',
      database: 'unknown'
    };
    statusError.value = i18n.t('admin.statusError');
  }
};

onMounted(() => {
  fetchStatus();
  statusInterval = window.setInterval(() => fetchStatus(true), 30000);
  if (adminKey.value) {
    refreshAdminData();
  }
});

onBeforeUnmount(() => {
  if (statusInterval) {
    window.clearInterval(statusInterval);
  }
});

const submitAssign = async () => {
  assignError.value = null;
  assignSuccess.value = null;

  if (!assignForm.value.identifier || !assignForm.value.role || !adminKey.value) {
    assignError.value = i18n.t('admin.assignRequired');
    return;
  }

  try {
    isAssigning.value = true;
    localStorage.setItem('codequest_admin_key', adminKey.value);
    await adminFetch('/api/admin/assign-role', {
      method: 'POST',
      body: JSON.stringify(assignForm.value)
    });
    assignSuccess.value = i18n.t('admin.assignSuccess');
    await refreshAdminData();
  } catch (error) {
    assignError.value = error instanceof Error ? error.message : i18n.t('admin.assignFailed');
  } finally {
    isAssigning.value = false;
  }
};

const submitAward = async () => {
  awardError.value = null;
  awardSuccess.value = null;

  if (!awardForm.value.identifier || !awardForm.value.contestId || !adminKey.value) {
    awardError.value = i18n.t('admin.awardRequired');
    return;
  }

  try {
    isAwarding.value = true;
    localStorage.setItem('codequest_admin_key', adminKey.value);
    await adminFetch('/api/admin/award-win', {
      method: 'POST',
      body: JSON.stringify({
        identifier: awardForm.value.identifier,
        contestId: awardForm.value.contestId,
        rank: Number(awardForm.value.rank),
        ratingDelta: Number(awardForm.value.ratingDelta),
        solved: Number(awardForm.value.solved)
      })
    });
    awardSuccess.value = i18n.t('admin.awardSuccess');
    await refreshAdminData();
  } catch (error) {
    awardError.value = error instanceof Error ? error.message : i18n.t('admin.awardFailed');
  } finally {
    isAwarding.value = false;
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

      <section class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <p class="text-xs uppercase tracking-widest text-text-secondary">{{ i18n.t('admin.statsTitle') }}</p>
          <button
              class="text-xs font-semibold text-primary hover:text-blue-300"
              @click="refreshAdminData"
          >
            {{ i18n.t('admin.refresh') }}
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-surface-dark border border-surface-border rounded-xl p-5">
            <p class="text-xs text-text-secondary uppercase tracking-wide">{{ i18n.t('admin.stats.users') }}</p>
            <p class="text-3xl font-black text-white mt-2">{{ isSummaryLoading ? '...' : summary.users }}</p>
          </div>
          <div class="bg-surface-dark border border-surface-border rounded-xl p-5">
            <p class="text-xs text-text-secondary uppercase tracking-wide">{{ i18n.t('admin.stats.contests') }}</p>
            <p class="text-3xl font-black text-white mt-2">{{ isSummaryLoading ? '...' : summary.contests }}</p>
          </div>
          <div class="bg-surface-dark border border-surface-border rounded-xl p-5">
            <p class="text-xs text-text-secondary uppercase tracking-wide">{{ i18n.t('admin.stats.results') }}</p>
            <p class="text-3xl font-black text-white mt-2">{{ isSummaryLoading ? '...' : summary.results }}</p>
          </div>
          <div class="bg-surface-dark border border-surface-border rounded-xl p-5">
            <p class="text-xs text-text-secondary uppercase tracking-wide">{{ i18n.t('admin.stats.roles') }}</p>
            <p class="text-3xl font-black text-white mt-2">{{ isSummaryLoading ? '...' : summary.roles }}</p>
          </div>
        </div>
        <p v-if="summaryError" class="text-xs text-red-400">{{ summaryError }}</p>
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
                  v-model="adminKey"
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
              <span :class="statusClass(status.api)">{{ statusLabel(status.api) }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span>{{ i18n.t('admin.status.database') }}</span>
              <span :class="statusClass(status.database)">{{ statusLabel(status.database) }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span>{{ i18n.t('admin.status.version') }}</span>
              <span class="text-slate-300">{{ status.version }}</span>
            </div>
          </div>
          <p v-if="statusError" class="mt-4 text-xs text-red-400">{{ statusError }}</p>
          <p v-else class="mt-4 text-xs text-text-secondary">{{ i18n.t('admin.comingSoon') }}</p>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-surface-dark border border-surface-border rounded-2xl p-6">
          <h2 class="text-xl font-bold text-white mb-4">{{ i18n.t('admin.awardTitle') }}</h2>
          <form class="grid grid-cols-1 md:grid-cols-3 gap-4" @submit.prevent="submitAward">
            <label class="flex flex-col gap-2 md:col-span-2">
              <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('admin.awardIdentifier') }}</span>
              <input
                  v-model="awardForm.identifier"
                  class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm focus:ring-primary focus:border-primary"
                  :placeholder="i18n.t('admin.assignPlaceholder')"
              />
            </label>
            <label class="flex flex-col gap-2">
              <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('admin.awardRank') }}</span>
              <input
                  v-model.number="awardForm.rank"
                  type="number"
                  min="1"
                  class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm"
              />
            </label>
            <label class="flex flex-col gap-2 md:col-span-2">
              <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('admin.awardContest') }}</span>
              <input
                  v-model="awardForm.contestId"
                  class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm"
                  placeholder="contest-id"
              />
            </label>
            <label class="flex flex-col gap-2">
              <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('admin.awardSolved') }}</span>
              <input
                  v-model.number="awardForm.solved"
                  type="number"
                  min="0"
                  class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm"
              />
            </label>
            <label class="flex flex-col gap-2 md:col-span-2">
              <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('admin.awardRatingDelta') }}</span>
              <input
                  v-model.number="awardForm.ratingDelta"
                  type="number"
                  class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm"
              />
            </label>
            <label class="flex flex-col gap-2">
              <span class="text-xs uppercase tracking-wide text-text-secondary">{{ i18n.t('admin.assignKey') }}</span>
              <input
                  v-model="adminKey"
                  type="password"
                  class="h-11 rounded-lg bg-surface-highlight border border-surface-border text-white px-3 text-sm"
                  placeholder="dev-admin-key"
              />
            </label>
            <div class="flex items-end">
              <button :disabled="isAwarding"
                      class="h-11 w-full rounded-lg bg-primary text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                {{ i18n.t('admin.awardSubmit') }}
              </button>
            </div>
          </form>
          <p v-if="awardError" class="mt-3 text-sm text-red-400">{{ awardError }}</p>
          <p v-if="awardSuccess" class="mt-3 text-sm text-green-400">{{ awardSuccess }}</p>
        </div>
        <div class="bg-[#111a22] border border-surface-border rounded-2xl p-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('admin.usersTitle') }}</h3>
            <button class="text-xs font-semibold text-primary hover:text-blue-300" @click="fetchUsers">
              {{ i18n.t('admin.refresh') }}
            </button>
          </div>
          <div v-if="usersError" class="text-xs text-red-400">{{ usersError }}</div>
          <div v-else-if="isUsersLoading" class="text-xs text-text-secondary">{{ i18n.t('admin.loading') }}</div>
          <div v-else-if="!users.length" class="text-xs text-text-secondary">{{ i18n.t('admin.usersEmpty') }}</div>
          <div v-else class="flex flex-col gap-3 text-sm">
            <div v-for="user in users" :key="user.id" class="flex items-center justify-between border-b border-surface-border pb-2">
              <div>
                <p class="text-white font-semibold">{{ user.name }}</p>
                <p class="text-xs text-text-secondary">{{ user.email }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs uppercase tracking-wide text-text-secondary">{{ roleLabel(user.role) }}</p>
                <p class="text-sm font-bold text-primary">{{ user.rating }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
