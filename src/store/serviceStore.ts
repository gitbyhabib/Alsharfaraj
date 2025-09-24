// store/serviceStore.ts
import { defineStore } from 'pinia'

export interface Service {
  id: number
  details: string
  charge_amount: number
  service_assign_to: string
  customer_id: number
  service_type_id: number
  delivery_date: string
  receive_date: string
}

const baseUrl = 'http://localhost:8000/api' // replace with your actual baseUrl

export const useServiceStore = defineStore('services', {
  state: () => ({
    services: [] as Service[],
  }),

  actions: {
    async fetchServices() {
      const res = await fetch(`${baseUrl}/service/view`)
      const data = await res.json()
      this.services = data
    },

    async addService(service: Service) {
      const res = await fetch(`${baseUrl}/service/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      })
      const data = await res.json()
      this.services.push(data)
    },

    async updateService(service: Service) {
      const res = await fetch(`${baseUrl}/service/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      })
      const data = await res.json()
      const index = this.services.findIndex(s => s.id === data.id)
      if (index !== -1) this.services[index] = data
    },

    async removeService(id: number) {
      await fetch(`${baseUrl}/service/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      this.services = this.services.filter(s => s.id !== id)
    },
  },
})
