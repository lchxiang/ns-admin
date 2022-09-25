/*
 * @description:
 * @Author: liwg
 * @Date: 2022-07-08 14:44:14
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-19 11:04:48
 */
import type { LocaleSetting, LocaleType } from '#/config'

export const LOCALE: Recordable<LocaleType> = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
  ZH_HK: 'zh_HK'
}

export const localeSetting: LocaleSetting = {
  showPicker: true,
  locale: LOCALE.ZH_CN,
  fallback: LOCALE.ZH_CN,
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US, LOCALE.ZH_HK]
}

export const localeList = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN
  },
  {
    text: 'English',
    event: LOCALE.EN_US
  },
  {
    text: '繁体中文',
    event: LOCALE.ZH_HK
  }
]
