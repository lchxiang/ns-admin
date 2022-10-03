/*
 * @Author: liwg
 * @Date: 2022-03-19 20:13:09
 * @LastEditors: liwg
 * @LastEditTime: 2022-07-03 20:52:53
 */
import { vueTypes } from '@/utils/vueTypes'
import type { ExtractPropTypes, PropType, VNode } from 'vue'
import type { NamePath, RuleObject } from 'ant-design-vue/lib/form/interface'
import type { ButtonProps, ColProps } from 'ant-design-vue'
export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur']
}

export interface NsFormBtn extends ButtonProps {
  text: string
  show: boolean
}

export type NsForm = ExtractPropTypes<typeof formProps>

export interface NsFormItem {
  component?: ComponentType
  label?: string
  prop?: string
  subLabel?: string
  labelWidth?: string | number
  required?: boolean | ((formModel: Recordable) => boolean)
  disabled?: boolean | ((formModel: Recordable) => boolean)
  rules?: Rule[] | ((formModel: Recordable) => Rule[])
  placeholder?: string | string[]
  // 是否显示 v-show控制
  show?: boolean | ((formModel: Recordable) => boolean)
  // 是否显示 v-if控制
  ifShow?: boolean | ((formModel: Recordable) => boolean)
  //只渲染到普通表单
  isNormal?: boolean
  //只渲染到表格查询
  isSearch?: boolean
  //默认值
  defaultValue?: any
  //有插槽时 插槽内控件元素
  form?: Recordable
  //表单控件插槽 包含在form-item内
  slot?: string
  //表控件外插槽 不包含form-item
  colSlot?: string
  contentSlot?: ((formModel: Recordable) => any) | VNode | VNode[] | string
  //Select Checkbox radio 表单控件内数据请求地址
  url?: string
  //设置url后 返回数据的地址path 例如 data.list
  resultPath?: string
  //Select Checkbox radio组件 手动设置表单控件内数据请求
  proxy?: () => Promise<any>
  onChange?: (e: Event) => void
  // 表单控件外后缀
  suffix?: ((formModel: Recordable) => any) | VNode | VNode[] | string
  tips?: string | string[]
  tipsPlacement?: 'label' | 'input'
  tipsProps?: Partial<TipsProps>
  [key: string]: any
}

export interface FormActionType {
  setProps: (formProps: Partial<NsForm>) => Promise<void>
  submit: () => Promise<void>
  clearValidate: (name?: string | string[]) => Promise<void>
  validateFields: (nameList?: NamePath[]) => Promise<any>
  validate: (nameList?: NamePath[]) => Promise<any>
  resetFormValue: Fn
  setFormValue: <T>(values: T) => Promise<void>
  getFormValue: () => Recordable
  updateFormList: (
    data: Partial<NsFormItem> | Partial<NsFormItem>[]
  ) => Promise<void>
  resetFormList: (
    data: Partial<NsFormItem> | Partial<NsFormItem>[]
  ) => Promise<void>
  removeFormListByField: (field: string | string[]) => Promise<void>
  appendFormListByField: (
    formItem: NsFormItem,
    prefixField: string | undefined,
    first?: boolean | undefined
  ) => Promise<void>
  mapFormItem: (callBack: Fn) => void
}

export interface TipsProps {
  maxWidth: string
  showIndex: boolean
  text: any
  color: string
  fontSize: string
  icon: string
  absolute: boolean
  position: any
}

export const formProps = {
  modelValue: vueTypes.object,
  type: vueTypes.oneOf(['search', 'normal', undefined] as const).def('normal'),
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
  layout: vueTypes
    .oneOf(['horizontal', 'vertical', 'inline'] as const)
    .def('horizontal'),
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

export type ComponentType =
  | 'Input'
  | 'Textarea'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'Select'
  | 'Radio'
  | 'TreeSelect'
  | 'Checkbox'
  | 'AutoComplete'
  | 'Cascader'
  | 'DatePicker'
  | 'MonthPicker'
  | 'RangePicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'TimeRangePicker'
  | 'Switch'
  | 'Upload'
  | 'Slider'
  | 'Rate'
  | 'Divider'
