// store/serviceStore.ts
import { defineStore } from 'pinia'

export interface Service {
  id: number
  customerId: number
  type: string
  cost: number
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
  assignedEmployee?: number
}

export const useServiceStore = defineStore('services', {
  state: () => ({
    services: [] as Service[],
  }),
  actions: {
    addService(s: Service) {
      this.services.push(s)
    },
    updateService(updated: Service) {
      const index = this.services.findIndex(s => s.id === updated.id)
      if (index !== -1) {
        this.services[index] = { ...this.services[index], ...updated }
      }
    },
    removeService(id: number) {
      // This is the critical part
      this.services = this.services.filter(s => s.id !== id)
    }
  }
})

