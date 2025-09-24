import { defineStore } from 'pinia'
import axios from 'axios'

export interface Customer {
  id: number
  name: string
  passport_no: string
  phone_no: string
  lead_id: string
  address?: string
}

const baseUrl = 'http://localhost:8000/api'

export const useCustomerStore = defineStore('customers', {
  state: () => ({
    customers: [] as Customer[],
    errors: {} as Record<string, string[]>
  }),

  actions: {
    async fetchCustomers() {
      try {
        const res = await axios.get(`${baseUrl}/customer/view`)
        this.customers = res.data
      } catch (error) {
        console.error(error)
      }
    },

    async addCustomer(customer: Customer) {
      this.errors = {}
      try {
        const res = await axios.post(`${baseUrl}/customer/register`, customer)
        this.customers.push(res.data)
      } catch (error: any) {
        if (error.response?.status === 422) {
          this.errors = error.response.data.errors || {}
          throw error
        } else if (error.response?.data?.message) {
          this.errors = { general: [error.response.data.message] }
          throw error
        } else {
          console.error(error)
        }
      }
    },

    async updateCustomer(customer: Customer) {
      this.errors = {}
      try {
        const res = await axios.put(`${baseUrl}/customer/update`, customer)
        const index = this.customers.findIndex(c => c.id === res.data.id)
        if (index !== -1) this.customers[index] = res.data
      } catch (error: any) {
        if (error.response?.status === 422) {
          this.errors = error.response.data.errors || {}
          throw error
        } else if (error.response?.data?.message) {
          this.errors = { general: [error.response.data.message] }
          throw error
        } else {
          console.error(error)
        }
      }
    },

    async removeCustomer(id: number) {
      try {
        await axios.delete(`${baseUrl}/customer/delete`, { data: { id } })
        this.customers = this.customers.filter(c => c.id !== id)
      } catch (error) {
        console.error(error)
      }
    },
  },
})
