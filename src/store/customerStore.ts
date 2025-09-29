// src/store/customerStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export interface Customer {
  id?: number
  name: string
  passport_no: string
  phone_no: string
  lead_id?: number
  address?: string
  passport_expired_date?: string // in YYYY/MM/DD format
}

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [] as Customer[],
    errors: {} as Record<string, string[]>,
  }),
  actions: {
    // Fetch all customers
    async fetchCustomers() {
      try {
        const response = await axios.get('http://localhost:8000/api/customer/view')
        this.customers = response.data.data || response.data
      } catch (error: any) {
        console.error('Error fetching customers:', error)
      }
    },

    // Register a new customer
    async addCustomer(customer: Customer) {
      try {
        await axios.post('http://localhost:8000/api/customer/register', customer)
      } catch (error: any) {
        this.errors = error.response?.data?.errors || {}
        throw error
      }
    },

    // Update customer
    async updateCustomer(customer: Customer) {
      try {
        await axios.post(`http://localhost:8000/api/customer/update/${customer.id}`, customer)
      } catch (error: any) {
        this.errors = error.response?.data?.errors || {}
        throw error
      }
    },

    // Delete customer
    async removeCustomer(id: number) {
      try {
        await axios.delete(`http://localhost:8000/api/customer/${id}`)
        this.customers = this.customers.filter(c => c.id !== id)
      } catch (error: any) {
        console.error('Error deleting customer:', error)
      }
    },
  },
})
