/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-30 09:41:21
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-13 10:03:16
 */
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

router.beforeEach(async (to, _from, next) => {
  const { token, firstRouteName, userMenus, getUserMenu } = useUserStore()
  if (token) {
    if (userMenus.length === 0) {
      await getUserMenu()
      next({ ...to })
    } else if (to.name === 'Login') {
      next({
        name: firstRouteName,
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
