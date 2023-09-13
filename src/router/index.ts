import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/error/index.vue')
    }
  ]
})

export default router
