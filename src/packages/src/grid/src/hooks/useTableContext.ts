/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-19 16:28:15
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-19 16:28:15
 */
import { createContext, useContext } from '@/hooks/useContext'
import type { NsButtonProps, OperationConfig, permitType } from './../types'
import type { InjectionKey, Ref } from 'vue'

export interface tableProviderContextProps {
  operationsConfig: Ref<OperationConfig>
  permit: Ref<permitType | undefined>
  operationList: Ref<NsButtonProps[]>
}

const key: InjectionKey<tableProviderContextProps> = Symbol()

export function createTableProviderContext(context: tableProviderContextProps) {
  return createContext<tableProviderContextProps>(context, key)
}

export function useTableProviderContext() {
  return useContext<tableProviderContextProps>(key)
}
