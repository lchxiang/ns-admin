/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-30 09:41:21
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-10 16:15:58
 */
import { defineStore } from 'pinia'
import http from '@/utils/http'
import { getRoute } from '@/router/helper'
import { router } from '@/router/index'
import { store } from './index'
import type { Ref } from 'vue'
import type { LoginForm, LoginResult } from '@/pages/login/types'
interface UserStore {
  token: Ref<string>
  userInfo: Ref<Record<string, any>>
  login: (formModel: LoginForm) => Promise<void>
  getUserMenu: () => Promise<void>
}

export const useUserStore = defineStore('app-user', (): UserStore => {
  let token = $ref('')
  let userInfo = $ref<LoginResult['userInfo']>()
  const login = async (formModel: LoginForm) => {
    const { token: rawToken, userInfo: rawUserInfo } =
      await http.post<LoginResult>({
        url: '/login',
        data: formModel
      })
    token = rawToken
    userInfo = rawUserInfo
  }

  const getUserMenu = async () => {
    const { list } = await http.post({
      url: '/getUserMenus'
    })

    const addRoutes = getRoute(list)
    console.log(addRoutes)

    addRoutes.forEach((item) => {
      router.addRoute(item)
    })
    router.push({ name: 'SysMenu' })
  }

  return {
    ...$$({
      token,
      userInfo
    }),
    login,
    getUserMenu
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
