import type { PropType } from 'vue'
import type { ColProps } from 'ant-design-vue'

import { NsFormItem, NsFormBtn } from './types/form'
import { vueTypes } from '@/utils/vueTypes'

export default {
  modelValue: vueTypes.object,
  type: vueTypes.oneOf(['searchForm', 'normalForm', undefined] as const).def('normalForm'),
  formList: {
    type: Array as PropType<NsFormItem[]>,
    default: () => []
  },
  colon: vueTypes.bool.def(true),
  hideRequiredMark: vueTypes.bool.def(false),
  labelAlign: vueTypes.oneOf(['left', 'right'] as const).def('right'),
  labelCol: {
    type: Object as PropType<Partial<ColProps>>
  },
  wrapperCol: {
    type: Object as PropType<Partial<ColProps>>
  },
  layout: vueTypes.oneOf(['horizontal', 'vertical', 'inline'] as const).def('horizontal'),
  noStyle: vueTypes.bool.def(false),
  scrollToFirstError: vueTypes.bool.def(false),
  validateOnRuleChange: vueTypes.bool.def(true),
  disabled: vueTypes.bool.def(false),
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: 80
  },
  searchBtn: {
    type: Object as PropType<Partial<NsFormBtn>>,
    default: () => ({})
  },
  resetBtn: {
    type: Object as PropType<Partial<NsFormBtn>>,
    default: () => ({})
  },
  searchLoading: {
    type: Boolean,
    default: false
  },
  formFormat: {
    type: Function as PropType<Fn>
  }
}
