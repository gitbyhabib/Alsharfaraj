import { defineStore } from 'pinia'

interface Lead {
  id: number
  name: string
  address: string
  email: string
  phone_no: string
  message: string

}

export const useLeadStore = defineStore('leads', {
  state: () => ({ leads: [] as Lead[] }),
  actions: {
    addLead(lead: Lead) { this.leads.push(lead) },
    updateLead(id: number, data: Partial<Lead>) {
      const lead = this.leads.find(l => l.id === id)
      if (lead) Object.assign(lead, data)
    }
  }
})
