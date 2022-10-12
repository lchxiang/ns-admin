/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-11 10:06:46
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-12 10:23:33
 */
import findTree from 'xe-utils/findTree'
import type { MenuItem } from './types'
import type { RouteRecordRaw } from 'vue-router'
export const getAllBtn = (list) => {
  if (!list || list.length < 0) {
    return {}
  }
  return list.reduce((obj, { menuType, menuCode, name }) => {
    if (menuType === 'btn') {
      obj[menuCode] = name
    }
    return obj
  }, {})
}

//找到第一个权限路由 routeName
export function getFirstRouteName(menus: MenuItem[]) {
  const firstRouteMenu = findTree(menus, ({ routeName, componentUrl, url }) => {
    return (routeName && componentUrl && url) as unknown as boolean
  })
  return firstRouteMenu.item.routeName
}

const modules = import.meta.glob('../views/**/**/**/*.vue')
export const getRoutes = (list: MenuItem[], props = false) => {
  if (!list || list.length === 0) return []
  let route: RouteRecordRaw[] = []
  list.forEach((item) => {
    const {
      componentUrl,
      url,
      routeName,
      name,
      children,
      pageType = 'layout'
    } = item
    const component = modules[`../views${componentUrl}.vue`]
    // const component = () => import(`@/views${componentUrl}.vue`)
    if (componentUrl && url) {
      if (pageType === 'page') {
        route.push({
          path: url,
          name: routeName,
          component,
          meta: {
            title: name,
            permissionBtns: getAllBtn(children)
          }
        })
      } else {
        route.push({
          path: url,
          redirect: { name: routeName },
          component: () => import('@/pages/layout/default/index.vue'),
          children: [
            {
              path: url,
              name: routeName,
              meta: {
                title: name,
                permissionBtns: getAllBtn(children)
              },
              component
            }
          ]
        })
      }
    }
    if (children && children.length > 0) {
      route = [...route, ...getRoutes(children, props)]
    }
  })
  return route
}
