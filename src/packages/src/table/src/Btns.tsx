import { DownOutlined } from '@ant-design/icons-vue'
import { isFunction } from 'xe-utils'
import { cloneDeep } from 'lodash-es'
import { isBoolean, isString } from '@/utils/is'
import { useTableProviderContext } from './hooks/useTableContext'
import { btnProps } from './props'
import type { NsButtonProps } from './types'
export default defineComponent({
  name: 'GridBtns',
  props: btnProps,
  setup(props) {
    const { permit } = $(useTableProviderContext())

    const getItemIsShow = ({ code, show, isPermit }: NsButtonProps) => {
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
      }, [] as NsButtonProps[])
    })

    const renderDropdown = ({
      children = [],
      text,
      ...rest
    }: NsButtonProps) => {
      const overlay = {
        overlay: () => (
          <a-menu>
            {children.map((item, index) => (
              <a-menu-item key={index}>{item.text}</a-menu-item>
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

    return () => {
      return realBtnList.map((item) => {
        return item.children && item.children.length > 0
          ? renderDropdown(item)
          : renderBtn(item)
      })
    }
  }
})
