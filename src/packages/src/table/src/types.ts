import type { nsTableProps } from './props'
import type { ComponentPublicInstance, ExtractPropTypes, Ref } from 'vue'
import type { ButtonProps } from 'ant-design-vue'
import type { VxeGridInstance, VxeTableDefines } from 'vxe-table'
import type { NsFormInstance } from '../../form/index'

export type permitType = Fn<any, boolean>

export type NsTableBtnParams = {
  row?: Recordable
  code?: string
}
export type NsButtonProps = Omit<ButtonProps, 'onClick'> & {
  text?: string | Fn
  alias?: string
  //是否为权限菜单
  isPermit?: boolean
  show?: boolean | Fn
  children?: NsButtonProps[]
  code?: string
  onClick?: (params: NsTableBtnParams) => void
}

export type NsTableInstance = ComponentPublicInstance<NsTableProps>

export type NsTableProps = Partial<ExtractPropTypes<typeof nsTableProps>>

export type NsColumnProps = VxeTableDefines.ColumnOptions & {
  show?: boolean | Fn
}

export type NsTableMethods = {
  setProps: (gridProps: NsTableProps) => void
  refreshTable: (type?: 'query' | 'reload') => void
  resetTable: () => void
}

export type NsTableExpose = NsTableMethods & {
  vxeGridRef: Ref<VxeGridInstance>
  searchFormRef: Ref<NsFormInstance>
}

export type OperationConfig = NsColumnProps & {
  moreText?: string
  dropdownDefaultShowNum?: number
  dropdownMaxNum?: number
}
