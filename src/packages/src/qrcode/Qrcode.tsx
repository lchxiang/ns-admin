export default defineComponent({
  name: 'NsQrcode',
  setup() {
    const tagName = $ref('div')
    return () => {
      return <component is={tagName}>看看</component>
    }
  }
})
