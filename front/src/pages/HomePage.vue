<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useI18nStore } from '@/stores/i18n';
import { RouterLink } from 'vue-router';

const userStore = useUserStore();
const i18n = useI18nStore();

// Фейковые данные для Топа игроков
const topPlayers = [
  { rank: 1, name: 'tourist', rating: 3850, avatar: 'https://ui-avatars.com/api/?name=T&background=ff0000&color=fff' },
  { rank: 2, name: 'Benq', rating: 3600, avatar: 'https://ui-avatars.com/api/?name=B&background=0000ff&color=fff' },
  { rank: 3, name: 'Petr', rating: 3450, avatar: 'https://ui-avatars.com/api/?name=P&background=008000&color=fff' },
];
</script>

<template>
  <main class="flex-1">
    <!-- Hero Section -->
    <section class="relative px-6 py-12 lg:px-20 lg:py-24 flex justify-center items-center min-h-[600px]">
      <div class="max-w-[1200px] w-full">
        <div class="flex flex-col-reverse lg:flex-row gap-16 items-center">
          
          <!-- Левая часть: Текст -->
          <div class="flex flex-col gap-6 flex-1 text-center lg:text-left z-10">
            <template v-if="userStore.user">
              <h1 class="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-white">
                {{ i18n.t('home.hero.authTitlePrefix') }} <span class="text-primary">{{ userStore.user.name }}</span>{{ i18n.t('home.hero.authTitleSuffix') }}
              </h1>
              <p class="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {{ i18n.t('home.hero.ratingLabel') }} <span class="text-white font-bold">1854</span>.
                {{ i18n.t('home.hero.authText') }}
              </p>
              <div class="pt-4 flex justify-center lg:justify-start gap-4">
                <RouterLink to="/contests" class="flex h-12 items-center justify-center rounded-xl px-8 bg-primary hover:bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-500/25 transition-all">
                  {{ i18n.t('home.hero.ctaCatalog') }}
                </RouterLink>
                <RouterLink to="/profile" class="flex h-12 items-center justify-center rounded-xl px-8 bg-surface-dark border border-surface-border hover:bg-surface-highlight text-white text-base font-bold transition-all">
                  {{ i18n.t('home.hero.ctaProfile') }}
                </RouterLink>
              </div>
            </template>

            <template v-else>
              <h1 class="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-white">
                <span class="text-primary">{{ i18n.t('home.hero.guestAccent') }}</span> — {{ i18n.t('home.hero.guestRest') }}
              </h1>
              <p class="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {{ i18n.t('home.hero.guestText') }}
              </p>
              <div class="pt-4 flex justify-center lg:justify-start gap-4">
                <RouterLink to="/auth" class="flex h-12 items-center justify-center rounded-xl px-8 bg-primary hover:bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-500/25 transition-all">
                  {{ i18n.t('home.hero.ctaLogin') }}
                </RouterLink>
                <RouterLink to="/info" class="flex h-12 items-center justify-center rounded-xl px-8 bg-white/10 hover:bg-white/20 text-white text-base font-bold border border-white/10 backdrop-blur-sm transition-all">
                  {{ i18n.t('home.hero.ctaAbout') }}
                </RouterLink>
              </div>
            </template>
          </div>

          <!-- Правая часть: Картинка и Топ игроков -->
          <div class="flex-1 w-full max-w-[600px] relative">
            <div class="aspect-[4/3] w-full bg-gradient-to-br from-surface-dark to-background-dark border border-surface-border rounded-2xl overflow-hidden relative shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
              <img src="https://img.freepik.com/premium-photo/professional-programmer-engineer-writing-code_1029473-73206.jpg" class="w-full h-full object-cover opacity-80 mix-blend-overlay" :alt="i18n.t('common.codingBackground')" />
              <div class="absolute bottom-6 left-6 right-6 p-4 bg-surface-dark/90 backdrop-blur-md rounded-lg border border-surface-border flex items-center gap-4">
                <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined">emoji_events</span>
                </div>
                <div>
                  <p class="text-xs text-text-secondary uppercase font-bold tracking-wider">{{ i18n.t('home.hero.nowTitle') }}</p>
                  <p class="text-sm text-white font-medium">{{ i18n.t('home.hero.nowEvent') }}</p>
                </div>
              </div>
            </div>

            <div class="absolute -bottom-10 -right-4 lg:-right-12 bg-[#111a22] border border-surface-border p-4 rounded-xl shadow-2xl max-w-[260px] w-full hidden sm:block">
              <h3 class="text-white font-bold text-sm mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-yellow-500">trophy</span> {{ i18n.t('home.hero.topTitle') }}
              </h3>
              <div class="flex flex-col gap-3">
                <div v-for="player in topPlayers" :key="player.rank" class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-text-secondary font-bold w-4">{{ player.rank }}</span>
                    <img :src="player.avatar" class="size-6 rounded-full">
                    <span class="text-sm text-white font-medium">{{ player.name }}</span>
                  </div>
                  <span class="text-xs text-primary font-bold">{{ player.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <div class="w-full border-y border-surface-border bg-surface-dark/30">
      <div class="max-w-[1200px] mx-auto px-6 py-12 flex flex-wrap justify-center gap-10 lg:justify-between text-center lg:text-left">
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">500+</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">{{ i18n.t('home.stats.contests') }}</span></div>
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">12k+</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">{{ i18n.t('home.stats.participants') }}</span></div>
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">50+</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">{{ i18n.t('home.stats.countries') }}</span></div>
      </div>
    </div>

    <section class="px-6 py-20 lg:px-20 flex justify-center">
      <div class="max-w-[1200px] w-full flex flex-col gap-12">
        <div class="text-center">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-4">{{ i18n.t('home.features.title') }}</h2>
          <p class="text-text-secondary text-lg max-w-3xl mx-auto">{{ i18n.t('home.features.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col gap-3 hover:border-primary/50 transition-colors">
            <div class="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <span class="material-symbols-outlined text-[28px]">auto_awesome</span>
            </div>
            <h3 class="text-lg font-bold text-white">{{ i18n.t('home.features.cards.picksTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('home.features.cards.picksText') }}</p>
            <div class="flex flex-wrap gap-2 text-[11px] text-slate-300 uppercase tracking-wide">
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.picksTag1') }}</span>
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.picksTag2') }}</span>
            </div>
          </div>
          <div class="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col gap-3 hover:border-primary/50 transition-colors">
            <div class="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <span class="material-symbols-outlined text-[28px]">model_training</span>
            </div>
            <h3 class="text-lg font-bold text-white">{{ i18n.t('home.features.cards.tracksTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('home.features.cards.tracksText') }}</p>
            <div class="flex flex-wrap gap-2 text-[11px] text-slate-300 uppercase tracking-wide">
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.tracksTag1') }}</span>
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.tracksTag2') }}</span>
            </div>
          </div>
          <div class="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col gap-3 hover:border-primary/50 transition-colors">
            <div class="size-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
              <span class="material-symbols-outlined text-[28px]">groups</span>
            </div>
            <h3 class="text-lg font-bold text-white">{{ i18n.t('home.features.cards.leaguesTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('home.features.cards.leaguesText') }}</p>
            <div class="flex flex-wrap gap-2 text-[11px] text-slate-300 uppercase tracking-wide">
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.leaguesTag1') }}</span>
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.leaguesTag2') }}</span>
            </div>
          </div>
          <div class="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col gap-3 hover:border-primary/50 transition-colors">
            <div class="size-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
              <span class="material-symbols-outlined text-[28px]">insights</span>
            </div>
            <h3 class="text-lg font-bold text-white">{{ i18n.t('home.features.cards.analyticsTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('home.features.cards.analyticsText') }}</p>
            <div class="flex flex-wrap gap-2 text-[11px] text-slate-300 uppercase tracking-wide">
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.analyticsTag1') }}</span>
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.analyticsTag2') }}</span>
            </div>
          </div>
          <div class="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col gap-3 hover:border-primary/50 transition-colors">
            <div class="size-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
              <span class="material-symbols-outlined text-[28px]">psychology</span>
            </div>
            <h3 class="text-lg font-bold text-white">{{ i18n.t('home.features.cards.editorialsTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('home.features.cards.editorialsText') }}</p>
            <div class="flex flex-wrap gap-2 text-[11px] text-slate-300 uppercase tracking-wide">
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.editorialsTag1') }}</span>
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.editorialsTag2') }}</span>
            </div>
          </div>
          <div class="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col gap-3 hover:border-primary/50 transition-colors">
            <div class="size-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <span class="material-symbols-outlined text-[28px]">workspace_premium</span>
            </div>
            <h3 class="text-lg font-bold text-white">{{ i18n.t('home.features.cards.achievementsTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('home.features.cards.achievementsText') }}</p>
            <div class="flex flex-wrap gap-2 text-[11px] text-slate-300 uppercase tracking-wide">
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.achievementsTag1') }}</span>
              <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10">{{ i18n.t('home.features.cards.achievementsTag2') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="px-6 pb-20 lg:px-20 flex justify-center">
      <div class="max-w-[1200px] w-full flex flex-col gap-10">
        <div class="text-center">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-4">{{ i18n.t('home.formats.title') }}</h2>
          <p class="text-text-secondary text-lg max-w-3xl mx-auto">{{ i18n.t('home.formats.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-[#111a22] border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-xl font-bold text-white">{{ i18n.t('home.formats.cards.sprintsTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('home.formats.cards.sprintsText') }}</p>
            <div class="text-xs text-slate-300 uppercase tracking-wide">{{ i18n.t('home.formats.cards.sprintsMeta') }}</div>
          </div>
          <div class="bg-[#111a22] border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-xl font-bold text-white">{{ i18n.t('home.formats.cards.leaguesTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('home.formats.cards.leaguesText') }}</p>
            <div class="text-xs text-slate-300 uppercase tracking-wide">{{ i18n.t('home.formats.cards.leaguesMeta') }}</div>
          </div>
          <div class="bg-[#111a22] border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-xl font-bold text-white">{{ i18n.t('home.formats.cards.marathonsTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('home.formats.cards.marathonsText') }}</p>
            <div class="text-xs text-slate-300 uppercase tracking-wide">{{ i18n.t('home.formats.cards.marathonsMeta') }}</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
