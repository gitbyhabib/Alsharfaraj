import { defineStore } from 'pinia'
import api from '@/plugins/axios' // your axios instance
export interface User {
  id: number
  name: string
  email: string
  role: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(email: string, password: string) {
      const response = await api.post('/login', { email, password })
      const token = response.data.data.token
      localStorage.setItem('token', token)
      this.token = token

      // fetch user after login
      const res = await api.get('/user')
      this.user = res.data
      localStorage.setItem('user', JSON.stringify(this.user))
    },

 // authStore.ts
async logout() {
  try {
    await api.get('/logout')
  } catch (err) {
    console.error(err)
  } finally {
    this.user = null
    this.token = null
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization'] // remove axios token
  }
},

  

    initialize() {
      // Synchronously load user from localStorage to avoid redirect
      const user = localStorage.getItem('user')
      if (user) this.user = JSON.parse(user)
      this.token = localStorage.getItem('token')
    },
  },
})