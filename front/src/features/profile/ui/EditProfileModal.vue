<script setup lang="ts">
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useI18nStore } from '@/stores/i18n';
import BaseModal from '@/shared/ui/BaseModal.vue';

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);
const userStore = useUserStore();
const i18n = useI18nStore();

const form = ref({ name: '', handle: '', location: '' });

watch(() => props.isOpen, (newVal) => {
  if (newVal && userStore.user) {
    form.value = { ...userStore.user } as any;
  }
});

const save = () => {
  userStore.updateProfile(form.value);
  emit('close');
};
</script>

<template>
  <BaseModal :is-open="isOpen" @close="emit('close')" class="max-w-md p-6">
    <h3 class="text-xl font-bold text-white mb-4">{{ i18n.t('editProfile.title') }}</h3>
    <div class="flex flex-col gap-4">
      <label class="flex flex-col gap-1">
        <span class="text-sm text-text-secondary">{{ i18n.t('editProfile.username') }}</span>
        <input v-model="form.name" type="text" class="rounded-lg bg-surface-dark border-surface-highlight text-white focus:ring-primary focus:border-primary" />
      </label>
      <label class="flex flex-col gap-1">
        <span class="text-sm text-text-secondary">{{ i18n.t('editProfile.handle') }}</span>
        <input v-model="form.handle" type="text" class="rounded-lg bg-surface-dark border-surface-highlight text-white focus:ring-primary focus:border-primary" />
      </label>
      <label class="flex flex-col gap-1">
        <span class="text-sm text-text-secondary">{{ i18n.t('editProfile.location') }}</span>
        <input v-model="form.location" type="text" class="rounded-lg bg-surface-dark border-surface-highlight text-white focus:ring-primary focus:border-primary" />
      </label>
      <div class="flex gap-3 mt-2">
        <button @click="save" class="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-2 rounded-lg">{{ i18n.t('editProfile.save') }}</button>
        <button @click="emit('close')" class="flex-1 bg-surface-dark hover:bg-surface-highlight text-white font-bold py-2 rounded-lg border border-surface-highlight">{{ i18n.t('editProfile.cancel') }}</button>
      </div>
    </div>
  </BaseModal>
</template>
