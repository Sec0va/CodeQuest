<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useI18nStore } from '@/stores/i18n';

const userStore = useUserStore();
const i18n = useI18nStore();
</script>

<template>
  <main class="flex-1">
    <section class="relative px-6 py-12 lg:px-20 lg:py-24 flex justify-center">
      <div class="max-w-[1200px] w-full">
        <div class="flex flex-col-reverse lg:flex-row gap-16 items-center">
          <div class="flex flex-col gap-6 flex-1 text-center lg:text-left">
            <h1 class="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-white">
              <span class="text-primary">{{ i18n.t('info.hero.accent') }}</span> — {{ i18n.t('info.hero.rest') }}
            </h1>
            <p class="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {{ i18n.t('info.hero.text1') }}
            </p>
            <p class="text-base md:text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {{ i18n.t('info.hero.text2') }}
            </p>
            <div class="pt-4 flex justify-center lg:justify-start gap-4">
              <RouterLink to="/contests" class="flex h-12 items-center justify-center rounded-xl px-8 bg-primary hover:bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-500/25 transition-all">
                {{ i18n.t('info.hero.cta') }}
              </RouterLink>
            </div>
          </div>
          <div class="flex-1 w-full max-w-[600px]">
            <div class="aspect-[4/3] w-full bg-gradient-to-br from-surface-dark to-background-dark border border-surface-border rounded-2xl overflow-hidden relative shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
              <img src="https://img.freepik.com/premium-vector/coding-programmer-work-flat-design-illustration_272430-624.jpg" class="w-full h-full object-cover opacity-80 mix-blend-overlay" :alt="i18n.t('common.codingBackground')" />
              <div class="absolute bottom-6 left-6 right-6 p-4 bg-surface-dark/90 backdrop-blur-md rounded-lg border border-surface-border flex items-center gap-4">
                <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined">emoji_events</span>
                </div>
                <div>
                  <p class="text-xs text-text-secondary uppercase font-bold tracking-wider">{{ i18n.t('info.hero.nowTitle') }}</p>
                  <p class="text-sm text-white font-medium">{{ i18n.t('info.hero.nowEvent') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="w-full border-y border-surface-border bg-surface-dark/30">
      <div class="max-w-[1200px] mx-auto px-6 py-12 flex flex-wrap justify-center gap-10 lg:justify-between text-center lg:text-left">
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">500+</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">{{ i18n.t('info.stats.contests') }}</span></div>
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">12k+</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">{{ i18n.t('info.stats.participants') }}</span></div>
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">50+</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">{{ i18n.t('info.stats.countries') }}</span></div>
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">24/7</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">{{ i18n.t('info.stats.monitoring') }}</span></div>
      </div>
    </div>

    <section class="px-6 py-20 lg:px-20 flex justify-center">
      <div class="max-w-[1200px] w-full flex flex-col gap-12">
        <div class="text-center mb-2">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-4">{{ i18n.t('info.principles.title') }}</h2>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto">{{ i18n.t('info.principles.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('info.principles.transparencyTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('info.principles.transparencyText') }}</p>
          </div>
          <div class="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('info.principles.beginnersTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('info.principles.beginnersText') }}</p>
          </div>
          <div class="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('info.principles.communityTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('info.principles.communityText') }}</p>
          </div>
          <div class="bg-surface-dark border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('info.principles.practiceTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('info.principles.practiceText') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-6 py-20 lg:px-20 flex justify-center bg-background-dark">
      <div class="max-w-[1200px] w-full flex flex-col gap-12">
        <div class="text-center mb-4">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-4">{{ i18n.t('info.how.title') }}</h2>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto">{{ i18n.t('info.how.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-surface-dark border border-surface-border p-8 rounded-2xl flex flex-col gap-4 hover:border-primary/50 transition-colors group">
            <div class="size-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"><span class="material-symbols-outlined text-[32px]">search</span></div>
            <h3 class="text-xl font-bold text-white">{{ i18n.t('info.how.step1Title') }}</h3>
            <p class="text-text-secondary leading-relaxed">{{ i18n.t('info.how.step1Text') }}</p>
          </div>
          <div class="bg-surface-dark border border-surface-border p-8 rounded-2xl flex flex-col gap-4 hover:border-primary/50 transition-colors group">
            <div class="size-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform"><span class="material-symbols-outlined text-[32px]">calendar_add_on</span></div>
            <h3 class="text-xl font-bold text-white">{{ i18n.t('info.how.step2Title') }}</h3>
            <p class="text-text-secondary leading-relaxed">{{ i18n.t('info.how.step2Text') }}</p>
          </div>
          <div class="bg-surface-dark border border-surface-border p-8 rounded-2xl flex flex-col gap-4 hover:border-primary/50 transition-colors group">
            <div class="size-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform"><span class="material-symbols-outlined text-[32px]">trending_up</span></div>
            <h3 class="text-xl font-bold text-white">{{ i18n.t('info.how.step3Title') }}</h3>
            <p class="text-text-secondary leading-relaxed">{{ i18n.t('info.how.step3Text') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-6 py-20 lg:px-20 flex justify-center">
      <div class="max-w-[1200px] w-full flex flex-col gap-12">
        <div class="text-center mb-2">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-4">{{ i18n.t('info.inside.title') }}</h2>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto">{{ i18n.t('info.inside.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-[#111a22] border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('info.inside.feedTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('info.inside.feedText') }}</p>
          </div>
          <div class="bg-[#111a22] border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('info.inside.calendarTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('info.inside.calendarText') }}</p>
          </div>
          <div class="bg-[#111a22] border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('info.inside.ratingTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('info.inside.ratingText') }}</p>
          </div>
          <div class="bg-[#111a22] border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('info.inside.editorialsTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('info.inside.editorialsText') }}</p>
          </div>
          <div class="bg-[#111a22] border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('info.inside.teamsTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('info.inside.teamsText') }}</p>
          </div>
          <div class="bg-[#111a22] border border-surface-border p-6 rounded-2xl flex flex-col gap-3">
            <h3 class="text-lg font-bold text-white">{{ i18n.t('info.inside.supportTitle') }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ i18n.t('info.inside.supportText') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-6 py-20 lg:px-20 flex justify-center">
      <div class="max-w-[1200px] w-full rounded-3xl bg-primary relative overflow-hidden flex flex-col items-center justify-center text-center p-10 lg:p-20 gap-6 shadow-2xl shadow-primary/20">
        <div class="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <h2 class="text-3xl lg:text-5xl font-black text-white relative z-10 max-w-2xl">{{ i18n.t('info.cta.title') }}</h2>
        <div class="flex gap-4 relative z-10 mt-4">
          <template v-if="!userStore.user">
             <RouterLink to="/auth" class="flex h-12 items-center justify-center rounded-xl px-8 bg-white text-primary text-base font-bold hover:bg-slate-100 transition-all shadow-lg">
                {{ i18n.t('info.cta.register') }}
             </RouterLink>
          </template>
          <template v-else>
             <RouterLink to="/contests" class="flex h-12 items-center justify-center rounded-xl px-8 bg-white text-primary text-base font-bold hover:bg-slate-100 transition-all shadow-lg">
                {{ i18n.t('info.cta.toContests') }}
             </RouterLink>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>
