import { defineComponent } from 'vue'
import { Radio, RadioGroup, RadioButton } from 'ant-design-vue'

import { useDict } from '../hooks/useDict'
import { dictProps } from '../dic-props'
import 'ant-design-vue/es/radio/style/index'
import { vueTypes } from '@/utils/vueTypes'

export default defineComponent({
  name: 'NsRadio',
  props: {
    ...dictProps,
    type: vueTypes.string.def('default')
  },
  setup(props, { attrs }) {
    const { formatterDicData } = useDict(props)
    return () => (
      <RadioGroup {...attrs}>
        {formatterDicData.value.map((item: Recordable) => {
          return props.type === 'button' ? (
            <RadioButton value={item[props.valueKey]}>{item[props.labelKey]}</RadioButton>
          ) : (
            <Radio value={item[props.valueKey]}>{item[props.labelKey]}</Radio>
          )
        })}
      </RadioGroup>
    )
  }
})
