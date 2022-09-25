<!--
 * @description: 
 * @Author: liwg
 * @Date: 2022-09-19 16:08:43
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-19 16:28:44
-->
<script lang="ts">
  import { createAppProviderContext } from '@/hooks/useAppContext'
  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    setup(_props, { slots }) {
      const isMobile = ref(false)
      useResizeObserver(document.body, (entries) => {
        const entry = entries[0]
        const { width } = entry.contentRect
        isMobile.value = width < 992
      })
      createAppProviderContext({ isMobile })
      return () => slots.default?.()
    }
  })
</script>
