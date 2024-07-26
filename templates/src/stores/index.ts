/*
 * @Author: liuyuhao
 * @Date: 2024-05-21 16:08:59
 * @LastEditors: liuyuhao
 * @LastEditTime: 2024-05-21 16:09:00
 * @Description: file description
 */
import { createPinia } from 'pinia'
export { useUserStore } from './modules/user'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)

export default store
