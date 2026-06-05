<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';
  import { motion, useScroll } from 'motion-v';
  import { computed, ref, onUnmounted } from 'vue';
  import { mainNavItem } from '../constants/navigation';
  import { cn } from '../utils/cn';

  const { scrollY } = useScroll();
  const isScrolled = ref(false);

  // 스크롤이 40px을 넘어가면 상태만 변경하여 렌더링 부하 최소화
  const unsubscribe = scrollY.on('change', (latest) => {
    if (latest > 40 && !isScrolled.value) {
      isScrolled.value = true;
    } else if (latest <= 40 && isScrolled.value) {
      isScrolled.value = false;
    }
  });

  onUnmounted(() => {
    unsubscribe();
  });

  const activeSection = ref<string>('');

  const navItems = computed<NavigationMenuItem[][]>(() => {
    return [
      mainNavItem.map((item) => ({
        label: item.label,
        to: item.to,
        active: activeSection.value === item.id,
      })),
      [
        {
          label: 'Github',
          icon: 'i-lucide-github',
          to: 'https://github.com/team-croffle',
          target: '_blank',
        },
      ],
    ];
  });
</script>

<template>
  <UHeader
    :as="motion.header"
    :initial="{ opacity: 0, y: -20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.55, ease: 'easeOut' }"
    :class="
      cn(
        'fixed z-50 transition-all duration-300 ease-out will-change-[top,left,right,border-radius]',
        'bg-header-bg border-header-border shadow-header border backdrop-blur-lg backdrop-brightness-[1.04] backdrop-saturate-[1.9]',
        {
          'top-3 right-5 left-5 rounded-3xl': isScrolled,
          'top-0 right-0 left-0 rounded-none': !isScrolled,
        },
      )
    "
    :ui="{
      container: 'mx-0 max-w-full',
    }"
  >
    <template #title>
      <div
        class="bg-header-glow pointer-events-none absolute top-0 right-0 left-0 h-px rounded-t-[inherit]"
      />

      <div
        :class="
          cn('flex items-center justify-between px-6 transition-all duration-300 ease-out', {
            'py-3': isScrolled,
            'py-4': !isScrolled,
          })
        "
      >
        <div class="flex items-center gap-2">
          <div class="bg-header-brand-bg flex h-8 w-8 items-center justify-center rounded-lg">
            <img src="../assets/logo-only-x32.svg" alt="Logo" />
          </div>
          <span class="text-header-brand-text text-xl font-bold"> Croffle Dev. </span>
        </div>
      </div>
    </template>

    <UNavigationMenu
      :items="navItems"
      :ui="{
        root: 'hidden md:flex items-center gap-6',
      }"
    />
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>
