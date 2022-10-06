import { vueTypes } from '@/utils/vueTypes'
import { createNsProviderContext } from './hooks/useNsContext'
import { initDefaultProps } from './_utils/props'
import { globalConfig } from './global-config'
import type { VxeGridProps } from 'vxe-table'
import type { OperationConfig } from './table/src/types'
export const nsProviderProps = {
  dateFormat: vueTypes.string,
  dateValueFormat: vueTypes.string,
  timeFormat: vueTypes.string,
  timeValueFormat: vueTypes.string,
  valueKey: vueTypes.string,
  labelKey: vueTypes.string,
  operationConfig: {
    type: Object as PropType<OperationConfig>,
    default: () => ({})
  },
  gridConfig: {
    type: Object as PropType<VxeGridProps>,
    default: () => ({})
  }
}
export default defineComponent({
  name: 'NsProvider',
  inheritAttrs: false,
  props: initDefaultProps(nsProviderProps, globalConfig),
  setup(props, { slots }) {
    createNsProviderContext($$(props))
    return () => slots.default?.()
  }
})
