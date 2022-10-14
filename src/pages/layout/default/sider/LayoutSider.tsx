/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-12 16:03:06
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-13 13:57:55
 */
import { useUserStore } from '@/store/user'
import Menu from './../../components/menu'
import Logo from './../sysLogo/index'
export default defineComponent({
  name: 'LayoutSider',
  setup() {
    const collapsed = $ref(false)
    const { userMenus } = useUserStore()
    return () => {
      return (
        <a-layout-sider
          v-model={[collapsed, 'collapsed']}
          collapsible
          theme="dark"
        >
          <Logo></Logo>
          <Menu menuList={userMenus}></Menu>
        </a-layout-sider>
      )
    }
  }
})
