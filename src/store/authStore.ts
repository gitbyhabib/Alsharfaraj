import { defineStore } from 'pinia'
import api from '../plugins/axios'

interface User {
  id: number
  name: string
  email: string
  role: 'Super Admin' | 'Admin' | 'Employee'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(email: string, password: string) {
      const response = await api.post('/login', { email, password })
      const token = response.data.data.token

      // Persist token
      localStorage.setItem('token', token)
      this.token = token
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Fetch user after login
      const res = await api.get('/user')
      this.user = res.data
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    async logout() {
      try {
        await api.get('/logout')
      } catch (err) {
        console.error(err)
      } finally {
        this.user = null
        this.token = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete api.defaults.headers.common['Authorization']
      }
    },

    // Call this on page load to restore user from token
    async initialize() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try {
          const res = await api.get('/user')
          this.user = res.data
          localStorage.setItem('user', JSON.stringify(this.user))
        } catch (err) {
          console.error('Failed to fetch user on init', err)
          this.logout()
        }
      }
    }
  },
})
