import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import { getAppEnvConfig } from '@/utils/env'
import { constantRouter } from './constant-route'
const envConfig = getAppEnvConfig()
export const router = createRouter({
  history: createWebHistory(envConfig.shortName),
  routes: constantRouter,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  strict: true
})

const whiteList = ['login', 'findPassword']
router.beforeEach(async (to, _from, next) => {
  // const { token } = useUserStore()
  if (false) {
    if (to.name === 'login') {
      next({
        name: 'activityList',
        replace: true
      })
    } else {
      next()
    }
  } else {
    if (to.name && whiteList.includes(to.name as string)) {
      next()
    } else {
      next('/login')
    }
  }
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}
