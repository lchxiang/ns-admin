/*
 * @description:
 * @Author: liwg
 * @Date: 2022-05-01 19:49:36
 * @LastEditors: liwg
 * @LastEditTime: 2022-06-12 20:09:12
 */
//获取当前模式
export function getEnv(): string {
  return import.meta.env.MODE
}
//是否开发环境
export function isDev(): boolean {
  return import.meta.env.DEV
}
//是否生产环境
export function isPro(): boolean {
  return import.meta.env.PROD
}

export function getAppEnvConfig() {
  const { VITE_GLOB_APP_SHORT_NAME: shortName } = import.meta.env
  return {
    shortName,
    apiUrl: `/api${shortName}`,
    fileUrl: `/file${shortName}`
  }
}
