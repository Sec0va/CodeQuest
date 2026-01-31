<script setup lang="ts">
import { ref } from 'vue';
import CalendarGrid from '@/widgets/CalendarGrid.vue';
import { useUserStore } from '@/stores/user';
import { useI18nStore } from '@/stores/i18n';
import { useRouter } from 'vue-router';

const isAddModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const selectedEvent = ref<any>(null);
const userStore = useUserStore();
const router = useRouter();
const i18n = useI18nStore();

const handleOpenEvent = (event: any) => {
    selectedEvent.value = event;
    isDetailModalOpen.value = true;
};

const registerForEvent = () => {
    if (!userStore.user) {
        if (confirm(i18n.t('calendar.registerConfirm'))) {
            router.push('/auth');
        }
        return;
    }
    alert(i18n.t('calendar.registerSuccess'));
    isDetailModalOpen.value = false;
};

const saveNewEvent = () => {
    isAddModalOpen.value = false;
}
</script>

<template>
  <div class="flex flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-8 flex-col gap-8 relative">
     <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 class="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-white">{{ i18n.t('calendar.monthTitle') }}</h1>
        <button @click="isAddModalOpen = true" class="flex h-12 px-6 items-center justify-center gap-2 rounded-xl bg-primary text-white text-base font-bold hover:bg-blue-600 transition-colors ml-2 shadow-lg shadow-blue-900/20">
          <span class="material-symbols-outlined text-[20px]">add</span>
          <span>{{ i18n.t('calendar.addEvent') }}</span>
        </button>
     </div>
     
     <CalendarGrid @open-event="handleOpenEvent" />
     
     <div v-if="isDetailModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0" @click="isDetailModalOpen = false"></div>
        <div class="bg-[#111a22] border border-surface-border w-full max-w-lg rounded-2xl shadow-2xl flex flex-col relative animate-fadeIn overflow-hidden z-10 ring-1 ring-white/10">
          <div class="h-40 w-full relative">
             <img :src="selectedEvent.img" class="w-full h-full object-cover opacity-60">
             <div class="absolute inset-0 bg-gradient-to-t from-[#111a22] to-transparent"></div>
             <button @click="isDetailModalOpen = false" class="absolute top-3 right-3 bg-black/50 hover:bg-black/80 rounded-full p-1.5 text-white transition-colors cursor-pointer z-20">
                <span class="material-symbols-outlined text-[20px]">close</span>
             </button>
             <div class="absolute bottom-3 left-6 right-6">
                <span class="text-primary font-bold tracking-widest text-[10px] uppercase mb-1 block">{{ selectedEvent.platform }}</span>
                <h2 class="text-2xl font-bold text-white leading-tight shadow-black drop-shadow-md">{{ selectedEvent.title }}</h2>
             </div>
          </div>
          <div class="p-6 bg-[#111a22]">
              <p class="text-slate-300 text-sm leading-relaxed mb-6">{{ selectedEvent.desc }}</p>
              <button @click="registerForEvent" class="w-full h-11 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                  {{ i18n.t('contests.register') }}
              </button>
          </div>
        </div>
     </div>

     <div v-if="isAddModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0" @click="isAddModalOpen = false"></div>
        <div class="bg-[#111a22] border border-surface-border w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fadeIn z-10">
           <h3 class="text-xl font-bold text-white mb-6">{{ i18n.t('calendar.addModalTitle') }}</h3>
           <div class="flex flex-col gap-4">
               <input :placeholder="i18n.t('calendar.addPlaceholder')" class="w-full h-10 rounded-lg bg-surface-dark border-surface-border text-white px-3 text-sm" />
               <button @click="saveNewEvent" class="w-full h-10 bg-primary text-white font-bold rounded-lg mt-2">{{ i18n.t('common.save') }}</button>
           </div>
        </div>
     </div>
  </div>
</template>
