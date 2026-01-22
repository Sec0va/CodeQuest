<script setup lang="ts">
defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);

const save = () => {
  alert('Событие успешно добавлено (Demo)!');
  emit('close');
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100]">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>
    <div class="absolute inset-0 flex items-center justify-center p-4">
      <div class="bg-[#111a22] border border-surface-border w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
        <h3 class="text-2xl font-bold text-white mb-6">Создать турнир / Событие</h3>
        <div class="flex flex-col gap-4">
          <label class="flex flex-col gap-1">
            <span class="text-sm text-text-secondary">Название</span>
            <input type="text" class="rounded-lg bg-surface-dark border-surface-border text-white focus:ring-primary focus:border-primary" placeholder="Например: Тренировка" />
          </label>
          <div class="grid grid-cols-2 gap-4">
            <label class="flex flex-col gap-1">
              <span class="text-sm text-text-secondary">Дата</span>
              <input type="date" class="rounded-lg bg-surface-dark border-surface-border text-white focus:ring-primary focus:border-primary" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-sm text-text-secondary">Время</span>
              <input type="time" class="rounded-lg bg-surface-dark border-surface-border text-white focus:ring-primary focus:border-primary" />
            </label>
          </div>
          <label class="flex flex-col gap-1">
            <span class="text-sm text-text-secondary">Платформа</span>
            <select class="rounded-lg bg-surface-dark border-surface-border text-white focus:ring-primary focus:border-primary">
              <option>Codeforces</option>
              <option>LeetCode</option>
              <option>AtCoder</option>
              <option>Личное</option>
            </select>
          </label>
          <div class="flex gap-3 mt-4">
            <button @click="save" class="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20">Сохранить</button>
            <button @click="$emit('close')" class="flex-1 bg-surface-dark hover:bg-surface-border text-white font-bold py-3 rounded-lg border border-surface-border">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>