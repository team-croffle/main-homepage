<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import Particle from './heros/Particle.vue';
  import { heroParticles } from '../constants/hero.ts';

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
    @mousemove="onMove"
    @mouseleave="onLeave"
    class="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <ParallaxLayer
        type="background"
        style="
          width: 560px;
          height: 560px;
          top: 16%;
          left: 18%;
          background-color: oklch(0.785 0.104 69.8 / 0.2);
          --px: 80px;
          --py: 55px;
        "
      ></ParallaxLayer>
      <ParallaxLayer
        type="background"
        style="
          width: 460px;
          height: 460px;
          bottom: 13%;
          right: 16%;
          background-color: oklch(0.75 0.09 50 / 0.16);
          --px: -65px;
          --py: -45px;
        "
      ></ParallaxLayer>
      <ParallaxLayer
        type="background"
        style="
          width: 280px;
          height: 280px;
          top: 52%;
          left: 54%;
          background-color: oklch(0.82 0.11 85 / 0.13);
          --px: 50px;
          --py: -50px;
        "
      ></ParallaxLayer>

      <Particle v-for="(p, i) in heroParticles" :key="i" :p="p" :idx="i" :isVisible="isVisible" />
    </div>

    <ParallaxLayer type="container" style="--px: 10px; --py: 7px">
      <div
        class="bg-muted spring-enter mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
        :class="
          isVisible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-9 scale-85 opacity-0'
        "
        style="transition-delay: 0s"
      >
        <UIcon name="i-lucide-sparkles" class="text-primary" />
        <span class="text-sm">작은 개발팀의 큰 꿈</span>
      </div>

      <h1
        class="spring-enter mb-6 text-5xl font-bold md:text-7xl"
        :class="
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-12 scale-90 opacity-0'
        "
        style="transition-delay: 60ms"
      >
        Welcome to <br />
        <span
          class="bg-[linear-gradient(to_right,oklch(0.785_0.104_69.8),oklch(0.6_0.08_69.8))] bg-clip-text text-transparent"
        >
          Croffle Dev
        </span>
      </h1>

      <div
        class="spring-enter mx-auto mb-8 flex max-w-2xl flex-col items-center gap-2"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'"
        style="transition-delay: 100ms"
      >
        <p
          class="text-xl font-semibold tracking-wide md:text-2xl"
          style="color: oklch(0.785 0.104 69.8)"
        >
          Code-Baked Sweet Innovation
        </p>
        <p class="text-foreground text-lg font-medium md:text-xl">코드로 굽는 달콤한 혁신</p>
        <p class="text-muted-foreground mt-2 text-base md:text-lg">
          우리는 함께 성장하며 혁신적인 프로젝트를 만들어가는 개발 동아리입니다.
        </p>
      </div>

      <div
        class="spring-enter flex flex-col justify-center gap-4 sm:flex-row"
        :class="
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-90 opacity-0'
        "
        style="transition-delay: 180ms"
      >
        <a
          href="#projects"
          class="rounded-lg px-8 py-3 font-medium transition-all hover:scale-105"
          style="background-color: oklch(0.785 0.104 69.8); color: oklch(0.15 0.01 69.8)"
        >
          프로젝트 보기
        </a>
        <a
          href="#contact"
          class="border-border bg-card hover:bg-accent rounded-lg border px-8 py-3 font-medium transition-colors"
        >
          문의하기
        </a>
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
