/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-19 16:28:15
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-19 16:28:15
 */
import { createContext, useContext } from '@/hooks/useContext'
import type { InjectionKey } from 'vue'
import type { GlobalConfigRef as NsProviderContextProps } from './../global-config'

const key: InjectionKey<NsProviderContextProps> = Symbol()

export function createNsProviderContext(context: NsProviderContextProps) {
  return createContext<NsProviderContextProps>(context, key)
}

export function useNsProviderContext() {
  return useContext<NsProviderContextProps>(key)
}
