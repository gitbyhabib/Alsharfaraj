import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = 'http://localhost:8000/api'  // <- your API base URL

interface Customer {
  id?: number
  name: string
  passport: string
  phone: string
  email: string
  address?: string
}

export const useCustomerStore = defineStore('customers', {
  state: () => ({
    customers: [] as Customer[],
    loading: false,
    errors: {} as Record<string, string[]>
  }),
  actions: {
    async fetchCustomers() {
      this.loading = true
      try {
        const res = await axios.get(`${baseUrl}/customer/list`)
        this.customers = res.data
      } catch (err) {
        console.error('Error fetching customers:', err)
      } finally {
        this.loading = false
      }
    },
    async addCustomer(c: Customer) {
      this.loading = true
      this.errors = {}
      try {
        const res = await axios.post(`${baseUrl}/customer/register`, c)
        this.customers.push(res.data)
      } catch (err: any) {
        if (err.response?.status === 422) {
          this.errors = err.response.data.errors || {}
        } else {
          console.error('Error adding customer:', err)
        }
      } finally {
        this.loading = false
      }
    }
  }
})
