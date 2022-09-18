import type { RouteRecordRaw } from 'vue-router'
export const constantRouter: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue')
  }
]
