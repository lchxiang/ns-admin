import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory('/liwg'),
  routes: [],
  scrollBehavior: () => ({ left: 0, top: 0 }),
  strict: true
})
