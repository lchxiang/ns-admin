// GlobalComponents for Volar
import type NsCheckbox from './src/checkbox/index'
import type NsSelect from './src/select/index'
import type NsRadio from './src/radio/index'
import type NsForm from './src/form/index'
import type NsTable from './src/table/index'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NsCheckbox: typeof NsCheckbox
    NsSelect: typeof NsSelect
    NsRadio: typeof NsRadio
    NsForm: typeof NsForm
    NsTable: typeof NsTable
  }
}
