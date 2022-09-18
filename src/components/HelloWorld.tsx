import { defineComponent, PropType } from 'vue'

export const HelloWorld = defineComponent({
  props: {
    text: {
      type: String as PropType<string>,
      default: 'HelloWorld'
    },
    name: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <>
        <a-button type="primary">试试</a-button>
        <div>{props.text}</div>
        <div>{props.name}</div>
      </>
    )
  }
})
