<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user'; // Import user store
import TheHeader from '@/widgets/TheHeader.vue';
import TheFooter from '@/widgets/TheFooter.vue';

const userStore = useUserStore();

onMounted(() => {
  // Try to fetch user data on app mount if we have some auth state (or just try anyway)
  // Pinia store state persists in localStorage, but we want fresh data.
  // We can just call fetchUser, which will fail if no cookies/token.
  userStore.fetchUser();
});
</script>

<template>
  <div class="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark">
    <TheHeader />
    <RouterView />
    <TheFooter />
  </div>
</template>