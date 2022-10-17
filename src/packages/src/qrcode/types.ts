/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-17 14:01:43
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-17 15:58:56
 */
import type { Options } from 'qr-code-styling'
import type { ExtractPropTypes } from 'vue'

export const qrcodeProps = {
  options: {
    type: Object as PropType<NsQrcodeOptions>,
    default: () => ({})
  }
}

export type NsQrcodeOptions = Options & {
  border?: {
    show?: boolean
    width?: number
    height?: number
    padding?: number
    color?: string
  }
}

export type QrcodeProps = ExtractPropTypes<typeof qrcodeProps>
