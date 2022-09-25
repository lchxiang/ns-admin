/*
 * @description:
 * @Author: liwg
 * @Date: 2022-06-13 15:24:40
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-06 10:21:02
 */
import type { RouteLocationNormalizedLoaded } from 'vue-router'

import { useRoute } from 'vue-router'
export function usePermission() {
  const currentRoute: RouteLocationNormalizedLoaded = useRoute()
  const permissionBtns = currentRoute?.meta?.permissionBtns
  function hasPermission(code: number) {
    return permissionBtns && permissionBtns[code]
  }
  return {
    hasPermission
  }
}
