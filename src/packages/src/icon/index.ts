/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-30 09:41:21
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-10 10:09:22
 */
import NsIcon from './Icon'
import type { App, Plugin } from 'vue'
/* istanbul ignore next */
NsIcon.install = function (app: App) {
  app.component(NsIcon.name, NsIcon)
  return app
}

export default NsIcon as typeof NsIcon & Plugin
