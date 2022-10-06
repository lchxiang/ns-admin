import toFormatString from 'xe-utils/toFormatString'
import get from 'xe-utils/get'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Colgroup,
  Column,
  Filter,
  Grid,
  Icon,
  Input,
  Optgroup,
  Option,
  Pager,
  Radio,
  RadioGroup,
  Select,
  Table,
  Toolbar,
  Tooltip,
  VXETable
} from 'vxe-table'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'
import type { App } from 'vue'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => toFormatString(get(zhCN, key), args)
})

export function useVxeTable(app: App) {
  app
    .use(Icon)
    .use(Input)
    .use(Column)
    .use(Colgroup)
    .use(Filter)
    .use(Select)
    .use(Option)
    .use(Optgroup)
    .use(Grid)
    .use(Tooltip)
    .use(Toolbar)
    .use(Pager)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Radio)
    .use(RadioGroup)
    .use(Button)
    .use(Table)
}
