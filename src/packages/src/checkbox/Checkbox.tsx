import { defineComponent } from 'vue'
import { Checkbox, CheckboxGroup, type CheckboxProps } from 'ant-design-vue'

import { useDict } from '../hooks/useDict'
import { type DictProps, dictProps } from '../dict-props'
import 'ant-design-vue/es/radio/style/index'

export type NsCheckboxProps = DictProps & CheckboxProps

export default defineComponent({
  name: 'NsCheckbox',
  props: dictProps,
  setup(props, { attrs }) {
    const { formatterDicData } = $(useDict(props))
    return () => (
      <CheckboxGroup {...attrs}>
        {formatterDicData.map((item: Recordable) => {
          return (
            <Checkbox value={item[props.valueKey]}>
              {item[props.labelKey]}
            </Checkbox>
          )
        })}
      </CheckboxGroup>
    )
  }
})
