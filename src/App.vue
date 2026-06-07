<script setup lang="ts">
  import { computed } from 'vue';
  import { RouterView, useRoute } from 'vue-router';
  import DefaultLayout from './layouts/DefaultLayout.vue';
  import { useI18n } from 'vue-i18n';
  import * as locales from '@nuxt/ui/locale';

  const route = useRoute();
  const { locale } = useI18n();

  const layouts: Record<string, unknown> = {
    default: DefaultLayout,
  };

  const currentLayout = computed(() => {
    const layoutName = (route.meta.layout as string) || 'default';
    return layouts[layoutName] || layouts.default;
  });
</script>

<template>
  <UApp :locale="locales[locale as keyof typeof locales]">
    <component :is="currentLayout">
      <RouterView />
    </component>
  </UApp>
</template>
