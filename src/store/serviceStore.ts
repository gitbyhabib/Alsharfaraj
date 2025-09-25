// src/store/serviceStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export interface Service {
  id?: number
  details: string
  charge_amount: number
  service_assign_to: number | string
  customer_id: number
  service_type_id: number | string
  delivery_date: string // in DD/MM/YYYY format
  receive_date: string  // in DD/MM/YYYY format
}

export const useServiceStore = defineStore('service', {
  state: () => ({
    services: [] as Service[],
    baseUrl: 'http://localhost:8000/api',
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    // List all services
    async fetchServices() {
      try {
        const res = await axios.get(`${this.baseUrl}/service/view`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.services = res.data.data || []
      } catch (err) {
        console.error('Error fetching services:', err)
      }
    },

    // Add new service
    async addService(service: Service) {
      try {
        console.log('Sending service:', service)
        const res = await axios.post(`${this.baseUrl}/service/create`, service, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        if (res.data.status && res.data.data) this.services.push(res.data.data)
        console.log('Response:', res.data)
      } catch (err) {
        console.error('Error adding service:', err)
      }
    },

    // Update existing service
    async updateService(service: Service) {
      try {
        const res = await axios.post(`${this.baseUrl}/service/update/${service.id}`, service, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        if (res.data.status && res.data.data) {
          const index = this.services.findIndex(s => s.id === service.id)
          if (index !== -1) this.services[index] = res.data.data
        }
      } catch (err) {
        console.error('Error updating service:', err)
      }
    },

    // Delete service
    async removeService(id: number) {
      try {
        const res = await axios.delete(`${this.baseUrl}/service/delete/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        if (res.data.status) this.services = this.services.filter(s => s.id !== id)
      } catch (err) {
        console.error('Error deleting service:', err)
      }
    }
  }
})
