import { defineStore } from 'pinia'
import { store } from './index'
import type { Ref } from 'vue'
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

export function useUserStoreWithOut() {
  return useUserStore(store)
}
