/*
 * @description:
 * @Author: liwg
 * @Date: 2022-06-07 15:41:05
 * @LastEditors: liwg
 * @LastEditTime: 2022-06-07 15:41:05
 */
const projectName = import.meta.env.VITE_GLOB_APP_TITLE

export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`)
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`)
}
