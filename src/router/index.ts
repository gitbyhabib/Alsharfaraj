// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Customers from '../views/Customers.vue'
import Employees from '../views/Employees.vue'
import Services from '../views/Services.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '../store/authStore'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/customers', name: 'Customers', component: Customers, meta: { requiresAuth: true } },
  { path: '/employees', name: 'Employees', component: Employees, meta: { requiresAuth: true, adminOnly: true } },
  { path: '/services', name: 'Services', component: Services, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.user) return next('/login')
  if (to.meta.adminOnly && auth.user?.role !== 'admin' && auth.user?.role !== 'super_admin') return next('/dashboard')
  next()
})

export default router
