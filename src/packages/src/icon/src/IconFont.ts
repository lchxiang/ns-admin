/*
 * @description:
 * @Author: liwg
 * @Date: 2022-07-13 19:57:28
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-03 10:28:28
 */
import { createFromIconfontCN } from '@ant-design/icons-vue'

import { isDev } from '@/utils/env'

// 定义iconfont库
const iconfontVersion = ['3508681_g471vxm86lv']
// const iconfontUrlCss = `//at.alicdn.com/t/font_$key.css`
const iconfontUrljs = `https://at.alicdn.com/t/c/font_$key.js`

// 定义动态插入方法
// const loadStyle = (url: string) => {
//   const link = document.createElement('link')
//   link.type = 'text/css'
//   link.rel = 'stylesheet'
//   link.href = url
//   const head = document.getElementsByTagName('head')[0]
//   head.appendChild(link)
// }

// 新增 导出
export const IconFont = createFromIconfontCN({
  scriptUrl: isDev()
    ? iconfontUrljs.replace('$key', iconfontVersion[0])
    : new URL('../../../../assets/font/iconfont.js', import.meta.url).href
})

// 动态插入
// iconfontVersion.forEach((ele) => {
//   loadStyle(iconfontUrlCss.replace('$key', ele))
// })
