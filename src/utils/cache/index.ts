/*
 * @description:
 * @Author: liwg
 * @Date: 2022-05-02 21:48:42
 * @LastEditors: liwg
 * @LastEditTime: 2022-07-08 14:53:44
 */
import { createStorage as create, CreateStorageParams } from './storage'
import storageSettings from '@/settings/storage'
export type Options = Partial<CreateStorageParams>

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    storage,
    ...storageSettings,
    ...options
  }
}

export const webStorage = create(createOptions(localStorage))

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options))
}

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options })
}

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options })
}

export default webStorage
