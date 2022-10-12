/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-12 09:47:58
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-12 09:58:06
 */
import type { RouteRecordName } from 'vue-router'

export type MenuType = 'menu' | 'btn' | 'detail'
export type PageType = 'page' | 'layout'
export interface MenuItem {
  name: string
  componentUrl?: string
  url?: string
  icon?: string
  menuType: MenuType
  pageType: PageType
  routeName?: RouteRecordName
  children?: MenuItem[]
}
