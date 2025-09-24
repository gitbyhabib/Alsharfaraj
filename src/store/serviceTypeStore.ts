import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export interface ServiceType {
  id: number
  name: string
  status: 'Active' | 'Inactive'
  minimum_cost: number
}

export const useServiceTypeStore = defineStore('serviceType', {
  state: () => ({
    serviceTypes: [] as ServiceType[],
    errors: {} as Record<string, string[]>
  }),
  actions: {
   async fetchServiceTypes() {
  try {
    const res = await api.get('/auth/view_service_types')
    this.serviceTypes = res.data.data || []   // <-- get the array from 'data'
  } catch (error: any) {
    console.error('Error fetching service types:', error)
  }
},


    async addServiceType(data: { name: string; status: string; minimum_cost: number }) {
      this.errors = {}
      try {
        const res = await api.post('/auth/create_service_type', data)
        this.serviceTypes.push(res.data.data || res.data)
      } catch (error: any) {
        if (error.response?.status === 422) {
          this.errors = error.response.data.errors
        } else {
          console.error('Error creating service type:', error)
        }
      }
    },

    async updateServiceType(id: number, data: { name: string; status: string; minimum_cost: number }) {
      this.errors = {}
      try {
        const res = await api.put(`/auth/update_service_type/${id}`, data)
        const index = this.serviceTypes.findIndex(s => s.id === id)
        if (index !== -1) this.serviceTypes[index] = res.data.data || res.data
      } catch (error: any) {
        if (error.response?.status === 422) {
          this.errors = error.response.data.errors
        } else {
          console.error('Error updating service type:', error)
        }
      }
    },

    async deleteServiceType(id: number) {
      try {
        await api.delete(`/auth/delete_service_types/${id}`)
        this.serviceTypes = this.serviceTypes.filter(s => s.id !== id)
      } catch (error: any) {
        console.error('Error deleting service type:', error)
      }
    }
  }
})
