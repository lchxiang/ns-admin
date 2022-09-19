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
export interface EnvConfig {
  shortName: string
}
export function getAppEnvConfig(): EnvConfig {
  const { VITE_GLOB_APP_SHORT_NAME: shortName } = import.meta.env
  return {
    shortName
  }
}
