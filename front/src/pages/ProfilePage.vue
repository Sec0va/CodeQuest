<script setup lang="ts">
import {ref} from 'vue';
import {useUserStore} from '@/stores/user';
import {useI18nStore} from '@/stores/i18n';
import EditProfileModal from '@/features/profile/ui/EditProfileModal.vue';

const userStore = useUserStore();
const isEditOpen = ref(false);
const i18n = useI18nStore();
</script>

<template>
  <main class="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
    <div v-if="userStore.user" class="w-full max-w-[1100px] flex flex-col gap-8">
      <section class="rounded-xl bg-surface-dark border border-surface-highlight p-6 sm:p-8 shadow-sm">
        <div class="flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div class="flex items-center gap-6">
            <div
                class="bg-center bg-no-repeat bg-cover rounded-full size-24 sm:size-32 ring-4 ring-background-dark bg-slate-700"
                :style="{ backgroundImage: `url('${userStore.user.avatar || 'https://ui-avatars.com/api/?background=2b8cee&color=fff&size=128&name=' + userStore.user.name}')` }"></div>
            <div class="flex flex-col gap-1">
              <h1 class="text-white text-2xl sm:text-3xl font-bold leading-tight">{{ userStore.user.name }}</h1>
              <p class="text-primary text-base sm:text-lg font-medium">@{{ userStore.user.name }}</p>
              <div class="flex items-center gap-1 text-text-secondary text-sm">
                <span class="material-symbols-outlined text-[16px]">location_on</span>
                <span>{{ userStore.user.location || i18n.t('authForm.locationDefault') }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
            <button @click="isEditOpen = true"
                    class="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-surface-highlight hover:bg-[#2e455c] text-white text-sm font-bold transition-colors w-full sm:w-auto">
              <span class="material-symbols-outlined text-[20px]">edit</span>
              <span>{{ i18n.t('profile.edit') }}</span>
            </button>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 flex flex-col gap-2">
          <p class="text-sm font-medium uppercase tracking-wider text-text-secondary">{{ i18n.t('profile.rating') }}</p>
          <p class="text-white text-4xl font-bold">{{ userStore.user.rating || 0 }}</p>
        </div>
        <div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 flex flex-col gap-2">
          <p class="text-sm font-medium uppercase tracking-wider text-text-secondary">
            {{ i18n.t('profile.participations') }}</p>
          <p class="text-white text-4xl font-bold">{{ userStore.user.participations || 0 }}</p>
        </div>
        <div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 flex flex-col gap-2">
          <p class="text-sm font-medium uppercase tracking-wider text-text-secondary">{{ i18n.t('profile.solved') }}</p>
          <p class="text-white text-4xl font-bold">{{ userStore.user.solved || 0 }}</p>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 flex flex-col gap-6">
          <h3 class="text-xl font-bold text-white">{{ i18n.t('profile.history') }}</h3>
          <div class="flex flex-col gap-3">
            <div
                class="bg-surface-dark border border-surface-highlight rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="size-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                  <span class="material-symbols-outlined">emoji_events</span>
                </div>
                <div>
                  <h4 class="font-bold text-white">Codeforces Round #920</h4>
                  <p class="text-xs text-text-secondary">{{ i18n.t('profile.historyItemDate') }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <p class="text-sm font-bold text-white">{{ i18n.t('profile.rankLabel') }} 234</p>
                  <p class="text-xs text-green-400">{{ i18n.t('profile.ratingDelta') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <h3 class="text-xl font-bold text-white">{{ i18n.t('profile.achievements') }}</h3>
          <div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 grid grid-cols-3 gap-4">
            <div class="flex flex-col items-center gap-2 text-center group cursor-help">
              <div
                  class="size-12 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center border border-yellow-500/30">
                <span class="material-symbols-outlined text-[24px]">local_fire_department</span>
              </div>
              <span class="text-xs text-white font-medium">{{ i18n.t('profile.streak') }}</span>
            </div>
            <div class="flex flex-col items-center gap-2 text-center group cursor-help">
              <div
                  class="size-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center border border-blue-500/30">
                <span class="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <span class="text-xs text-white font-medium">{{ i18n.t('profile.pro') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 text-text-secondary">
      {{ i18n.t('profile.loginPrompt') }}
    </div>

    <!-- Edit Profile Modal -->
    <EditProfileModal
        v-if="isEditOpen"
        :is-open="isEditOpen"
        @close="isEditOpen = false"
    />
  </main>
</template>
