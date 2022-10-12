import SettingOutlined from '@ant-design/icons-vue/SettingOutlined'
import type { MenuItem } from '@/router/types'
import type { RouteRecordName } from 'vue-router'

export const menuProps = {
  activeRouteName: {
    type: Array as PropType<RouteRecordName[]>,
    default: ''
  },
  menuList: {
    type: Array as PropType<MenuItem[]>,
    default: () => []
  }
}

export default defineComponent({
  name: 'LayoutMenu',
  props: menuProps,
  setup(props) {
    const renderMenuItem = (list: MenuItem[]) => {
      return list.map(({ children = [], name, routeName }, index) =>
        children.length > 0 ? (
          <a-sub-menu
            key={name + index}
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
          v-model={[props.activeRouteName, 'selectedKeys']}
          theme="dark"
          mode="inline"
        >
          {renderMenuItem(props.menuList)}
        </a-menu>
      )
    }
  }
})
