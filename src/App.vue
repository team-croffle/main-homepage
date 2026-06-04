<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import DefaultLayout from './layouts/DefaultLayout.vue';

  const route = useRoute();

  const layouts: Record<string, unknown> = {
    default: DefaultLayout,
  };

  const currentLayout = computed(() => {
    const layoutName = (route.meta.layout as string) || 'default';
    return layouts[layoutName] || layouts.default;
  });
</script>

<template>
  <UApp>
    <component :is="currentLayout">
      <RouterView />
    </component>
  </UApp>
</template>
