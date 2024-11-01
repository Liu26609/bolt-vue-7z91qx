import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/dashboard/index.vue'),
          name: 'Dashboard',
          meta: { title: '仪表盘', icon: 'Odometer' }
        },
        {
          path: 'users',
          component: () => import('../views/users/index.vue'),
          name: 'Users',
          meta: { title: '用户管理', icon: 'User' }
        },
        {
          path: 'items',
          component: () => import('../views/items/index.vue'),
          name: 'Items',
          meta: { title: '道具管理', icon: 'Box' }
        }
      ]
    }
  ]
})

export default router