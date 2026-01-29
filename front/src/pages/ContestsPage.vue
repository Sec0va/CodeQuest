<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user/model/store';
import { useI18nStore } from '@/entities/i18n/model/store';
import BaseModal from '@/shared/ui/BaseModal.vue';

const router = useRouter();
const userStore = useUserStore();
const i18n = useI18nStore();

const isContestModalOpen = ref(false);

const selectedContestId = ref<string | null>(null);

const contestItems = [
  {
    id: 'cf930',
    titleKey: 'contests.items.cf930.title',
    descKey: 'contests.items.cf930.desc',
    platform: 'Codeforces',
    time: '14:30',
    diff: 'medium',
    icon: 'code',
    badgeClass: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'atcoder369',
    titleKey: 'contests.items.atcoder369.title',
    descKey: 'contests.items.atcoder369.desc',
    platform: 'AtCoder',
    time: '20:00',
    diff: 'easy',
    icon: 'rocket_launch',
    badgeClass: 'bg-green-500/10 border-green-500/20 text-green-400',
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'lc402',
    titleKey: 'contests.items.lc402.title',
    descKey: 'contests.items.lc402.desc',
    platform: 'LeetCode',
    time: '17:00',
    diff: 'sprint',
    icon: 'timer',
    badgeClass: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'icpc',
    titleKey: 'contests.items.icpc.title',
    descKey: 'contests.items.icpc.desc',
    platform: 'ICPC',
    time: '12:00',
    diff: 'hard',
    icon: 'groups',
    badgeClass: 'bg-red-500/10 border-red-500/20 text-red-400',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'hr',
    titleKey: 'contests.items.hr.title',
    descKey: 'contests.items.hr.desc',
    platform: 'HackerRank',
    time: '09:30',
    diff: 'intermediate',
    icon: 'bolt',
    badgeClass: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'cq3',
    titleKey: 'contests.items.cq3.title',
    descKey: 'contests.items.cq3.desc',
    platform: 'CodeQuest',
    time: '19:00',
    diff: 'mixed',
    icon: 'emoji_events',
    badgeClass: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop'
  }
];

const query = ref('');
const platformFilter = ref('all');
const difficultyFilter = ref('all');

const platformOptions = computed(() => {
  return Array.from(new Set(contestItems.map((item) => item.platform)));
});

const difficultyOptions = computed(() => {
  return Array.from(new Set(contestItems.map((item) => item.diff)));
});

const mapContest = (item: typeof contestItems[number]) => {
  return {
    ...item,
    title: i18n.t(item.titleKey),
    desc: i18n.t(item.descKey),
    diffLabel: i18n.t(`contests.difficulty.${item.diff}`)
  };
};

const filteredContests = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase();
  return contestItems
    .filter((item) => {
      if (platformFilter.value !== 'all' && item.platform !== platformFilter.value) return false;
      if (difficultyFilter.value !== 'all' && item.diff !== difficultyFilter.value) return false;
      if (!normalizedQuery) return true;
      const title = i18n.t(item.titleKey).toLowerCase();
      return title.includes(normalizedQuery);
    })
    .map(mapContest);
});

const selectedContest = computed(() => {
  const item = contestItems.find((contest) => contest.id === selectedContestId.value);
  return item ? mapContest(item) : null;
});

const canCreateContest = computed(() => {
  const roles = userStore.user?.roles ?? [];
  return roles.includes('admin') || roles.includes('organizer');
});

const openContestModal = (id: string) => {
  selectedContestId.value = id;
  isContestModalOpen.value = true;
};

const goToCreatePage = () => {
  router.push('/contests/create');
};

const registerForEvent = () => {
  if (!userStore.user) {
    if (confirm(i18n.t('contests.registerConfirm'))) {
      router.push('/auth');
    }
    return;
  }
  alert(i18n.t('contests.registerSuccess'));
  isContestModalOpen.value = false;
};

const resetFilters = () => {
  query.value = '';
  platformFilter.value = 'all';
  difficultyFilter.value = 'all';
};
</script>

<template>
  <div class="flex-1 flex justify-center w-full px-4 md:px-10 py-6 md:py-10">
    <div class="flex flex-col max-w-[1200px] w-full gap-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 class="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-white">{{ i18n.t('contests.title') }}</h1>
        <button v-if="canCreateContest" @click="goToCreatePage" class="flex h-12 px-6 items-center justify-center gap-2 rounded-xl bg-primary text-white text-base font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
          <span class="material-symbols-outlined text-[20px]">add</span>
          <span>{{ i18n.t('contests.create') }}</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 rounded-xl border border-surface-border bg-[#111a22] p-4">
        <label class="flex flex-col gap-2 lg:col-span-2">
          <span class="text-xs text-text-secondary font-semibold uppercase tracking-wide">{{ i18n.t('common.search') }}</span>
          <div class="relative">
            <span class="material-symbols-outlined text-slate-400 text-[18px] absolute left-3 top-1/2 -translate-y-1/2">search</span>
            <input
              v-model="query"
              :placeholder="i18n.t('contests.searchPlaceholder')"
              class="w-full h-11 rounded-lg bg-surface-dark border border-surface-border text-white pl-10 pr-3 text-sm focus:ring-primary focus:border-primary"
            />
          </div>
        </label>
        <label class="flex flex-col gap-2">
          <span class="text-xs text-text-secondary font-semibold uppercase tracking-wide">{{ i18n.t('common.platform') }}</span>
          <select v-model="platformFilter" class="w-full h-11 rounded-lg bg-surface-dark border border-surface-border text-white px-3 text-sm">
            <option value="all">{{ i18n.t('contests.platformAll') }}</option>
            <option v-for="platform in platformOptions" :key="platform" :value="platform">{{ platform }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-2">
          <span class="text-xs text-text-secondary font-semibold uppercase tracking-wide">{{ i18n.t('common.difficulty') }}</span>
          <select v-model="difficultyFilter" class="w-full h-11 rounded-lg bg-surface-dark border border-surface-border text-white px-3 text-sm">
            <option value="all">{{ i18n.t('contests.difficultyAll') }}</option>
            <option v-for="difficulty in difficultyOptions" :key="difficulty" :value="difficulty">{{ i18n.t(`contests.difficulty.${difficulty}`) }}</option>
          </select>
        </label>
        <div class="lg:col-span-4 flex justify-end">
          <button @click="resetFilters" class="h-10 px-4 rounded-lg border border-surface-border bg-surface-dark text-text-secondary hover:text-white hover:border-primary transition-colors text-xs font-bold">
            {{ i18n.t('contests.reset') }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="contest in filteredContests"
          :key="contest.id"
          @click="openContestModal(contest.id)"
          class="cursor-pointer flex flex-col gap-4 rounded-xl border border-surface-border bg-[#192633] p-5 hover:border-primary hover:shadow-lg transition-all duration-300 group"
        >
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-white text-[32px]">{{ contest.icon }}</span>
              <div><p class="text-xs text-[#92adc9] uppercase font-semibold">{{ i18n.t('common.platform') }}</p><p class="text-white font-bold text-sm">{{ contest.platform }}</p></div>
            </div>
            <span class="px-2.5 py-1 rounded-md border text-xs font-bold uppercase" :class="contest.badgeClass">{{ contest.diffLabel }}</span>
          </div>
          <div class="py-2 flex-1">
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{{ contest.title }}</h3>
            <div class="flex items-center gap-2 text-[#92adc9] text-sm"><span class="material-symbols-outlined text-[18px]">calendar_month</span><span>{{ contest.time }}</span></div>
          </div>
          <div class="w-full bg-surface-border h-[1px]"></div>
          <button class="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">{{ i18n.t('common.details') }}</button>
        </div>
      </div>
    </div>

    <!-- Contest Modal -->
    <BaseModal :is-open="isContestModalOpen" @close="isContestModalOpen = false" class="!p-0 !max-w-2xl">
      <div v-if="selectedContest" class="flex flex-col">
        <div class="h-48 w-full relative">
          <img :src="selectedContest.img" class="w-full h-full object-cover opacity-60" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#111a22] to-transparent"></div>
          <button @click="isContestModalOpen = false" class="absolute top-4 right-4 bg-black/50 hover:bg-black/80 rounded-full p-2 text-white transition-colors backdrop-blur-md">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div class="absolute bottom-4 left-8">
            <span class="text-primary font-bold tracking-widest text-xs uppercase mb-1 block">{{ selectedContest.platform }}</span>
            <h2 class="text-3xl font-bold text-white shadow-black drop-shadow-lg">{{ selectedContest.title }}</h2>
          </div>
        </div>
        <div class="p-8 pb-4 bg-[#111a22]">
          <div class="flex flex-wrap gap-4 mb-6">
            <div class="flex items-center gap-2 text-text-secondary bg-surface-dark px-3 py-1.5 rounded-lg border border-surface-border">
              <span class="material-symbols-outlined text-[18px]">schedule</span><span class="text-sm font-medium">{{ selectedContest.time }}</span>
            </div>
            <div class="flex items-center gap-2 text-text-secondary bg-surface-dark px-3 py-1.5 rounded-lg border border-surface-border">
              <span class="material-symbols-outlined text-[18px]">signal_cellular_alt</span><span class="text-sm font-medium">{{ selectedContest.diffLabel }}</span>
            </div>
          </div>
          <div class="prose prose-invert max-w-none">
            <h4 class="text-white font-bold mb-2 text-lg">{{ i18n.t('contests.aboutTitle') }}</h4>
            <p class="text-slate-300 text-sm leading-relaxed">{{ selectedContest.desc }}</p>
          </div>
        </div>
        <div class="p-6 border-t border-surface-border flex gap-4 bg-[#16212e]">
          <button @click="registerForEvent" class="flex-1 h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            <span class="material-symbols-outlined">how_to_reg</span>{{ i18n.t('contests.register') }}
          </button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
