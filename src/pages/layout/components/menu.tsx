/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-12 11:52:40
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-13 11:19:16
 */
import SettingOutlined from '@ant-design/icons-vue/SettingOutlined'
import { findTree } from 'xe-utils'
import { useUserStore } from '@/store/user'
import type { MenuProps } from 'ant-design-vue'
import type { MenuItem } from '@/router/types'

export const menuProps = {
  menuList: {
    type: Array as PropType<MenuItem[]>,
    default: () => []
  }
}

export default defineComponent({
  name: 'LayoutMenu',
  props: menuProps,
  setup(props) {
    const { userMenus } = useUserStore()
    const route = useRoute()
    const router = useRouter()
    let openKeys = $ref<string[]>()
    const activeRouteName = $ref<string[]>([route.name as string])
    const goPage: MenuProps['onClick'] = ({ key }) => {
      router.push({ name: key as string })
    }
    //初始打开的按钮
    const { nodes } = findTree(userMenus, (item) => {
      return item.routeName === route.name
    })
    if (nodes && nodes.length > 0) {
      openKeys = nodes.map((item) => item.name)
    }

    const renderMenuItem = (list: MenuItem[]) => {
      return list.map(({ children = [], name, routeName }) =>
        children.length > 0 ? (
          <a-sub-menu
            key={name}
            v-slots={{ icon: () => <SettingOutlined />, title: () => name }}
          >
            {renderMenuItem(children)}
          </a-sub-menu>
        ) : (
          <a-menu-item key={routeName}>{name}</a-menu-item>
        )
      )
    }

    return () => {
      return (
        <a-menu
          v-model:selectedKeys={activeRouteName}
          v-model:openKeys={openKeys}
          theme="dark"
          mode="inline"
          onClick={(e) => {
            goPage(e)
          }}
        >
          {renderMenuItem(props.menuList)}
        </a-menu>
      )
    }
  }
})
