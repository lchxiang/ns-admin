/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-30 09:41:21
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-13 10:00:33
 */
import { defineStore } from 'pinia'
import http from '@/utils/http'
import { getFirstRouteName, getRoutes } from '@/router/helper'
import { router } from '@/router/index'
import { store } from './index'
import type { RouteRecordName } from 'vue-router'
import type { Ref } from 'vue'
import type { LoginForm, LoginResult } from '@/pages/login/types'
import type { MenuItem } from '@/router/types'

interface UserStore {
  token: Ref<string>
  userInfo: Ref<Record<string, any>>
  userMenus: Ref<MenuItem[]>
  firstRouteName: Ref<RouteRecordName>
  login: (formModel: LoginForm) => Promise<void>
  getUserMenu: () => Promise<void>
}

export const useUserStore = defineStore(
  'app-user',
  (): UserStore => {
    let token = $ref('')
    let firstRouteName = $ref<RouteRecordName>()
    let userInfo = $ref<LoginResult['userInfo']>()
    let userMenus = $ref<MenuItem[]>([])
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
      const { list } = await http.post<{ list: MenuItem[] }>({
        url: '/getUserMenus'
      })
      if (list.length > 0) {
        userMenus = list
        const addRoutes = getRoutes(list)
        firstRouteName = getFirstRouteName(list) as RouteRecordName
        addRoutes.forEach((item) => {
          router.addRoute(item)
        })
      }
    }

    return {
      ...$$({
        token,
        userInfo,
        firstRouteName,
        userMenus
      }),
      login,
      getUserMenu
    }
  },
  {
    persist: {
      paths: ['token', 'userInfo']
    }
  }
)

export function useUserStoreWithOut() {
  return useUserStore(store)
}
