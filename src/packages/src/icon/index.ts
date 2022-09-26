/*
 * @description:
 * @Author: liwg
 * @Date: 2022-07-12 10:21:16
 * @LastEditors: liwg
 * @LastEditTime: 2022-07-12 10:37:07
 */
import { App } from 'vue'

import NsIcon from './src/index.vue'

/* istanbul ignore next */

export default {
  install(app: App<Element>) {
    app.component(NsIcon.name, NsIcon)
  }
}
