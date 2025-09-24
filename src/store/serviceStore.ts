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

const baseUrl = 'http://localhost:8000/api'

export const useServiceStore = defineStore('services', {
  state: () => ({
    services: [] as Service[],
  }),

  actions: {
    async fetchServices() {
      try {
        const res = await fetch(`${baseUrl}/service/view`)
        const data = await res.json()
        // Check if data.data exists
        this.services = Array.isArray(data.data) ? data.data : []
      } catch (err) {
        console.error('Error fetching services:', err)
      }
    },

    async addService(service: Service) {
      try {
        const res = await fetch(`${baseUrl}/service/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(service),
        })
        const data = await res.json()
        if (data.status && data.data) {
          this.services.push(data.data) // push the newly created service
        }
      } catch (err) {
        console.error('Error adding service:', err)
      }
    },

    async updateService(service: Service) {
      try {
        const res = await fetch(`${baseUrl}/service/update/${service.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(service),
        })
        const data = await res.json()
        if (data.status && data.data) {
          const index = this.services.findIndex(s => s.id === service.id)
          if (index !== -1) this.services[index] = data.data
        }
      } catch (err) {
        console.error('Error updating service:', err)
      }
    },

    async removeService(id: number) {
      try {
        const res = await fetch(`${baseUrl}/service/delete/${id}`, {
          method: 'DELETE',
        })
        const data = await res.json()
        if (data.status) {
          this.services = this.services.filter(s => s.id !== id)
        }
      } catch (err) {
        console.error('Error deleting service:', err)
      }
    },
  },
})
