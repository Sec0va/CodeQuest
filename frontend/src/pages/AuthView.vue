<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user/store';

const isRegister = ref(false);
const userStore = useUserStore();
const router = useRouter();

const form = ref({ name: '', email: '', password: '' });

const handleSubmit = () => {
  if (isRegister.value) {
    if (!form.value.name || !form.value.email) return alert('Заполните поля');
    userStore.login({
      username: form.value.name,
      email: form.value.email,
      handle: '@' + form.value.name.replace(/\s/g, '_').toLowerCase(),
      location: 'Не указано'
    });
  } else {
    // Симуляция входа
    if (!form.value.email) return alert('Введите Email');
    userStore.login({
      username: 'Alex Coder',
      email: form.value.email,
      handle: '@alexcoder',
      location: 'Санкт-Петербург'
    });
  }
  router.push('/profile');
};
</script>

<template>
  <div class="flex-grow flex items-center justify-center px-4 py-12 lg:px-8">
    <div class="w-full max-w-[480px] flex flex-col gap-6">
      <div class="bg-white dark:bg-[#16212e] rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-2xl overflow-hidden">
        <div class="px-8 pt-8 pb-4 text-center">
          <h1 class="text-2xl font-bold dark:text-white">Добро пожаловать</h1>
          <p class="text-slate-500 text-sm">Войдите или создайте аккаунт</p>
        </div>
        
        <div class="px-8 mt-2 flex border-b dark:border-slate-700">
          <button @click="isRegister = false" class="flex-1 pb-3 pt-2 text-sm font-bold border-b-2 transition-colors" :class="!isRegister ? 'text-primary border-primary' : 'text-slate-500 border-transparent'">Вход</button>
          <button @click="isRegister = true" class="flex-1 pb-3 pt-2 text-sm font-bold border-b-2 transition-colors" :class="isRegister ? 'text-primary border-primary' : 'text-slate-500 border-transparent'">Регистрация</button>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 flex flex-col gap-5">
          <label v-if="isRegister" class="flex flex-col gap-1.5">
            <span class="dark:text-slate-200 text-sm font-medium">Имя пользователя</span>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-4 text-slate-400 text-[20px]">person</span>
              <input v-model="form.name" type="text" class="w-full h-12 rounded-lg bg-slate-50 dark:bg-[#111a22] border border-slate-300 dark:border-slate-700 dark:text-white pl-11 pr-4 focus:ring-primary focus:border-primary" placeholder="ivan_coder" />
            </div>
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="dark:text-slate-200 text-sm font-medium">Email</span>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-4 text-slate-400 text-[20px]">mail</span>
              <input v-model="form.email" type="email" class="w-full h-12 rounded-lg bg-slate-50 dark:bg-[#111a22] border border-slate-300 dark:border-slate-700 dark:text-white pl-11 pr-4 focus:ring-primary focus:border-primary" placeholder="email@example.com" />
            </div>
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="dark:text-slate-200 text-sm font-medium">Пароль</span>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-4 text-slate-400 text-[20px]">lock</span>
              <input v-model="form.password" type="password" class="w-full h-12 rounded-lg bg-slate-50 dark:bg-[#111a22] border border-slate-300 dark:border-slate-700 dark:text-white pl-11 pr-4 focus:ring-primary focus:border-primary" placeholder="••••••••" />
            </div>
          </label>
          
          <button type="submit" class="w-full h-12 mt-2 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2">
            <span>{{ isRegister ? 'Создать аккаунт' : 'Войти' }}</span>
            <span class="material-symbols-outlined text-lg">{{ isRegister ? 'person_add' : 'login' }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>