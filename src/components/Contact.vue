<script setup lang="ts">
  import { motion } from 'motion-v';
  import BaselineDiscordIcon from '@iconify-vue/ic/baseline-discord';
  import { useI18n } from 'vue-i18n';
  import { reactive } from 'vue';

  const { t } = useI18n();
  const toast = useToast();
  const state = reactive({
    name: undefined,
    email: undefined,
    title: undefined,
    content: undefined,
  });

  const contactInfo = {
    email: 'support@croffledev.kr',
    discord: '@bluenyang2251',
    github: '@team-croffle',
  };

  function clearState() {
    state.name = undefined;
    state.email = undefined;
    state.title = undefined;
    state.content = undefined;
  }

  async function onContactSubmit() {
    const resp = await fetch(`${import.meta.env.VITE_CMS_URL}/items/contact_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });

    if (resp.status === 200) {
      toast.add({
        title: t('main.contact.form.toast.success.title'),
        description: t('main.contact.form.toast.success.description'),
        icon: 'i-lucide-check-circle',
        color: 'success',
      });
      clearState();
    } else {
      toast.add({
        title: t('main.contact.form.toast.error.title'),
        description: t('main.contact.form.toast.error.description'),
        icon: 'i-lucide-check-circle',
        color: 'error',
      });
    }
  }
</script>

<template>
  <section id="contact" class="py-24">
    <div class="container mx-auto px-6">
      <motion.div
        :initial="{ opacity: 0, y: -40 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: false, amount: 0.5 }"
        :transition="{ duration: 0.6 }"
        class="mb-16 text-center"
      >
        <h2 class="mb-4 text-4xl font-bold">{{ t('main.contact.header') }}</h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          {{ t('main.contact.description') }}
        </p>
      </motion.div>

      <div class="mx-auto max-w-4xl">
        <div class="mb-12 grid grid-cols-1 gap-8 overflow-hidden md:grid-cols-3">
          <motion.div
            :initial="{ opacity: 0, x: -80, rotate: -12, scale: 0.8 }"
            :whileInView="{ opacity: 1, x: 0, rotate: 0, scale: 1 }"
            :viewport="{ once: false, amount: 0.3 }"
            :transition="{ duration: 0.5, delay: 0.05, type: 'spring', stiffness: 90, damping: 13 }"
            :whileHover="{ scale: 1.05, y: -5 }"
            class="bg-card border-border rounded-xl border p-6 text-center"
          >
            <div
              class="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <UIcon name="i-lucide-mail" class="text-primary h-6 w-6" />
            </div>
            <h3 class="mb-2 font-bold">{{ t('main.contact.email.title') }}</h3>
            <a :href="`mailto:${contactInfo.email}`">
              <p class="text-muted-foreground hover:text-primary transition-colors hover:underline">
                {{ contactInfo.email }}
              </p>
            </a>
          </motion.div>

          <motion.div
            :initial="{ opacity: 0, y: 60, scale: 0.8 }"
            :whileInView="{ opacity: 1, y: 0, scale: 1 }"
            :viewport="{ once: false, amount: 0.3 }"
            :transition="{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 90, damping: 13 }"
            :whileHover="{ scale: 1.05, y: -5 }"
            class="bg-card border-border rounded-xl border p-6 text-center"
          >
            <div
              class="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <BaselineDiscordIcon class="text-primary h-6 w-6" />
            </div>
            <h3 class="mb-2 font-bold">{{ t('main.contact.discord.title') }}</h3>
            <a href="https://www.discord.com/users/391605125245960192" target="_blank">
              <p class="text-muted-foreground hover:text-primary transition-colors hover:underline">
                {{ contactInfo.discord }}
              </p>
            </a>
          </motion.div>

          <motion.div
            :initial="{ opacity: 0, x: 80, rotate: 12, scale: 0.8 }"
            :whileInView="{ opacity: 1, x: 0, rotate: 0, scale: 1 }"
            :viewport="{ once: false, amount: 0.3 }"
            :transition="{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 90, damping: 13 }"
            :whileHover="{ scale: 1.05, y: -5 }"
            class="bg-card border-border rounded-xl border p-6 text-center"
          >
            <div
              class="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <UIcon name="i-lucide-github" class="text-primary h-6 w-6" />
            </div>
            <h3 class="mb-2 font-bold">{{ t('main.contact.github.title') }}</h3>
            <a href="https://github.com/team-croffle" target="_blank">
              <p class="text-muted-foreground hover:text-primary transition-colors hover:underline">
                {{ contactInfo.github }}
              </p>
            </a>
          </motion.div>
        </div>

        <motion.div
          :initial="{ opacity: 0, scale: 0.9, y: 40 }"
          :whileInView="{ opacity: 1, scale: 1, y: 0 }"
          :viewport="{ once: false, amount: 0.15 }"
          :transition="{ duration: 0.55, delay: 0.1, type: 'spring', stiffness: 75, damping: 13 }"
          class="bg-card border-border rounded-xl border p-8"
        >
          <UForm class="space-y-6" :state="state" @submit="onContactSubmit">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <UFormField
                name="name"
                :label="t('main.contact.form.name.label')"
                :ui="{
                  labelWrapper: 'text-base mb-2 block',
                }"
              >
                <UInput
                  v-model="state.name"
                  class="w-full rounded-lg text-xl"
                  type="text"
                  :placeholder="t('main.contact.form.name.placeholder')"
                  :ui="{
                    base: 'h-12 bg-input outline-none px-4 py-3 ring-border transition-colors font-semibold text-base sm:text-base lg:text-base',
                  }"
                />
              </UFormField>
              <div>
                <UFormField
                  name="email"
                  :label="t('main.contact.form.email.label')"
                  :ui="{
                    labelWrapper: 'text-base mb-2 block',
                  }"
                >
                  <UInput
                    v-model="state.email"
                    class="w-full rounded-lg text-xl"
                    type="email"
                    :placeholder="t('main.contact.form.email.placeholder')"
                    :ui="{
                      base: 'h-12 bg-input outline-none px-4 py-3 ring-border transition-colors font-semibold text-base sm:text-base lg:text-base',
                    }"
                  />
                </UFormField>
              </div>
            </div>

            <div>
              <UFormField
                name="title"
                :label="t('main.contact.form.title.label')"
                :ui="{
                  labelWrapper: 'text-base mb-2 block',
                }"
              >
                <UInput
                  v-model="state.title"
                  class="w-full rounded-lg text-xl"
                  type="text"
                  :placeholder="t('main.contact.form.title.placeholder')"
                  :ui="{
                    base: 'h-12 bg-input outline-none px-4 py-3 ring-border transition-colors font-semibold text-base sm:text-base lg:text-base',
                  }"
                />
              </UFormField>
            </div>

            <div>
              <UFormField
                name="content"
                :label="t('main.contact.form.content.label')"
                :ui="{
                  labelWrapper: 'text-base mb-2 block',
                }"
              >
                <UTextarea
                  v-model="state.content"
                  class="w-full rounded-lg text-xl"
                  :placeholder="t('main.contact.form.content.placeholder')"
                  :ui="{
                    base: 'h-32 bg-input outline-none px-4 py-3 ring-border transition-colors font-semibold text-base sm:text-base lg:text-base resize-none',
                  }"
                />
              </UFormField>
            </div>

            <UButton
              type="submit"
              variant="solid"
              class="bg-primary text-primary-foreground w-full justify-center rounded-lg px-8 py-3 text-base font-semibold transition-all hover:scale-102"
            >
              {{ t('main.contact.form.submit') }}
            </UButton>
          </UForm>
        </motion.div>
      </div>
    </div>
  </section>
</template>
