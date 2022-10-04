import { DownOutlined } from '@ant-design/icons-vue'
import { btnProps } from './props'
import type { NsButtonProps } from './types'
export default defineComponent({
  name: 'GridBtns',
  props: btnProps,
  setup(props) {
    return () => {
      const { btnList } = props
      const renderDropdown = ({ children, text, ...rest }: NsButtonProps) => {
        const overlay = {
          overlay: () =>
            children.map((item, index) => {
              return <a-menu-item key={index}>{item.text}</a-menu-item>
            })
        }
        return (
          <a-dropdown v-slots={overlay}>
            <a-button {...rest}>
              {text}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        )
      }
      const renderBtn = ({ text, icon, ...rest }: NsButtonProps) => (
        <a-button
          {...rest}
          v-slots={{
            icon: () => <i class={icon}></i>
          }}
        >
          {text}
        </a-button>
      )
      return btnList.map((item) => {
        return item.children.length > 0 ? renderDropdown(item) : renderBtn(item)
      })
    }
  }
})
