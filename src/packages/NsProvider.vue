<script lang="ts">
  import { vueTypes } from '@/utils/vueTypes'
  export default defineComponent({
    name: 'AppProvider',
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
      const { dateFormat, dateValueFormat, timeFormat, timeValueFormat, valueKey, labelKey } =
        toRefs(props)
      provide('$NS', {
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
