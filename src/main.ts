import { createApp } from 'vue'

import 'vue-global-api'
import './style.css'
import App from './App.vue'
import '@/styles/theme-var.less'
import '@/styles/_var.less'
import 'uno.css'
import { setupRouter } from './router'
import { setupStore } from './store'
const app = createApp(App)
setupRouter(app)
setupStore(app)
app.mount('#app')
