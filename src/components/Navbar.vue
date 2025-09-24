<!-- components/Navbar.vue -->
<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between">
    <div class="flex space-x-4">
      <router-link to="/dashboard" class="hover:text-gray-300">Dashboard</router-link>
      <router-link to="/customers" class="hover:text-gray-300">Customers</router-link>
      <router-link to="/services" class="hover:text-gray-300">Services</router-link>
      <!-- Only show Employees link for admin/superadmin -->
      <router-link 
        v-if="auth.user?.role === 'admin' || auth.user?.role === 'super_admin'" 
        to="/employees" 
        class="hover:text-gray-300">
        Employees
      </router-link>
    </div>
    <button @click="handleLogout" class="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
      Logout
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await auth.logout() // ✅ wait for backend logout and clear state
  router.replace('/login') // ✅ use replace so back button cannot go back
}
</script>
