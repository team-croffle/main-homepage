<script setup lang="ts">
  import type { StyleValue } from 'vue';
  import { cn } from '../../utils/cn';

  interface ParallaxLayerProps {
    style?: StyleValue;
    type: 'particle' | 'container' | 'background';
  }

  defineProps<ParallaxLayerProps>();
</script>

<template>
  <div
    class="parallax-layer"
    :class="
      cn({
        'pointer-events-none absolute': type === 'particle' || type === 'background',
        'rounded-full blur-3xl': type === 'background',
        'container mx-auto px-6 text-center': type === 'container',
      })
    "
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>
  .parallax-layer {
    transform: translate(calc(var(--mx, 0) * var(--px, 0)), calc(var(--my, 0) * var(--py, 0)));
    will-change: transform;
  }
</style>
