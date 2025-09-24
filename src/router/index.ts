import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Customers from '../views/Customers.vue'
import Employees from '../views/Employees.vue'
import Services from '../views/Services.vue'
import ServiceTypes from '../views/ServiceType.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '../store/authStore'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/customers', name: 'Customers', component: Customers, meta: { requiresAuth: true } },
  { path: '/employees', name: 'Employees', component: Employees, meta: { requiresAuth: true, adminOnly: true } },
  { path: '/servicestype', name: 'ServiceTypes', component: ServiceTypes, meta: { requiresAuth: true, adminOnly: true } },
  { path: '/services', name: 'Services', component: Services, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Only allow user if both token AND user exist
  if (!authStore.user || !authStore.token) {
    if (to.meta.requiresAuth) {
      return next({ name: 'Login', replace: true })
    }
  }

  if (to.name === 'Login' && authStore.user) {
    return next({ name: 'Dashboard', replace: true })
  }

  if (to.meta.adminOnly && authStore.user?.role !== 'admin' && authStore.user?.role !== 'super_admin') {
    return next({ name: 'Dashboard', replace: true })
  }

  next()
})


export default router
