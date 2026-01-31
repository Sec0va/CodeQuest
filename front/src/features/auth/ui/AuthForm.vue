<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useI18nStore } from '@/stores/i18n';

const props = defineProps<{ 
  mode: 'login' | 'register' 
}>();

const userStore = useUserStore();
const router = useRouter();
const i18n = useI18nStore();

const formData = ref({
  name: '',
  email: '',
  identifier: '',
  password: ''
});

const isLoading = ref(false);

const handleSubmit = async () => {
  if (props.mode === 'login') {
    if (!formData.value.identifier || !formData.value.password) {
      return alert(i18n.t('authForm.identifierRequired'));
    }
    try {
      isLoading.value = true;
      await userStore.login(formData.value.identifier, formData.value.password);
      router.push('/profile');
    } catch (error) {
      alert(error instanceof Error ? error.message : i18n.t('authForm.requestFailed'));
    } finally {
      isLoading.value = false;
    }
    return;
  }

  if (!formData.value.name || !formData.value.email || !formData.value.password) {
    return alert(i18n.t('authForm.allFieldsRequired'));
  }
  try {
    isLoading.value = true;
    await userStore.register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
      location: i18n.t('authForm.locationDefault'),
      avatar: null
    });
    router.push('/profile');
  } catch (error) {
    alert(error instanceof Error ? error.message : i18n.t('authForm.requestFailed'));
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
    <label v-if="mode === 'register'" class="flex flex-col gap-1.5">
      <span class="text-slate-700 dark:text-slate-200 text-sm font-medium">{{ i18n.t('authForm.username') }}</span>
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute left-4 text-slate-400 text-[20px]">person</span>
        <input 
          v-model="formData.name"
          class="w-full h-12 rounded-lg bg-slate-50 dark:bg-[#111a22] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white pl-11 pr-4 focus:ring-primary focus:border-primary"
          placeholder="ivan_coder" 
          type="text" 
        />
      </div>
    </label>

    <label v-if="mode === 'login'" class="flex flex-col gap-1.5">
      <span class="text-slate-700 dark:text-slate-200 text-sm font-medium">{{ i18n.t('authForm.identifier') }}</span>
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute left-4 text-slate-400 text-[20px]">person</span>
        <input 
          v-model="formData.identifier" 
          class="w-full h-12 rounded-lg bg-slate-50 dark:bg-[#111a22] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white pl-11 pr-4 focus:ring-primary focus:border-primary" 
          :placeholder="i18n.t('authForm.identifierPlaceholder')" 
          type="text" 
        />
      </div>
    </label>

    <label v-else class="flex flex-col gap-1.5">
      <span class="text-slate-700 dark:text-slate-200 text-sm font-medium">{{ i18n.t('authForm.email') }}</span>
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute left-4 text-slate-400 text-[20px]">mail</span>
        <input 
          v-model="formData.email" 
          class="w-full h-12 rounded-lg bg-slate-50 dark:bg-[#111a22] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white pl-11 pr-4 focus:ring-primary focus:border-primary" 
          placeholder="student@example.com" 
          type="email" 
        />
      </div>
    </label>

    <label class="flex flex-col gap-1.5">
      <span class="text-slate-700 dark:text-slate-200 text-sm font-medium">{{ i18n.t('authForm.password') }}</span>
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute left-4 text-slate-400 text-[20px]">lock</span>
        <input 
          v-model="formData.password" 
          class="w-full h-12 rounded-lg bg-slate-50 dark:bg-[#111a22] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white pl-11 pr-12 focus:ring-primary focus:border-primary" 
          placeholder="••••••••" 
          type="password" 
        />
      </div>
    </label>

    <button :disabled="isLoading" class="w-full h-12 mt-2 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
      <span>{{ mode === 'login' ? i18n.t('authForm.login') : i18n.t('authForm.register') }}</span>
      <span class="material-symbols-outlined text-lg">{{ mode === 'login' ? 'login' : 'person_add' }}</span>
    </button>
  </form>
</template>
