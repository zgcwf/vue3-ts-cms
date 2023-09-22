import { createApp } from 'vue'

import './assets/css/index.less'

import App from './App.vue'
// 引入element-plus样式
import 'element-plus/dist/index.css'

import router from './router'
import pinia from './stores'
import registerIcons from './global/register-icons'

const app = createApp(App)

// 导入图标
app.use(registerIcons)
app.use(pinia)
app.use(router)
app.mount('#app')
