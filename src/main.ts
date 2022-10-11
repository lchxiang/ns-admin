/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-30 09:41:21
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-10 10:48:26
 */
import { createApp } from 'vue'
import Ns from '@/packages/index'
import 'virtual:svg-icons-register'
import '@/packages/index.less'
import { useVxeTable } from '@/plugins/vxe-table'
import App from './App.vue'
import '@/styles/theme-var.less'
import 'uno.css'
import { setupRouter } from './router'
import { setupStore } from './store'
const app = createApp(App)
setupRouter(app)
setupStore(app)
useVxeTable(app)
app.use(Ns)
app.mount('#app')
