/*
 * @description:前端持久化存储配置
 * @Author: liwg
 * @Date: 2022-05-02 20:45:48
 * @LastEditors: liwg
 * @LastEditTime: 2022-05-13 15:26:20
 */
import pkg from '../../package.json'
import { getEnv, isDev } from '@/utils/env'
const { VITE_GLOB_APP_SHORT_NAME } = import.meta.env
export default {
  // 是否加密
  isEncrypt: !isDev,
  // ENS加密参数
  encryptionParams: {
    key: '890@iop#normstar',
    iv: '0123456789ABCDEF'
  },
  // 过期时间
  timeout: 60 * 60 * 24 * 7,
  //前缀
  prefixKey: `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}__${pkg.version}`.toUpperCase()
}
