/*
 * @Author: liuyuhao
 * @Date: 2024-05-21 15:58:04
 * @LastEditors: liuyuhao
 * @LastEditTime: 2024-05-22 18:05:45
 * @Description: file description
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Login, Logout, type ILoginParam } from '@/api/login'

// 0-管理员、1-普通用户
export enum UserType {
  Admin,
  User
}

export type UserInfo = {
  id: number
  userName: string
  token: string
  userType: number
}

const USER_STORE_KEY = 'user'

export const useUserStore = defineStore(
  USER_STORE_KEY,
  () => {
    const userInfo = ref<Nullable<UserInfo>>(null)
    const token = computed(() => userInfo.value?.token)

    const isAdmin = computed(() => userInfo.value?.userType === UserType.Admin)

    async function setLogin(param: ILoginParam) {
      try {
        const { data, status } = await Login(param)
        if (status === 200 && data?.token) {
          userInfo.value = data
          return true
        }
        return false
      } catch (error) {
        console.error('setLogin ERROR:', error)
      }
    }

    /** @description 登出 */
    async function setLogout() {
      try {
        const { status } = await Logout()
        userInfo.value = null
        sessionStorage.removeItem(USER_STORE_KEY)
        return status === 200
      } catch (error) {
        sessionStorage.removeItem(USER_STORE_KEY)
        console.error('setLogout ERROR:', error)
      }
    }

    /** @description 登录状态检查, 更新用户信息 */
    const sessionCheck: () => boolean = () => {
      if (userInfo.value?.token) {
        return true
      }
      try {
        const str = sessionStorage.getItem(USER_STORE_KEY)
        if (str) {
          userInfo.value = JSON.parse(str)
          return !!userInfo.value?.token
        }
        return false
      } catch (_error) {
        return false
      }
    }

    return { USER_STORE_KEY, userInfo, token, isAdmin, setLogin, sessionCheck, setLogout }
  },
  { persist: { storage: sessionStorage } }
)
