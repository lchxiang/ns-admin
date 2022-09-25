/*
 * @description:
 * @Author: liwg
 * @Date: 2022-06-05 15:06:49
 * @LastEditors: liwg
 * @LastEditTime: 2022-06-05 15:21:54
 */
import { CSSProperties, VNodeChild } from 'vue'
import { createTypes, VueTypeValidableDef, VueTypesInterface } from 'vue-types'

export type VueNode = VNodeChild | JSX.Element

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>
  readonly VNodeChild: VueTypeValidableDef<VueNode>
  // readonly trueBool: VueTypeValidableDef<boolean>;
}

const vueTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
  array: undefined
}) as PropTypes

vueTypes.extend([
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined
  },
  {
    name: 'VNodeChild',
    getter: true,
    type: undefined
  }
])
export { vueTypes }
