import { DownOutlined } from '@ant-design/icons-vue'
import cloneDeep from 'lodash-es/cloneDeep'
import { isBoolean, isFunction, isString } from '@/utils/is'
import { useTableProviderContext } from './hooks/useTableContext'
import { btnProps } from './props'
import type { NsBtnProps } from './types'
export default defineComponent({
  name: 'GridBtns',
  props: btnProps,
  setup(props) {
    const { permit } = $(useTableProviderContext())

    const getItemIsShow = ({ code, show, isPermit }: NsBtnProps) => {
      let isShow = true
      if (permit && isFunction(permit) && isPermit !== false) {
        isShow = permit()
      }
      if (isFunction(show)) {
        isShow = show({ code })
      } else if (isBoolean(show)) {
        isShow = show
      } else if (isString(show)) {
        isShow = eval(show)
      }
      return isShow
    }

    //菜单权限、数据权限过滤
    const realBtnList = $computed(() => {
      const { btnList } = props
      const copyBtnList = cloneDeep(btnList)
      return copyBtnList.reduce((list, item) => {
        const children = item.children || []
        let isShow = true
        if (children && children.length > 0) {
          item.children = children.filter((citem) => getItemIsShow(citem))
          if (item.children.length === 0) {
            isShow = false
          }
        } else {
          isShow = getItemIsShow(item)
        }
        if (isShow) {
          list.push(item)
        }
        return list
      }, [] as NsBtnProps[])
    })

    const renderDropdown = ({ children = [], text, ...rest }: NsBtnProps) => {
      const overlay = {
        overlay: () => (
          <a-menu>
            {children.map(({ text, code, onClick }, index) => (
              <a-menu-item
                key={index}
                onClick={() => {
                  onClick?.({ code })
                }}
              >
                {text}
              </a-menu-item>
            ))}
          </a-menu>
        )
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

    const renderBtn = ({ text, icon, ...rest }: NsBtnProps) => (
      <a-button
        type="primary"
        {...rest}
        v-slots={{
          icon: () => <i class={icon}></i>
        }}
      >
        {text}
      </a-button>
    )

    return () => {
      return realBtnList.map((item) => {
        return item.children && item.children.length > 0
          ? renderDropdown(item)
          : renderBtn(item)
      })
    }
  }
})
