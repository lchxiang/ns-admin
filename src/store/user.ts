/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-30 09:41:21
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-10 16:15:58
 */
import { defineStore } from 'pinia'
import http from '@/utils/http'
import { store } from './index'
import type { Ref } from 'vue'
import type { LoginForm, LoginResult } from '@/pages/login/types'
interface UserStore {
  token: Ref<string>
  userInfo: Ref<Record<string, any>>
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

  return $$({
    token,
    userInfo,
    login
  })
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
