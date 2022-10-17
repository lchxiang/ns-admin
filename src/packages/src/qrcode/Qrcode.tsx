/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-14 14:38:01
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-17 16:04:26
 */
import uniqueId from 'lodash-es/uniqueId'
import QRCodeStyling from 'qr-code-styling'
import { omit } from 'lodash-es'
import { deepMerge } from '@/utils/utils'
import { defaultOptions } from './options'
import { qrcodeProps } from './types'

export default defineComponent({
  name: 'NsQrcode',
  props: qrcodeProps,
  setup(props, { expose }) {
    const id = uniqueId('qrcode')
    const realOptions = computed(() => {
      return deepMerge(defaultOptions, props.options)
    })

    const qrcodeOptions = computed(() => {
      return omit(unref(realOptions), 'border')
    })

    const getContainerStyle = computed(() => {
      const { height: pHeight, width: pWidth, border } = unref(realOptions)
      if (!border || !border.show) {
        return {}
      }
      const { width, height, padding, color } = border
      const realH = (pHeight as number) + (padding as number) * 2
      const realW = (pWidth as number) + (padding as number) * 2
      return {
        height: `${realW as number}px`,
        width: `${realH as number}px`,
        backgroundImage: Array.from({ length: 8 })
          .fill(`linear-gradient(${color}, ${color})`)
          .toString(),
        backgroundPosition:
          'left top,left top,right top,right top,right bottom,right bottom,left bottom,left bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${width}px ${height}px,${height}px ${width}px`
      }
    })

    const qrcode = new QRCodeStyling(unref(qrcodeOptions))
    watch(
      () => unref(qrcodeOptions),
      (val) => {
        if (val && qrcode.update) {
          qrcode.update(val)
        }
      },
      {
        deep: true
      }
    )

    onMounted(() => {
      const container = document.querySelector(`#${id}`)
      if (container) {
        qrcode.append(container as HTMLElement)
      }
    })

    expose({
      qrcode
    })
    return () => (
      <div class="ns-qrcode" style={unref(getContainerStyle)} id={id}></div>
    )
  }
})
