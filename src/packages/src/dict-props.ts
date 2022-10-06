import { vueTypes } from '@/utils/vueTypes'
import type { ExtractPropTypes } from 'vue'
export const dictProps = {
  labelKey: vueTypes.string.def('name'),
  valueKey: vueTypes.string.def('id'),
  url: vueTypes.string,
  listPath: vueTypes.string,
  options: vueTypes.array,
  ajaxData: vueTypes.object,
  proxy: {
    type: Function as PropType<PromiseFn>
  },
  resultPath: {
    type: String as PropType<string>,
    default: 'data.list'
  }
}

export type DictProps = ExtractPropTypes<typeof dictProps>
