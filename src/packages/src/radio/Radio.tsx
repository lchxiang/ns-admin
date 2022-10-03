import { type ExtractPropTypes, defineComponent } from 'vue'
import { Radio, RadioButton, RadioGroup } from 'ant-design-vue'
import { vueTypes } from '@/utils/vueTypes'
import { useDict } from '../hooks/useDict'
import { dictProps } from '../dict-props'
import type { RadioGroupProps } from 'ant-design-vue'
import 'ant-design-vue/es/radio/style/index'
const radioProps = {
  ...dictProps,
  type: vueTypes.string.def('default')
}

type Iprops = ExtractPropTypes<typeof dictProps>
export type NsRadioProps = Iprops & RadioGroupProps

export default defineComponent({
  name: 'NsRadio',
  props: radioProps,
  setup(props, { attrs }) {
    const { formatterDicData } = useDict(props)
    return () => (
      <RadioGroup {...attrs}>
        {formatterDicData.value.map((item: Recordable) => {
          return props.type === 'button' ? (
            <RadioButton value={item[props.valueKey]}>
              {item[props.labelKey]}
            </RadioButton>
          ) : (
            <Radio value={item[props.valueKey]}>{item[props.labelKey]}</Radio>
          )
        })}
      </RadioGroup>
    )
  }
})
