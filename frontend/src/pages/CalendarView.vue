<script setup lang="ts">
import { ref } from 'vue';
import AddEventModal from '@/features/modals/AddEventModal.vue';
import ContestModal from '@/features/modals/ContestModal.vue';

const showAddModal = ref(false);
const showContestModal = ref(false);
const selectedContest = ref(null);

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const offset = 3; // Январь 2026 начинается с четверга

// Моковые события в календаре
const events: Record<number, any> = {
  5: { title: 'Codeforces Round', type: 'cf', details: { title: 'Codeforces Round #920', platform: 'Codeforces', time: '5 Января, 17:35', diff: 'Div 2', desc: 'Классический раунд.', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4' } },
  14: { title: 'LeetCode Weekly', type: 'lc', details: { title: 'Weekly Contest', platform: 'LeetCode', time: '14 Января, 08:00', diff: 'Mix', desc: 'Еженедельный контест.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5' } }
};

const handleEventClick = (day: number) => {
  if (events[day]) {
    selectedContest.value = events[day].details;
    showContestModal.value = true;
  }
};
</script>

<template>
  <div class="flex flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-8 flex-col gap-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 class="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-white">Январь 2026</h1>
      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <button @click="showAddModal = true" class="flex h-12 px-6 items-center justify-center gap-2 rounded-xl bg-primary text-white text-base font-bold hover:bg-blue-600 transition-colors ml-2 shadow-lg shadow-blue-900/20">
          <span class="material-symbols-outlined text-[20px]">add</span>
          <span>Добавить событие</span>
        </button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="flex flex-col bg-[#111a22] rounded-xl border border-surface-border overflow-hidden shadow-2xl">
      <div class="grid grid-cols-7 border-b border-surface-border bg-surface-dark">
        <div v-for="d in ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']" :key="d" class="py-3 text-center text-xs sm:text-sm font-bold text-slate-300 uppercase">{{ d }}</div>
      </div>
      <div class="grid grid-cols-7 auto-rows-[minmax(120px,1fr)] gap-px bg-surface-border">
        <!-- Пустые ячейки смещения -->
        <div v-for="i in offset" :key="`empty-${i}`" class="bg-[#111a22] p-2 min-h-[120px] opacity-50"></div>
        <!-- Дни -->
        <div v-for="day in days" :key="day" class="bg-[#111a22] p-2 min-h-[120px] relative group hover:bg-[#16212e] transition-colors">
          <span class="text-slate-300 text-sm font-bold group-hover:text-white">{{ day }}</span>
          <div v-if="events[day]" @click.stop="handleEventClick(day)" 
               class="w-full rounded px-2 py-1 mt-1 cursor-pointer transition-colors border-l-2"
               :class="events[day].type === 'cf' ? 'bg-primary/20 border-primary hover:bg-primary/30' : 'bg-purple-500/20 border-purple-500 hover:bg-purple-500/30'">
            <p class="text-xs text-white truncate font-medium">{{ events[day].title }}</p>
          </div>
        </div>
      </div>
    </div>

    <AddEventModal :isOpen="showAddModal" @close="showAddModal = false" />
    <ContestModal :isOpen="showContestModal" :data="selectedContest" @close="showContestModal = false" />
  </div>
</template>