<script lang="ts">
import { vueTypes } from '@/utils/vueTypes'
import { createNsProviderContext } from './src/hooks/useNsContext'
export default defineComponent({
  name: 'NsProvider',
  inheritAttrs: false,
  props: {
    dateFormat: vueTypes.string.def('YYYY-MM-DD HH:mm:ss'),
    dateValueFormat: vueTypes.string.def('YYYY-MM-DD HH:mm:ss'),
    timeFormat: vueTypes.string.def('HH:mm:ss'),
    timeValueFormat: vueTypes.string.def('HH:mm:ss'),
    valueKey: vueTypes.string.def('id'),
    labelKey: vueTypes.string.def('name')
  },
  setup(props, { slots }) {
    const {
      dateFormat,
      dateValueFormat,
      timeFormat,
      timeValueFormat,
      valueKey,
      labelKey
    } = $$(props)
    createNsProviderContext({
      dateFormat,
      dateValueFormat,
      timeFormat,
      timeValueFormat,
      valueKey,
      labelKey
    })

    return () => slots.default?.()
  }
})
</script>
