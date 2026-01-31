import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { messages } from '@/shared/i18n/messages';

export type Locale = 'ru' | 'en';

const getMessage = (locale: Locale, key: string): unknown => {
  const parts = key.split('.');
  let current: any = messages[locale];
  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return undefined;
    }
    current = current[part];
  }
  return current;
};

const applyVars = (template: string, vars?: Record<string, string | number>) => {
  if (!vars) return template;
  return Object.entries(vars).reduce((acc, [key, value]) => {
    return acc.split(`{${key}}`).join(String(value));
  }, template);
};

export const useI18nStore = defineStore('i18n', () => {
  const locale = useStorage<Locale>('codequest_locale', 'ru', localStorage, { mergeDefaults: true });

  const t = (key: string, vars?: Record<string, string | number>) => {
    const message = getMessage(locale.value, key);
    if (typeof message === 'string') {
      return applyVars(message, vars);
    }
    return key;
  };

  const tm = (key: string) => {
    return getMessage(locale.value, key);
  };

  const setLocale = (value: Locale) => {
    locale.value = value;
  };

  const toggleLocale = () => {
    locale.value = locale.value === 'ru' ? 'en' : 'ru';
  };

  return { locale, t, tm, setLocale, toggleLocale };
});
