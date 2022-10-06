import { createApp } from 'vue'
import Ns from '@/packages/index'
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
