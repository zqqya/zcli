import { createRouter, createWebHistory } from 'vue-router'
import ReLayout from '../components/ReLayout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/login',
      component: ReLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('@/views/test/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      meta: { title: '登录' },
      component: () => import('@/views/login')
    }
  ]
})

export default router
