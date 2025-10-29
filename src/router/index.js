import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../utils/helpers'
import Landing from '../views/Landing.vue'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'
import Tickets from '../views/Tickets.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next('/dashboard')
      } else {
        next()
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/auth')
  } else {
    next()
  }
})

export default router
