<script setup lang="ts">
  import { motion } from 'motion-v';
  import { useI18n } from 'vue-i18n';
  import { features } from '@/features/about/about.constants';

  const { t } = useI18n();
</script>

<template>
  <section id="about" class="bg-buted/30 py-24">
    <div class="container mx-auto px-6">
      <motion.div
        :initial="{ opacity: 0, y: -40 }"
        :whileInView="{ opacity: 1, y: 8 }"
        :viewport="{ once: false, amount: 0.8 }"
        :transition="{ duration: 0.6 }"
        class="mb-16 text-center"
      >
        <h2 class="mb-4 text-4xl font-bold">
          {{ t('main.about.header') }}
        </h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          {{ t('main.about.description') }}
        </p>
      </motion.div>

      <div class="grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 lg:grid-cols-4">
        <UCard
          :as="motion.div"
          v-for="(feature, index) in features"
          index
          :key="index"
          :initial="{
            opacity: 0,
            x: feature.scatter.x,
            y: feature.scatter.y,
            rotate: feature.scatter.rotate,
            scale: feature.scatter.scale,
          }"
          :whileInView="{
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }"
          :viewport="{
            once: false,
            amount: 0.3,
          }"
          :transition="{
            duration: 0.5,
            delay: index * 0.08,
            type: 'spring',
            stiffness: 90,
            damping: 14,
          }"
          :whileHover="{
            scale: 1.05,
          }"
          class="bg-card border-border hover:border-primary/50 rounded-2xl border p-2 transition-colors"
        >
          <div class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
            <UIcon :name="feature.icon" class="text-primary h-6 w-6" />
          </div>
          <h3 class="mb-2 text-xl font-bold">{{ t(feature.title) }}</h3>
          <p class="text-muted-foreground">
            {{ t(feature.description) }}
          </p>
        </UCard>
      </div>
    </div>
  </section>
</template>
