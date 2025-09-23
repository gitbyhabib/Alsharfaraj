import { defineStore } from 'pinia'

interface Customer {
  id: number
  name: string
  passport: string
  phone: string
  email: string
  address?: string
}

export const useCustomerStore = defineStore('customers', {
  state: () => ({
    customers: [] as Customer[]
  }),
  actions: {
    addCustomer(c: Customer) {
      if (this.customers.some(cust => cust.passport === c.passport)) {
        throw new Error('Passport already exists')
      }
      this.customers.push(c)
    },
    removeCustomer(id: number) {
      this.customers = this.customers.filter(c => c.id !== id)
    },
  }
})
