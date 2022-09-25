import { createRouter, createWebHistory } from 'vue-router'

import { getAppEnvConfig } from '@/utils/env'
import { useUserStore } from '@/store/user'
import { constantRouter } from './constant-route'
import type { App } from 'vue'
const envConfig = getAppEnvConfig()
export const router = createRouter({
  history: createWebHistory(envConfig.shortName),
  routes: constantRouter,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  strict: true
})

const whiteList = ['Login']

router.beforeEach((to, _from, next) => {
  const { token } = useUserStore()
  if (token) {
    if (to.name === 'Login') {
      next({
        name: 'activityList',
        replace: true
      })
    } else {
      next()
    }
  } else if (to.name && whiteList.includes(to.name as string)) {
    next()
  } else {
    next({ name: 'Login' })
  }
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}
