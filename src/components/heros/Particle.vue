<script setup lang="ts">
  import type { HeroParticleData } from '@/features/hero/hero.type.ts';
  import { cn } from '@/utils/cn';
  import ParallaxLayer from './ParallaxLayer.vue';

  interface ParticleProps {
    p: HeroParticleData;
    idx: number;
    isVisible: boolean;
  }

  defineProps<ParticleProps>();
</script>

<template>
  <ParallaxLayer
    type="particle"
    :style="{
      left: `${p.x}%`,
      top: `${p.y}%`,
      '--px': `${p.depth * 260}px`,
      '--py': `${p.depth * 180}px`,
    }"
  >
    <div
      :class="
        cn(
          'transition-all duration-1600 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        )
      "
      :style="{
        transitionDelay: `${idx * 0.12}s`,
      }"
    >
      <div
        class="particle-float bg-primary rounded-full"
        :style="{
          width: `${p.size}px`,
          height: `${p.size}px`,
          '--dx': `${p.driftX}px`,
          '--dy': `${p.driftY}px`,
          '--op-base': p.opacity,
          '--dur': `${p.dur}s`,
          '--delay': `${idx * 0.38}s`,
          '--glow-base': `${p.size * 2}px`,
          '--glow-peak': `${p.size * 5}px`,
        }"
      ></div>
    </div>
  </ParallaxLayer>
</template>

<style lang="css" scoped>
  .particle-float {
    animation: float-pulse var(--dur) ease-in-out var(--delay) infinite;
    will-change: transform, opacity, box-shadow;
  }

  @keyframes float-pulse {
    0% {
      transform: translate(0, 0);
      opacity: var(--op-base);
      box-shadow: 0 0 var(--glow-base) oklch(0.785 0.104 69.8 / 0.5);
    }
    20% {
      transform: translate(var(--dx), calc(var(--dy) * 0.5));
      opacity: calc(var(--op-base) * 1.45);
      box-shadow: 0 0 var(--glow-peak) oklch(0.785 0.104 69.8 / 0.95);
    }
    40% {
      transform: translate(calc(var(--dx) * 0.3), var(--dy));
      opacity: calc(var(--op-base) * 0.55);
      box-shadow: 0 0 calc(var(--glow-base) * 0.6) oklch(0.785 0.104 69.8 / 0.22);
    }
    60% {
      transform: translate(calc(var(--dx) * -0.6), calc(var(--dy) * -0.4));
      opacity: calc(var(--op-base) * 1.25);
      box-shadow: 0 0 calc(var(--glow-peak) * 0.8) oklch(0.785 0.104 69.8 / 0.8);
    }
    100% {
      transform: translate(0, 0);
      opacity: var(--op-base);
      box-shadow: 0 0 var(--glow-base) oklch(0.785 0.104 69.8 / 0.5);
    }
  }
</style>
