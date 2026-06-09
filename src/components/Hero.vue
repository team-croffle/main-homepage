<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import Particle from './heros/Particle.vue';
  import { heroParticles } from '@/features/hero/hero.constants';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const sectionRef = ref<HTMLElement | null>(null);
  const isVisible = ref(false);

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId: number;

  const onMove = (e: MouseEvent) => {
    if (!sectionRef.value) return;
    const r = sectionRef.value.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    // 마우스 위치를 -1.0 ~ 1.0 사이의 정규화된 값으로 변환
    targetX = (e.clientX - cx) / (r.width / 2);
    targetY = (e.clientY - cy) / (r.height / 2);
  };

  const onLeave = () => {
    targetX = 0;
    targetY = 0;
  };

  const loop = () => {
    // 선형 보간(Lerp)으로 부드러운 감속 효과
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    // Virtual DOM을 거치지 않고 최상단 컨테이너에 CSS 변수만 직접 꽂아 넣음
    if (sectionRef.value) {
      sectionRef.value.style.setProperty('--mx', currentX.toString());
      sectionRef.value.style.setProperty('--my', currentY.toString());
    }

    rafId = requestAnimationFrame(loop);
  };

  onMounted(() => {
    rafId = requestAnimationFrame(loop);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.value = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    if (sectionRef.value) observer.observe(sectionRef.value);

    onUnmounted(() => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    });
  });
</script>

<template>
  <section
    ref="sectionRef"
    aria-label="Hero"
    @mousemove="onMove"
    @mouseleave="onLeave"
    class="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
  >
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <ParallaxLayer
        type="background"
        class="bg-primary/20 top-16/100 left-18/100 h-140 w-140"
        style="--px: 80px; --py: 55px"
      ></ParallaxLayer>
      <ParallaxLayer
        type="background"
        class="bg-hero-second-layer/16 right-16/100 bottom-13/100 h-115 w-115"
        style="--px: -65px; --py: -45px"
      ></ParallaxLayer>
      <ParallaxLayer
        type="background"
        class="bg-hero-third-layer/13 top-52/100 left-54/100 h-70 w-70"
        style="--px: 50px; --py: -50px"
      ></ParallaxLayer>

      <Particle v-for="(p, i) in heroParticles" :key="i" :p="p" :idx="i" :isVisible="isVisible" />
    </div>

    <ParallaxLayer type="container" style="--px: 10px; --py: 7px">
      <div
        role="note"
        aria-label="tagline"
        class="bg-muted spring-enter mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
        :class="
          isVisible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-9 scale-85 opacity-0'
        "
      >
        <UIcon name="i-lucide-sparkles" class="text-primary" aria-hidden="true" />
        <span class="text-sm">{{ t('main.hero.tagline') }}</span>
      </div>

      <h1
        class="spring-enter mb-6 text-5xl font-bold delay-60 md:text-7xl"
        :class="
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-12 scale-90 opacity-0'
        "
      >
        {{ t('main.hero.welcome') }} <br />
        <span
          class="bg-[linear-gradient(to_right,oklch(0.785_0.104_69.8),oklch(0.6_0.08_69.8))] bg-clip-text text-transparent"
        >
          {{ t('main.hero.title') }}
        </span>
      </h1>

      <div
        class="spring-enter mx-auto mb-8 flex max-w-2xl flex-col items-center gap-2 delay-100"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'"
      >
        <p class="text-primary font-tektur text-xl font-semibold tracking-wide md:text-2xl">
          {{ t('main.hero.subtitle') }}
        </p>
        <p class="text-muted-foreground mt-2 text-base md:text-lg">
          {{ t('main.hero.description') }}
        </p>
      </div>

      <div
        role="group"
        aria-label="Call to action"
        class="spring-enter flex flex-col justify-center gap-4 delay-180 sm:flex-row"
        :class="
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-90 opacity-0'
        "
      >
        <ULink
          as="a"
          href="#about"
          :aria-label="t('main.hero.cta.about')"
          class="bg-primary text-primary-foreground h-12 rounded-lg px-8 py-3 font-medium transition-all hover:scale-105"
        >
          {{ t('main.hero.cta.about') }}
        </ULink>
        <ULink
          as="a"
          href="#contact"
          :aria-label="t('main.hero.cta.contact')"
          class="border-border text-foreground bg-card hover:bg-accent h-12 rounded-lg border px-8 py-3 font-medium transition-colors"
        >
          {{ t('main.hero.cta.contact') }}
        </ULink>
      </div>
    </ParallaxLayer>
  </section>
</template>

<style lang="css" scoped>
  .spring-enter {
    transition-property: opacity, transform, translate, scale;
    transition-duration: 800ms;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.15);
  }
</style>
