import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import ContestsPage from '@/pages/ContestsPage.vue';
import CreateContestPage from '@/pages/CreateContestPage.vue';
import CalendarPage from '@/pages/CalendarPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import InfoPage from '@/pages/InfoPage.vue';
import AdminPage from '@/pages/AdminPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/auth', component: AuthPage },
    { path: '/contests', component: ContestsPage },
    { path: '/contests/create', component: CreateContestPage },
    { path: '/calendar', component: CalendarPage },
    { path: '/profile', component: ProfilePage },
    { path: '/info', component: InfoPage },
    { path: '/admin', component: AdminPage },
  ]
});

export default router;
