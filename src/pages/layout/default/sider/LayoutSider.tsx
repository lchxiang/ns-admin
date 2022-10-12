import { useUserStore } from '@/store/user'
import Menu from './../../components/menu'

export default defineComponent({
  name: 'LayoutSider',
  setup() {
    const collapsed = $ref(false)
    const { userMenus } = useUserStore()
    return () => {
      return (
        <a-layout-sider v-model={[collapsed, 'collapsed']} collapsible>
          <div class="logo" />
          <Menu menuList={userMenus}></Menu>
        </a-layout-sider>
      )
    }
  }
})
