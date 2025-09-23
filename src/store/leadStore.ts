import { defineStore } from 'pinia'

interface Lead {
  id: number
  name: string
  email: string
  phone: string
  message: string
  status: 'New' | 'Assigned' | 'Converted' | 'Closed'
  assignedTo?: string
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
