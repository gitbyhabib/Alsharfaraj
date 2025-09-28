<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6">Admin Login</h2>

      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full mb-4 px-3 py-2 border rounded"
          required
        />

        <!-- Password with eye toggle -->
        <div class="relative mb-4">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="w-full px-3 py-2 border rounded pr-10"
            required
          />
          <button
            type="button"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            @click="togglePassword"
          >
            <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
          </button>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <!-- Error message -->
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const email = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (auth.user) {
    router.replace({ name: 'Dashboard' })
  }
})

function togglePassword() {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    router.replace({ name: 'Dashboard' })
  } catch (err: any) {
    if (err.response?.status === 401) {
      error.value = 'Invalid email or password'
    } else {
      error.value = err.message || 'Login failed'
    }
  }
}
</script>
