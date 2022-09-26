/*
 * @description:
 * @Author: liwg
 * @Date: 2022-07-02 09:28:00
 * @LastEditors: liwg
 * @LastEditTime: 2022-07-12 09:41:16
 */
import type { Slots } from 'vue'

import { isFunction } from '@/utils/is'
/**
 * 根据字符串找到对象中对应的值
 * 例如在obj中查找 obj.data.list.page对应的值
 * getValueByPath(obj,'data.list.page')
 * @param {*} object   要查找的对象
 * @param {*} prop 字符串 索引路径
 */
export const getValueByPath = function (object: Recordable, prop: string): any {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

/**
 *
 * @param slots 组件插槽
 * @param slot 插槽名称
 * @param data 插槽数据
 * @returns
 */
export function getSlot(slots: Slots, slot = 'default', data?: any) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  return slotFn(data)
}
