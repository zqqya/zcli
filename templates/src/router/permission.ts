import router from '@/router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { UserInfo } from '@/stores/modules/user'
import _ from 'lodash'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    NProgress.start()
    let token = 'test'
    let userInfo: UserInfo = {} as UserInfo
    if (sessionStorage.getItem('user') !== null) {
      userInfo = JSON.parse(sessionStorage.getItem('user')!)?.userInfo
      token = userInfo?.token
    }
    if (token) {
      next()
    } else {
      // 如果没有 token
      if (whiteList.includes(to.path)) {
        // 如果在免登录的白名单中，则直接进入
        next()
      } else {
        // 其他没有访问权限的页面将被重定向到登录页面
        next('/login')
      }
    }
  }
)
router.afterEach(() => {
  NProgress.done()
})
