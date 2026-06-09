<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { ko, en } from '@nuxt/ui/locale';
  import { computed } from 'vue';
  import { RouterView } from 'vue-router';

  import DefaultLayout from './layouts/DefaultLayout.vue';

  const { locale } = useI18n();
  const uiLocale = computed(() => (locale.value === 'ko' ? ko : en));
</script>

<template>
  <UApp :locale="uiLocale">
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </UApp>
</template>
