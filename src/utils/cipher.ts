/*
 * @description:
 * @Author: liwg
 * @Date: 2022-04-09 20:39:21
 * @LastEditors: liwg
 * @LastEditTime: 2022-05-01 17:03:05
 */
import { AES, enc, mode, pad } from 'crypto-js'
// import { encrypt, decrypt } from 'crypto-js/aes'
// import ECB from 'crypto-js/mode-ecb'
// import UTF8, { parse } from 'crypto-js/enc-utf8'
// import pkcs7 from 'crypto-js/pad-pkcs7'
import md5 from 'crypto-js/md5'
import Base64 from 'crypto-js/enc-base64'

import globSetting from '@/settings/storage'
export interface EncryptionParams {
  key: string
  iv: string
}

//Advanced Encryption Standard  aes-128-cbc
export class AesEncryption {
  private key
  private iv
  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key, iv } = opt
    if (key) this.key = enc.Utf8.parse(key)
    if (iv) this.iv = enc.Utf8.parse(iv)
  }
  get getOption() {
    return {
      mode: mode.CBC,
      padding: pad.Pkcs7,
      iv: this.iv
    }
  }

  public encryptByAES(cipherText: string) {
    return AES.encrypt(cipherText, this.key as unknown as string, this.getOption)
      .ciphertext.toString()
      .toUpperCase()
  }

  decryptByAES(cipherText: string) {
    const encryptedHexStr = enc.Hex.parse(cipherText)
    const srcs = enc.Base64.stringify(encryptedHexStr)
    return AES.decrypt(srcs, this.key as unknown as string, this.getOption).toString(
      enc.Utf8 as any
    )
  }
}

export const aesEncryption = new AesEncryption(globSetting.encryptionParams)

export function encryptByBase64(cipherText: string) {
  return enc.Utf8.parse(cipherText).toString(Base64)
}

export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(enc.Utf8)
}

//Message-Digest Algorithm  128  单项哈希算法不可逆
export function encryptByMd5(password: string) {
  return md5(password).toString()
}
