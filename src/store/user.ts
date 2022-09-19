import type { Ref } from 'vue'

import { defineStore } from 'pinia'
interface UserStore {
  token: Ref<string>
  userInfo: Ref<Record<string, any>>
}
export const useUserStore = defineStore('app-user', (): UserStore => {
  const token = ref('')
  const userInfo = ref()

  return {
    token,
    userInfo
  }
})
