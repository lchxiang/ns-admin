/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-19 16:28:15
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-19 16:28:15
 */
import { createContext, useContext } from '@/hooks/useContext'
import type { InjectionKey, Ref } from 'vue'

export interface NsProviderContextProps {
  dateFormat: Ref<string>
  dateValueFormat: Ref<string>
  timeFormat: Ref<string>
  timeValueFormat: Ref<string>
  valueKey: Ref<string>
  labelKey: Ref<string>
}

const key: InjectionKey<NsProviderContextProps> = Symbol()

export function createNsProviderContext(context: NsProviderContextProps) {
  return createContext<NsProviderContextProps>(context, key)
}

export function useNsProviderContext() {
  return useContext<NsProviderContextProps>(key)
}
