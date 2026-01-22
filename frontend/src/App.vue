<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/entities/user/store';
import { useRoute } from 'vue-router';
import TheHeader from '@/widgets/TheHeader.vue';
import TheFooter from '@/widgets/TheFooter.vue';

const userStore = useUserStore();
const route = useRoute();

onMounted(() => {
  userStore.init();
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-white font-display overflow-x-hidden selection:bg-primary selection:text-white">
    <!-- Скрываем хедер на странице авторизации, если хотите, или оставьте всегда -->
    <TheHeader v-if="route.path !== '/auth'" />
    
    <RouterView />
    
    <TheFooter v-if="route.path !== '/auth'" />
  </div>
</template>