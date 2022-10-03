import { defineComponent } from 'vue'
import { Select } from 'ant-design-vue'
import { useDict } from '../hooks/useDict'
import { type DictProps, dictProps } from '../dict-props'
import type { SelectProps } from 'ant-design-vue'
import 'ant-design-vue/es/select/style/index'
export type NsCheckboxProps = DictProps & SelectProps
export default defineComponent({
  name: 'NsSelect',
  props: dictProps,
  setup(props, { attrs }) {
    const fieldNames = $computed(() => {
      return {
        label: unref(props.labelKey),
        value: unref(props.valueKey)
      }
    })
    const { formatterDicData } = $(useDict(props))
    return () => (
      <Select
        {...attrs}
        options={formatterDicData}
        field-names={fieldNames}
      ></Select>
    )
  }
})
