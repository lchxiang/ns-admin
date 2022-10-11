/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-09 16:55:42
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-09 17:24:59
 */
import { vueTypes } from '@/utils/vueTypes'
import type { ExtractPropTypes } from 'vue'

export type IconType = 'svg' | 'font'

export type IconProps = ExtractPropTypes<typeof iconProps>

export const iconProps = {
  type: {
    type: String as PropType<IconType>,
    default: 'font'
  },
  icon: vueTypes.string,
  color: vueTypes.string,
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 16
  }
}
