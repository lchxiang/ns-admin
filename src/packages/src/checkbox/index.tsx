import { defineComponent } from 'vue'
import { Checkbox, CheckboxGroup } from 'ant-design-vue'

import { useDict } from '../hooks/useDict'
import { dictProps } from '../dic-props'
import 'ant-design-vue/es/radio/style/index'
export default defineComponent({
  name: 'NsCheckbox',
  props: dictProps,
  setup(props, { attrs }) {
    const { formatterDicData } = useDict(props)
    return () => (
      <CheckboxGroup {...attrs}>
        {formatterDicData.value.map((item: Recordable) => {
          return <Checkbox value={item[props.valueKey]}>{item[props.labelKey]}</Checkbox>
        })}
      </CheckboxGroup>
    )
  }
})
