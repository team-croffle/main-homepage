<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useLocalStorage } from '@vueuse/core';
  import type { SelectItem } from '@nuxt/ui';

  const { locale } = useI18n();
  const storedLocale = useLocalStorage('locale', 'en');

  locale.value = storedLocale.value;

  watch(locale, (newLocale) => {
    storedLocale.value = newLocale;
  });

  const items = ref<SelectItem[]>([
    { id: 'en', label: 'English (en)' },
    { id: 'ko', label: '한국어 (ko)' },
  ]);
</script>

<template>
  <USelect
    v-model="locale"
    value-key="id"
    :items="items"
    icon="i-lucide-languages"
    class="focus:ring-0"
  />
</template>
