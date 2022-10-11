/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-11 10:06:46
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-11 10:08:51
 */
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

const modules = import.meta.glob('../views/**/**/**/*.vue')
export const getRoute = (list, props = false) => {
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
          component: () => import('@/pages/layout/index.vue'),
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
      route = [...route, ...getRoute(children, props)]
    }
  })
  return route
}
