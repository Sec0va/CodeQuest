<template>
  <main class="flex-1">
    <!-- Hero Section -->
    <section class="relative px-6 py-12 lg:px-20 lg:py-24 flex justify-center">
      <div class="max-w-[1200px] w-full">
        <div class="flex flex-col-reverse lg:flex-row gap-16 items-center">
          <div class="flex flex-col gap-6 flex-1 text-center lg:text-left">
            <h1 class="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-white">
              <span class="text-primary">Код</span> — это только начало пути
            </h1>
            <p class="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              CodeQuest — это больше, чем просто агрегатор. Это экосистема для тех, кто хочет расти. Мы объединяем лучшие ресурсы, инструменты и людей.
            </p>
            <div class="pt-4 flex justify-center lg:justify-start gap-4">
              <RouterLink to="/contests" class="flex h-12 items-center justify-center rounded-xl px-8 bg-primary hover:bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-500/25 transition-all">
                Начать поиск
              </RouterLink>
            </div>
          </div>
          <div class="flex-1 w-full max-w-[600px]">
            <div class="aspect-[4/3] w-full bg-gradient-to-br from-surface-dark to-background-dark border border-surface-border rounded-2xl overflow-hidden relative shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover opacity-80 mix-blend-overlay" alt="Coding Background" />
              <div class="absolute bottom-6 left-6 right-6 p-4 bg-surface-dark/90 backdrop-blur-md rounded-lg border border-surface-border flex items-center gap-4">
                <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined">emoji_events</span>
                </div>
                <div>
                  <p class="text-xs text-text-secondary uppercase font-bold tracking-wider">Актуально сейчас</p>
                  <p class="text-sm text-white font-medium">Финал ICPC 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <div class="w-full border-y border-surface-border bg-surface-dark/30">
      <div class="max-w-[1200px] mx-auto px-6 py-12 flex flex-wrap justify-center gap-10 lg:justify-between text-center lg:text-left">
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">500+</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">Турниров в базе</span></div>
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">12k+</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">Активных участников</span></div>
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">50+</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">Поддерживаемых стран</span></div>
        <div class="flex flex-col gap-1"><span class="text-4xl font-black text-white">24/7</span><span class="text-sm text-text-secondary font-medium uppercase tracking-wide">Мониторинг событий</span></div>
      </div>
    </div>

    <!-- How it works -->
    <section class="px-6 py-20 lg:px-20 flex justify-center bg-background-dark">
      <div class="max-w-[1200px] w-full flex flex-col gap-12">
        <div class="text-center mb-4">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-4">Как это работает</h2>
          <p class="text-text-secondary text-lg max-w-2xl mx-auto">Простой путь от новичка до легенды программирования</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-surface-dark border border-surface-border p-8 rounded-2xl flex flex-col gap-4 hover:border-primary/50 transition-colors group">
            <div class="size-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"><span class="material-symbols-outlined text-[32px]">search</span></div>
            <h3 class="text-xl font-bold text-white">1. Найдите турнир</h3>
            <p class="text-text-secondary leading-relaxed">Используйте умные фильтры, чтобы найти соревнование, подходящее именно под ваш уровень.</p>
          </div>
          <div class="bg-surface-dark border border-surface-border p-8 rounded-2xl flex flex-col gap-4 hover:border-primary/50 transition-colors group">
            <div class="size-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform"><span class="material-symbols-outlined text-[32px]">calendar_add_on</span></div>
            <h3 class="text-xl font-bold text-white">2. Добавьте в календарь</h3>
            <p class="text-text-secondary leading-relaxed">Один клик — и событие в вашем личном расписании. Мы напомним вам за час до начала.</p>
          </div>
          <div class="bg-surface-dark border border-surface-border p-8 rounded-2xl flex flex-col gap-4 hover:border-primary/50 transition-colors group">
            <div class="size-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform"><span class="material-symbols-outlined text-[32px]">trending_up</span></div>
            <h3 class="text-xl font-bold text-white">3. Растите в рейтинге</h3>
            <p class="text-text-secondary leading-relaxed">Решайте задачи, побеждайте в турнирах и наблюдайте, как растет ваш глобальный рейтинг.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="px-6 py-16 lg:px-20 flex justify-center bg-[#16212e]">
      <div class="max-w-[800px] w-full flex flex-col gap-10">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-white mb-2">Частые вопросы</h2>
          <p class="text-text-secondary">Всё, что вы хотели узнать о платформе</p>
        </div>
        <div class="flex flex-col gap-4">
          <details class="group rounded-xl bg-background-dark border border-surface-border open:border-primary/50 transition-all">
            <summary class="flex cursor-pointer items-center justify-between p-6 font-bold text-white"><span>Это бесплатно?</span><span class="transition-transform group-open:rotate-180 material-symbols-outlined text-text-secondary">expand_more</span></summary>
            <div class="px-6 pb-6 pt-0 text-text-secondary text-sm">Да, базовый функционал платформы для участников полностью бесплатен.</div>
          </details>
          <details class="group rounded-xl bg-background-dark border border-surface-border open:border-primary/50 transition-all">
            <summary class="flex cursor-pointer items-center justify-between p-6 font-bold text-white"><span>Как добавить свой турнир?</span><span class="transition-transform group-open:rotate-180 material-symbols-outlined text-text-secondary">expand_more</span></summary>
            <div class="px-6 pb-6 pt-0 text-text-secondary text-sm">Напишите нам на partner@codequest.com или воспользуйтесь формой в личном кабинете.</div>
          </details>
        </div>
      </div>
    </section>
  </main>
</template>