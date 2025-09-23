<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6">Admin Login</h2>
      <form @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full mb-4 px-3 py-2 border rounded"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full mb-4 px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  error.value = '' // reset previous error
  try {
    await auth.login(email.value, password.value) // ✅ wait for API response
    router.push({ name: 'Dashboard' }) // ✅ use named route (safer)
  } catch (err: any) {
    error.value = err.message || 'Login failed'
  }
}
</script>
