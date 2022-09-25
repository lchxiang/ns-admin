/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-19 16:28:15
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-19 16:28:15
 */
/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-19 16:12:05
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-19 16:16:19
 */
import { InjectionKey, Ref } from 'vue'

import { createContext, useContext } from './useContext'

export interface AppProviderContextProps {
  isMobile: Ref<boolean>
}

const key: InjectionKey<AppProviderContextProps> = Symbol()

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key)
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key)
}
