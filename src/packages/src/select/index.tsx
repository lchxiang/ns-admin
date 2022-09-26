import { defineComponent } from 'vue'
import { Select } from 'ant-design-vue'

import { useDict } from '../hooks/useDict'
import { dictProps } from '../dic-props'
import 'ant-design-vue/es/select/style/index'
export default defineComponent({
  name: 'NsCheckbox',
  props: dictProps,
  setup(props, { attrs }) {
    const fieldNames = computed(() => {
      return {
        label: unref(props.labelKey),
        value: unref(props.valueKey)
      }
    })
    const { formatterDicData } = useDict(props)
    return () => (
      <Select {...attrs} options={formatterDicData.value} field-names={fieldNames.value}></Select>
    )
  }
})
