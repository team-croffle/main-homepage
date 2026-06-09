// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/pages/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

export default router;
