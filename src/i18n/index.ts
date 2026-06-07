import { createI18n } from 'vue-i18n';
import ko from './locales/ko.json';
// import en from '@/i18n/locales/en.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'ko',
  messages: {
    ko,
    // en
  },
});
