import { computed, unref } from 'vue'
import { isNumber } from '@/utils/is'
import type { Ref } from 'vue'
import type { NsForm, NsFormItem } from '../types/form'

export function useItemLabelWidth(
  formItem: Ref<NsFormItem>,
  propsRef: Ref<NsForm>
) {
  return computed(() => {
    const {
      labelCol = {},
      wrapperCol = {},
      labelWidth,
      disabledLabelWidth
    } = unref(formItem) || {}

    const {
      labelWidth: globalLabelWidth,
      labelCol: globalLabelCol,
      wrapperCol: globWrapperCol,
      layout
    } = unref(propsRef)

    if (
      (!globalLabelWidth && !labelWidth && !globalLabelCol) ||
      disabledLabelWidth
    ) {
      labelCol.style = {
        textAlign: 'left'
      }

      return { labelCol, wrapperCol }
    }

    let width = labelWidth || globalLabelWidth
    const col = { ...globalLabelCol, ...labelCol }
    const wrapCol = { ...globWrapperCol, ...wrapperCol }

    if (width) {
      width = isNumber(width) ? `${width}px` : width
    }

    return {
      labelCol: { style: { width }, ...col },
      wrapperCol: {
        style: {
          width: layout === 'vertical' ? '100%' : `calc(100% - ${width})`
        },
        ...wrapCol
      }
    }
  })
}
