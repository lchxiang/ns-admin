/*
 * @description:
 * @Author: liwg
 * @Date: 2022-03-19 10:43:55
 * @LastEditors: liwg
 * @LastEditTime: 2022-07-12 09:40:24
 */
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  TimeRangePicker,
  TreeSelect
} from 'ant-design-vue'

import NsRadio from '../radio/index'
import NsCheckbox from '../checkbox'
import NsSelect from '../select'

import type { ComponentType } from './types'
import type { Component } from 'vue'

import 'ant-design-vue/es/input/style/index'
// import 'ant-design-vue/es/select/style/index'
// import 'ant-design-vue/es/checkbox/style/index'
// import 'ant-design-vue/es/radio/style/index'
import 'ant-design-vue/es/date-picker/style/index'
import 'ant-design-vue/es/input-number/style/index'
import 'ant-design-vue/es/switch/style/index'
import 'ant-design-vue/es/time-picker/style/index'
import 'ant-design-vue/es/tree-select/style/index'
import 'ant-design-vue/es/slider/style/index'
import 'ant-design-vue/es/rate/style/index'
import 'ant-design-vue/es/divider/style/index'
import 'ant-design-vue/es/row/style/index'
import 'ant-design-vue/es/col/style/index'
import 'ant-design-vue/es/form/style/index'
import 'ant-design-vue/es/cascader/style/index'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('Input', Input)
componentMap.set('InputGroup', Input.Group)
componentMap.set('InputPassword', Input.Password)
componentMap.set('InputSearch', Input.Search)
componentMap.set('InputTextArea', Input.TextArea)
componentMap.set('InputNumber', InputNumber)
componentMap.set('AutoComplete', AutoComplete)

componentMap.set('Checkbox', NsCheckbox)
componentMap.set('Radio', NsRadio)
componentMap.set('Select', NsSelect)

componentMap.set('TreeSelect', TreeSelect)
componentMap.set('Switch', Switch)

componentMap.set('Cascader', Cascader)
componentMap.set('Slider', Slider)
componentMap.set('Rate', Rate)

componentMap.set('DatePicker', DatePicker)
componentMap.set('MonthPicker', DatePicker.MonthPicker)
componentMap.set('RangePicker', DatePicker.RangePicker)
componentMap.set('WeekPicker', DatePicker.WeekPicker)
componentMap.set('TimePicker', TimePicker)
componentMap.set('TimeRangePicker', TimeRangePicker)

componentMap.set('Divider', Divider)

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  componentMap.delete(compName)
}
//自定义封装的组件 组件库本身自带的props 以及emits
export const otherComponents = {
  Select: {
    props: Object.keys(Select.props)
  },
  Radio: {
    props: Object.keys(Radio.Group.props)
  },
  Checkbox: {
    props: Object.keys(Checkbox.Group.props)
  }
}

export type InputGroupProps = InstanceType<typeof Input.Group>['$props']
export type InputPasswordProps = InstanceType<typeof Input.Password>['$props']
export type InputSearchProps = InstanceType<typeof Input.Search>['$props']
export type NsCheckboxProps = InstanceType<typeof NsCheckbox>['$props']
export type NsSelectProps = InstanceType<typeof NsSelect>['$props']
export type NsRadioProps = InstanceType<typeof NsRadio>['$props']

export type RangePickerProps = InstanceType<
  typeof DatePicker.RangePicker
>['$props']

export { componentMap }
