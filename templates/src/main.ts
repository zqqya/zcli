/*
 * @Author: liuyuhao
 * @Date: 2024-05-14 10:29:27
 * @LastEditors: zhuqinqin
 * @LastEditTime: 2024-07-25 16:07:44
 * @Description: file description
 */
import { createApp } from 'vue'
import store from '@/stores'
import 'element-plus/dist/index.css'
import './styles/main.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 引入中文包
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import './router/permission'

import App from './App.vue'
import router from './router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
