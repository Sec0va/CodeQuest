<script setup lang="ts">
import { ref } from 'vue';
import AuthForm from '@/features/auth/ui/AuthForm.vue';
import { useI18nStore } from '@/stores/i18n';

const activeTab = ref<'login' | 'register'>('login');
const i18n = useI18nStore();
</script>

<template>
  <main class="relative z-10 flex-grow flex items-center justify-center px-4 py-12 lg:px-8">
    <div class="w-full max-w-[480px] flex flex-col gap-6">
      <div class="bg-white dark:bg-[#16212e] rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-black/20 overflow-hidden">
        
        <div class="px-8 pt-8 pb-4 text-center">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">{{ i18n.t('auth.title') }}</h1>
          <p class="text-slate-500 text-sm">{{ i18n.t('auth.subtitle') }}</p>
        </div>

        <div class="px-8 mt-2 flex border-b border-slate-200 dark:border-slate-700">
          <button 
            @click="activeTab = 'login'" 
            :class="activeTab === 'login' ? 'text-primary border-primary' : 'text-slate-500 border-transparent'" 
            class="flex-1 pb-3 pt-2 text-center text-sm font-bold border-b-2 transition-colors">
            {{ i18n.t('auth.loginTab') }}
          </button>
          <button 
            @click="activeTab = 'register'" 
            :class="activeTab === 'register' ? 'text-primary border-primary' : 'text-slate-500 border-transparent'" 
            class="flex-1 pb-3 pt-2 text-center text-sm font-bold border-b-2 transition-colors">
            {{ i18n.t('auth.registerTab') }}
          </button>
        </div>

        <div class="p-8">
          <AuthForm :mode="activeTab" />
          
          <div class="mt-6 flex flex-col gap-4">
             <div class="relative flex items-center justify-center">
                <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200 dark:border-slate-700"></div></div>
                <span class="relative bg-white dark:bg-[#16212e] px-2 text-xs text-slate-500 uppercase">{{ i18n.t('auth.or') }}</span>
              </div>
              <div class="grid grid-cols-2 gap-3">
                 <button class="flex items-center justify-center gap-2 h-10 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-white">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span class="text-sm font-medium text-slate-600 dark:text-slate-300">Google</span>
                 </button>
                 
                 <button class="flex items-center justify-center gap-2 h-10 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-white">
                    <svg class="w-5 h-5 dark:fill-white fill-slate-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    <span class="text-sm font-medium text-slate-600 dark:text-slate-300">GitHub</span>
                 </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
