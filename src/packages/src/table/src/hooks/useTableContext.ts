/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-19 16:28:15
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-19 16:28:15
 */
import { createContext, useContext } from '@/hooks/useContext'
import type { permitType } from '../types'
import type { ComputedRef, InjectionKey } from 'vue'

export interface tableProviderContextProps {
  permit: ComputedRef<permitType | undefined>
}

const key: InjectionKey<tableProviderContextProps> = Symbol()

export function createTableProviderContext(context: tableProviderContextProps) {
  return createContext<tableProviderContextProps>(context, key)
}

export function useTableProviderContext() {
  return useContext<tableProviderContextProps>(key)
}
