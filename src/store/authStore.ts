import { defineStore } from 'pinia'
import api from '@/plugins/axios'

interface User {
  id: number
  name: string
  email: string
  role: 'super_admin' | 'admin' | 'employee'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(email: string, password: string) {
  try {
    const response = await api.post('/login', { email, password })

    // ✅ Extract token from the correct key
    const token = response.data.data.token
    this.token = token
    localStorage.setItem('token', token)

    // ✅ Attach token to axios for all future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // ✅ Fetch authenticated user
    const userResponse = await api.get('/user')
    this.user = userResponse.data


    console.log('Login successful:', userResponse.data.role)
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
},

    async fetchUser() {
      if (!this.token) return
      try {
        const response = await api.get('/user', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = response.data
      } catch {
        this.logout()
      }
    },

    async logout() {
      try {
        await api.get('/auth/logout', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
      } catch {}
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    },
  },
})
