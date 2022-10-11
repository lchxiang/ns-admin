/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-09 16:55:24
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-10 10:25:54
 */
import { defineComponent } from 'vue'
import { IconFont } from './IconFont'
import SvgIcon from './IconSvg'
import { iconProps } from './types'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'NsIcon',
  inheritAttrs: false,
  props: iconProps,
  setup(props, { attrs, slots }) {
    const getStyle = computed<CSSProperties>(() => {
      const { size } = props
      let fontSize = `${size}`
      fontSize = `${fontSize.replace('px', '')}px`
      if (props.type === 'font') {
        return {
          fontSize,
          color: props.color
        }
      }
      return {
        fontSize
      }
    })

    return () =>
      slots.default ? (
        slots.default?.()
      ) : props.type === 'svg' ? (
        <SvgIcon
          class="ns-icon"
          {...attrs}
          icon={props.icon}
          style={unref(getStyle)}
        ></SvgIcon>
      ) : (
        <IconFont
          class="ns-icon"
          {...attrs}
          type={props.icon}
          style={unref(getStyle)}
        ></IconFont>
      )
  }
})
