/*
 * @description:
 * @Author: liwg
 * @Date: 2022-05-02 18:11:10
 * @LastEditors: liwg
 * @LastEditTime: 2022-05-02 22:02:15
 */
import type { EncryptionParams } from '@/utils/cipher'
import { AesEncryption } from '@/utils/cipher'
import { isNullOrUnDef } from '@/utils/is'
export interface CreateStorageParams {
  prefixKey: string
  storage: Storage
  isEncrypt: boolean
  timeout?: Nullable<number>
  encryptionParams: EncryptionParams
}

export const createStorage = ({
  prefixKey = '',
  storage = localStorage,
  encryptionParams = {
    key: '',
    iv: ''
  },
  timeout = null,
  isEncrypt = true
}: Partial<CreateStorageParams> = {}) => {
  if (
    isEncrypt &&
    [encryptionParams.key.length, encryptionParams.iv.length].some((item) => item !== 16)
  ) {
    throw new Error('When isEncrypt is true, the key or iv must be 16 bits!')
  }

  const encryption = new AesEncryption(encryptionParams)

  /**
   * Cache class
   * Construction parameters can be passed into sessionStorage, localStorage,
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private storage: Storage
    private prefixKey?: string
    private encryption: AesEncryption
    private isEncrypt: boolean
    /**
     *
     * @param {*} storage
     */
    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
      this.encryption = encryption
      this.isEncrypt = isEncrypt
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    /**
     * Set cache
     * @param {string} key
     * @param {*} value
     * @param {*} expire Expiration time in seconds
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null
      })
      const stringifyValue = this.isEncrypt ? this.encryption.encryptByAES(stringData) : stringData
      this.storage.setItem(this.getKey(key), stringifyValue)
    }

    /**
     * Read cache
     * @param {string} key
     * @param {*} def
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key))
      if (!val) return def

      try {
        const decVal = this.isEncrypt ? this.encryption.decryptByAES(val) : val
        const data = JSON.parse(decVal)
        const { value, expire } = data
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value
        }
        this.remove(key)
      } catch (e) {
        return def
      }
    }

    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    /**
     * Delete all caches of this instance
     */
    clear(): void {
      this.storage.clear()
    }
  }
  return new WebStorage()
}
