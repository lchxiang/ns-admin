/*
 * @description:
 * @Author: liwg
 * @Date: 2022-07-02 08:37:53
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-10 10:10:10
 */
import NsCheckbox from './src/checkbox/index'
import NsSelect from './src/select/index'
import NsRadio from './src/radio/index'
import NsForm from './src/form/index'
import NsTable from './src/table/index'
import NsIcon from './src/icon/index'

const componentList = [NsCheckbox, NsSelect, NsRadio, NsForm, NsTable, NsIcon]
export default {
  install(app) {
    componentList.forEach((component) => {
      app.component(component.name || component.__name, component)
    })
  }
}
