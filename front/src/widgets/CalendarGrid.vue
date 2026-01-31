<script setup lang="ts">
import {computed} from 'vue';
import {useI18nStore} from '@/stores/i18n';

const emit = defineEmits(['openEvent']);
const i18n = useI18nStore();

const days = computed(() => (i18n.tm('calendar.days') as string[]) || []);
const daysInMonth = 31;
const startOffset = 3;

const events = computed(() => [
  {
    day: 3,
    title: i18n.t('calendar.events.atcoder.title'),
    platform: 'AtCoder',
    time: '20:00',
    difficulty: i18n.t('contests.difficulty.beginner'),
    desc: i18n.t('calendar.events.atcoder.desc'),
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1000&auto=format&fit=crop'
  },
  {
    day: 5,
    title: i18n.t('calendar.events.cf920.title'),
    platform: 'Codeforces',
    time: '17:35',
    difficulty: i18n.t('contests.difficulty.medium'),
    desc: i18n.t('calendar.events.cf920.desc'),
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    day: 9,
    title: i18n.t('calendar.events.lc402.title'),
    platform: 'LeetCode',
    time: '17:00',
    difficulty: i18n.t('contests.difficulty.sprint'),
    desc: i18n.t('calendar.events.lc402.desc'),
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    day: 12,
    title: i18n.t('calendar.events.cqSprint.title'),
    platform: 'CodeQuest',
    time: '18:00',
    difficulty: i18n.t('contests.difficulty.mixed'),
    desc: i18n.t('calendar.events.cqSprint.desc'),
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop'
  },
  {
    day: 12,
    title: i18n.t('calendar.events.hr.title'),
    platform: 'HackerRank',
    time: '20:30',
    difficulty: i18n.t('contests.difficulty.intermediate'),
    desc: i18n.t('calendar.events.hr.desc'),
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop'
  },
  {
    day: 16,
    title: i18n.t('calendar.events.icpc.title'),
    platform: 'ICPC',
    time: '12:00',
    difficulty: i18n.t('contests.difficulty.hard'),
    desc: i18n.t('calendar.events.icpc.desc'),
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    day: 21,
    title: i18n.t('calendar.events.kotlin.title'),
    platform: 'Kotlin Heroes',
    time: '19:00',
    difficulty: i18n.t('contests.difficulty.medium'),
    desc: i18n.t('calendar.events.kotlin.desc'),
    img: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1000&auto=format&fit=crop'
  },
  {
    day: 24,
    title: i18n.t('calendar.events.cfEdu.title'),
    platform: 'Codeforces',
    time: '16:00',
    difficulty: i18n.t('contests.difficulty.beginner'),
    desc: i18n.t('calendar.events.cfEdu.desc'),
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    day: 28,
    title: i18n.t('calendar.events.euler.title'),
    platform: 'Euler',
    time: '15:00',
    difficulty: i18n.t('contests.difficulty.mixed'),
    desc: i18n.t('calendar.events.euler.desc'),
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop'
  }
]);

const eventsByDay = computed(() => {
  return events.value.reduce<Record<number, typeof events.value>>((acc, event) => {
    if (!acc[event.day]) acc[event.day] = [];
    acc[event.day]!.push(event);
    return acc;
  }, {});
});

const getEventsForDay = (day: number) => {
  return eventsByDay.value[day] || [];
};
</script>

<template>
  <div class="flex flex-col bg-[#111a22] rounded-xl border border-surface-border overflow-hidden shadow-2xl">
    <div class="grid grid-cols-7 border-b border-surface-border bg-surface-dark">
      <div v-for="day in days" :key="day"
           class="py-3 text-center text-xs sm:text-sm font-bold text-slate-300 uppercase">
        {{ day }}
      </div>
    </div>

    <div class="grid grid-cols-7 auto-rows-[minmax(120px,1fr)] gap-px bg-surface-border">
      <div v-for="i in startOffset" :key="'empty-'+i"
           class="bg-[#111a22] p-2 min-h-[120px] border-r border-b border-[#233648] opacity-50"></div>

      <div v-for="day in daysInMonth" :key="day"
           class="bg-[#111a22] p-2 min-h-[120px] border-r border-b border-[#233648] relative group hover:bg-[#16212e] transition-colors">
        <span class="text-slate-300 text-sm font-bold group-hover:text-white">{{ day }}</span>
        <div
            v-for="event in getEventsForDay(day)"
            :key="`${day}-${event.title}`"
            @click.stop="emit('openEvent', event)"
            class="w-full bg-primary/20 border-l-2 border-primary rounded px-2 py-1 mt-1 cursor-pointer hover:bg-primary/30 transition-colors"
        >
          <p class="text-xs text-white truncate font-medium">{{ event.platform }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
