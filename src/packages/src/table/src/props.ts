import type {
  NsButtonProps,
  NsColumnProps,
  OperationConfig,
  permitType
} from './types'
import type { NsForm, NsFormItem } from '../../form/types'
import type { VxeGridProps } from 'vxe-table'

export const btnProps = {
  btnList: {
    type: Array as PropType<NsButtonProps[]>,
    default: () => []
  }
}
//表格操作props、类型
export const operationProps = {
  operationList: {
    type: Array as PropType<NsButtonProps[]>,
    default: () => []
  },
  // 操作设置
  operationConfig: {
    type: Object as PropType<OperationConfig>,
    default: () => ({})
  }
}

export const nsTableProps = {
  gridConfig: {
    type: Object as PropType<VxeGridProps>
  },
  formList: {
    type: Array as PropType<NsFormItem[]>,
    default: () => []
  },
  // 查询表单配置项
  formConfig: {
    type: Object as PropType<Omit<NsForm, 'formList'>>,
    default: () => ({})
  },
  permit: {
    type: Function as PropType<permitType>,
    default: undefined
  },
  btnList: {
    type: Array as PropType<NsButtonProps[]>,
    default: () => []
  },
  loadSuccess: {
    type: Function as PropType<Fn>
  },
  url: {
    type: String as PropType<string>
  },
  queryParams: {
    type: [Function, Object] as PropType<
      Recordable | Fn<Recordable, Recordable>
    >
  },
  isFormData: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  columns: {
    type: Array as PropType<NsColumnProps[]>,
    require: true
  },
  resultFiled: {
    type: String as PropType<string>,
    default: 'data.list'
  },
  ...operationProps
}
