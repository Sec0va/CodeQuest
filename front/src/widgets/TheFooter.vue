<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n';

const i18n = useI18nStore();
</script>

<template>
  <footer class="border-t border-surface-border py-8 mt-auto bg-[#0d141c]">
    <div class="max-w-7xl mx-auto px-4 text-center text-text-secondary text-sm">
      <p>© 2026 CodeQuest. {{ i18n.t('footer.rights') }}</p>
    </div>
  </footer>
</template>
