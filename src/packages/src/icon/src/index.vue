<!--
 * @description: 
 * @Author: liwg
 * @Date: 2022-07-12 10:21:37
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-03 10:27:01
-->
<script lang="tsx">
  import type { CSSProperties, PropType } from 'vue'

  import { defineComponent } from 'vue'

  import { vueTypes } from '@/utils/vueTypes'
  import { IconFont } from './IconFont'
  import SvgIcon from './IconSvg.vue'

  export default defineComponent({
    name: 'NsIcon',
    inheritAttrs: false,
    props: {
      type: vueTypes.oneOf(['svg', 'font']).def('font'),
      icon: vueTypes.string,
      color: vueTypes.string,
      size: {
        type: [Number, String] as PropType<number | string>,
        default: 16
      }
    },
    setup(props, { attrs, slots }) {
      const getStyle = computed((): CSSProperties => {
        const { size } = props
        let fontSize = `${size}`
        fontSize = `${fontSize.replace('px', '')}px`
        if (props.type == 'font') {
          return {
            fontSize,
            color: props.color
          }
        }
        return {
          fontSize
        }
      })
      console.log(attrs, 785)
      return () =>
        slots.default ? (
          slots.default?.()
        ) : props.type === 'svg' ? (
          <SvgIcon class="ns-icon" {...attrs} icon={props.icon} style={unref(getStyle)}></SvgIcon>
        ) : (
          <IconFont class="ns-icon" {...attrs} type={props.icon} style={unref(getStyle)}></IconFont>
        )
    }
  })
</script>
<style lang="less">
  .ns-icon-font {
    vertical-align: baseline;
  }
</style>
