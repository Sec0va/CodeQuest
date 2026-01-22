<script setup lang="ts">
import { ref } from 'vue';
import AddEventModal from '@/features/modals/AddEventModal.vue';
import ContestModal from '@/features/modals/ContestModal.vue';

const showAddModal = ref(false);
const showInfoModal = ref(false);
const selectedContest = ref(null);

const openContest = (contest: any) => {
  selectedContest.value = contest;
  showInfoModal.value = true;
};

const contests = [
  {
    title: 'Codeforces Round #930',
    platform: 'Codeforces',
    time: 'Сегодня, 14:30',
    diff: 'Средний (Div 2)',
    desc: 'Это рейтинговый раунд для второго дивизиона. Включает 6 задач возрастающей сложности. У вас будет 2 часа на решение.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop',
    icon: 'code',
    colorClass: 'yellow'
  },
  {
    title: 'Weekly Contest 386',
    platform: 'LeetCode',
    time: 'Завтра, 08:00',
    diff: 'Смешанный',
    desc: 'Еженедельный контест LeetCode. Состоит из 4 задач: Easy, Medium, Medium, Hard. Отличный способ подготовиться к интервью.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    icon: 'terminal',
    colorClass: 'purple'
  },
  // Можно добавить больше моковых данных
];
</script>

<template>
  <div class="flex-1 flex justify-center w-full px-4 md:px-10 py-6 md:py-10">
    <div class="flex flex-col max-w-[1200px] w-full gap-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 class="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-white">Предстоящие соревнования</h1>
        <button @click="showAddModal = true" class="flex h-12 px-6 items-center justify-center gap-2 rounded-xl bg-primary text-white text-base font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
          <span class="material-symbols-outlined text-[20px]">add</span>
          <span>Создать турнир</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="c in contests" :key="c.title" @click="openContest(c)" class="cursor-pointer flex flex-col gap-4 rounded-xl border border-surface-border bg-[#192633] p-5 hover:border-primary hover:shadow-lg transition-all duration-300 group">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-white text-[32px]">{{ c.icon }}</span>
              <div>
                <p class="text-xs text-[#92adc9] uppercase font-semibold">Платформа</p>
                <p class="text-white font-bold text-sm">{{ c.platform }}</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-md text-xs font-bold uppercase" :class="`bg-${c.colorClass}-500/10 border border-${c.colorClass}-500/20 text-${c.colorClass}-400`">{{ c.diff }}</span>
          </div>
          <div class="py-2 flex-1">
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{{ c.title }}</h3>
            <div class="flex items-center gap-2 text-[#92adc9] text-sm">
              <span class="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>{{ c.time }}</span>
            </div>
          </div>
          <div class="w-full bg-surface-border h-[1px]"></div>
          <button class="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">Подробнее</button>
        </div>
      </div>
    </div>
    
    <AddEventModal :isOpen="showAddModal" @close="showAddModal = false" />
    <ContestModal :isOpen="showInfoModal" :data="selectedContest" @close="showInfoModal = false" />
  </div>
</template>