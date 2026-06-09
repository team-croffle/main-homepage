<script setup lang="ts">
  import { useTeamMembers } from '@/features/team/team.hook';
  import { motion } from 'motion-v';
  import { useI18n } from 'vue-i18n';

  const { members, loading } = useTeamMembers();
  const { t } = useI18n();

  function getProfileImageUrl(githubUsername: string) {
    return `https://github.com/${githubUsername}.png?v=4`;
  }
  function getGithubUrl(githubUsername: string) {
    return `https://github.com/${githubUsername}`;
  }
</script>

<template>
  <section v-if="!loading && members.length > 0" id="team" class="py-24">
    <div class="container mx-auto px-6">
      <motion.div
        :initial="{ opacity: 0, y: -40 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: false, amount: 0.5 }"
        :transition="{ duration: 0.6 }"
        class="mb-16 text-center"
      >
        <h2 class="mb-4 text-4xl font-bold">{{ t('main.team.header') }}</h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          {{ t('main.team.description') }}
        </p>
      </motion.div>

      <div class="grid grid-cols-1 gap-8 overflow-hidden md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          v-for="(member, index) in members"
          :key="member.name"
          :initial="{
            opacity: 0,
            x: member.scatter.x,
            y: member.scatter.y,
            scale: 0.7,
            rotate: member.scatter.rotate,
          }"
          :whileInView="{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }"
          :viewport="{ once: false, amount: 0.3 }"
          :transition="{
            duration: 0.55,
            delay: index * 0.08,
            type: 'spring',
            stiffness: 85,
            damping: 13,
          }"
          :whileHover="{ y: -10 }"
          class="group"
        >
          <div
            class="bg-card border-border hover:border-primary/50 relative overflow-hidden rounded-xl border p-6 transition-all"
          >
            <div class="flex flex-col items-center">
              <motion.div
                class="ring-primary/20 mb-4 h-32 w-32 overflow-hidden rounded-full ring-4"
                :whileHover="{ scale: 1.1, rotate: 5 }"
                :transition="{ duration: 0.3 }"
              >
                <img
                  :src="getProfileImageUrl(member.githubUsername)"
                  :alt="member.githubUsername"
                  class="h-full w-full object-cover"
                />
              </motion.div>
              <h3 class="mb-1 text-xl font-bold">{{ member.nickname }}</h3>
              <p class="text-muted-foreground mb-2">{{ member.name }}</p>

              <div class="flex gap-3">
                <ULink
                  as="a"
                  :href="getGithubUrl(member.githubUsername)"
                  class="bg-muted hover:bg-primary/10 text-foreground rounded-lg p-2 transition-colors"
                >
                  <UIcon name="i-lucide-github" class="h-4 w-4" />
                </ULink>
                <ULink
                  as="a"
                  v-if="member.linkedin"
                  :href="member.linkedin"
                  class="bg-muted hover:bg-primary/10 text-foreground rounded-lg p-2 transition-colors"
                >
                  <UIcon name="i-lucide-linkedin" class="h-4 w-4" />
                </ULink>
                <ULink
                  as="a"
                  v-if="member.blog"
                  :href="member.blog"
                  class="bg-muted hover:bg-primary/10 text-foreground rounded-lg p-2 transition-colors"
                >
                  <UIcon name="i-lucide-coffee" class="h-4 w-4" />
                </ULink>
                <ULink
                  as="a"
                  v-if="member.homepage"
                  :href="member.homepage"
                  class="bg-muted hover:bg-primary/10 text-foreground rounded-lg p-2 transition-colors"
                >
                  <UIcon name="i-lucide-home" class="h-4 w-4" />
                </ULink>
                <ULink
                  as="a"
                  :href="`mailto:${member.email}`"
                  class="bg-muted hover:bg-primary/10 text-foreground rounded-lg p-2 transition-colors"
                >
                  <UIcon name="i-lucide-mail" class="h-4 w-4" />
                </ULink>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  <section v-else-if="loading" class="h-screen">
    <div class="flex h-full w-full items-center justify-center">
      <p class="text-xl">{{ t('main.team.loading') }}</p>
    </div>
  </section>
  <section v-else class="h-screen">
    <div class="flex h-full w-full items-center justify-center">
      <p class="text-xl">{{ t('main.team.error') }}</p>
    </div>
  </section>
</template>
