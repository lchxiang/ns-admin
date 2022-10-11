/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-10 10:07:11
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-10 10:26:06
 */

import { vueTypes } from '@/utils/vueTypes'

const iprops = {
  prefix: vueTypes.string.def('icon'),
  icon: vueTypes.string.isRequired,
  color: vueTypes.string
}

export default defineComponent({
  name: 'IconSvg',
  props: iprops,
  setup(props, { attrs }) {
    const symbolId = $computed(() => `#${props.prefix}-${props.icon}`)
    return () => (
      <svg aria-hidden="true" class="svg-icon" {...attrs}>
        <use xlinkHref={symbolId} fill={props.color} />
      </svg>
    )
  }
})
