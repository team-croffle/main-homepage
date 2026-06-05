<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';
  import { motion, useScroll, useSpring, useTransform } from 'motion-v';
  import { computed, ref } from 'vue';
  import { mainNavItem } from '../constants/navigation';

  const { scrollY } = useScroll();

  const rawProgress = useTransform(scrollY, [0, 160], [0, 1]);
  const progress = useSpring(rawProgress, { stiffness: 180, damping: 28, mass: 0.8 });

  // dock geometry (Scroll에 반응하는 동적 수치들)
  const marginTop = useTransform(progress, [0, 1], [0, 12]);
  const marginInline = useTransform(progress, [0, 1], [0, 20]);
  const borderRadius = useTransform(progress, [0, 1], [0, 22]);
  const paddingY = useTransform(progress, [0, 1], [16, 12]);

  // 현재 화면에 보이고 있는 Section ID를 추적할 상태 변수
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
    class="fixed z-50 backdrop-blur-[26px] backdrop-brightness-[1.04] backdrop-saturate-[1.9]"
    :style="{
      top: marginTop,
      left: marginInline,
      right: marginInline,
      borderRadius,
      backgroundColor: 'var(--header-bg)',
      border: 'var(--header-border)',
      boxShadow: 'var(--header-shadow)',
    }"
    :ui="{
      container: 'mx-0 max-w-full',
    }"
  >
    <template #title>
      <div
        class="pointer-events-none absolute top-0 right-0 left-0 h-px rounded-t-[inherit]"
        :style="{ background: 'var(--header-glow)' }"
      />

      <motion.div
        class="flex items-center justify-between px-6"
        :style="{ paddingTop: paddingY, paddingBottom: paddingY }"
      >
        <div class="flex items-center gap-2">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg"
            style="background-color: var(--header-brand-bg)"
          >
            <img src="../assets/logo-only-x32.svg" alt="Logo" />
          </div>
          <span class="text-xl font-bold" style="color: var(--header-brand-text)"
            >Croffle Dev.</span
          >
        </div>
      </motion.div>
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
