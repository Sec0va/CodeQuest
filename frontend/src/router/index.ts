import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/pages/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/contests', component: () => import('@/pages/ContestsView.vue') },
    { path: '/calendar', component: () => import('@/pages/CalendarView.vue') },
    { path: '/info', component: () => import('@/pages/InfoView.vue') },
    { path: '/profile', component: () => import('@/pages/ProfileView.vue') },
    { path: '/auth', component: () => import('@/pages/AuthView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;