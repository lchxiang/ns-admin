/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-09 08:58:16
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-10 10:14:08
 */
// GlobalComponents for Volar
import type NsCheckbox from './src/checkbox/index'
import type NsSelect from './src/select/index'
import type NsRadio from './src/radio/index'
import type NsForm from './src/form/index'
import type NsTable from './src/table/index'
import type NsIcon from './src/icon/index'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NsCheckbox: typeof NsCheckbox
    NsSelect: typeof NsSelect
    NsRadio: typeof NsRadio
    NsForm: typeof NsForm
    NsTable: typeof NsTable
    NsIcon: typeof NsIcon
  }
}
