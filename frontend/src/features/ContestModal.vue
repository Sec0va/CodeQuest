<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useUserStore } from '@/entities/user/store';
import { useRouter } from 'vue-router';

const props = defineProps<{
  isOpen: boolean;
  data: {
    title: string;
    platform: string;
    time: string;
    diff: string;
    desc: string;
    image?: string;
  } | null;
}>();

const emit = defineEmits(['close']);
const userStore = useUserStore();
const router = useRouter();

const register = () => {
  if (!userStore.user) {
    if (confirm('Для регистрации на турнир необходимо войти в аккаунт. Перейти на страницу входа?')) {
      router.push('/auth');
    }
  } else {
    alert(`Вы успешно зарегистрированы на ${props.data?.title}! Подтверждение отправлено на ${userStore.user.email}`);
    emit('close');
  }
};
</script>

<template>
  <div v-if="isOpen && data" class="fixed inset-0 z-[100]">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>
    <div class="absolute inset-0 flex items-center justify-center p-4">
      <div class="bg-[#111a22] border border-surface-border w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col relative animate-fadeIn overflow-hidden">
        
        <!-- Шапка с картинкой -->
        <div class="h-48 w-full relative">
          <img v-if="data.image" :src="data.image" class="w-full h-full object-cover opacity-60" alt="Cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#111a22] to-transparent"></div>
          <button @click="$emit('close')" class="absolute top-4 right-4 bg-black/50 hover:bg-black/80 rounded-full p-2 text-white transition-colors backdrop-blur-md">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div class="absolute bottom-4 left-8">
            <span class="text-primary font-bold tracking-widest text-xs uppercase mb-1 block">{{ data.platform }}</span>
            <h2 class="text-3xl font-bold text-white shadow-black drop-shadow-lg">{{ data.title }}</h2>
          </div>
        </div>

        <!-- Контент -->
        <div class="p-8 pb-4 bg-[#111a22]">
          <div class="flex flex-wrap gap-4 mb-6">
            <div class="flex items-center gap-2 text-text-secondary bg-surface-dark px-3 py-1.5 rounded-lg border border-surface-border">
              <span class="material-symbols-outlined text-[18px]">schedule</span>
              <span class="text-sm font-medium">{{ data.time }}</span>
            </div>
            <div class="flex items-center gap-2 text-text-secondary bg-surface-dark px-3 py-1.5 rounded-lg border border-surface-border">
              <span class="material-symbols-outlined text-[18px]">signal_cellular_alt</span>
              <span class="text-sm font-medium">{{ data.diff }}</span>
            </div>
          </div>
          <div class="prose prose-invert max-w-none">
            <h4 class="text-white font-bold mb-2 text-lg">О соревновании</h4>
            <p class="text-slate-300 text-sm leading-relaxed">{{ data.desc }}</p>
          </div>
        </div>

        <!-- Кнопки действий -->
        <div class="p-6 border-t border-surface-border flex gap-4 bg-[#16212e]">
          <button @click="register" class="flex-1 h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            <span class="material-symbols-outlined">how_to_reg</span>Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>