import { defineStore } from 'pinia'
import api from '../plugins/axios'

export interface Lead {
  id: number
  name: string
  address: string
  email: string
  phone_no: string
  message: string
  status?: string
  assignedTo?: string
}

export const useLeadStore = defineStore('leads', {
  state: () => ({ leads: [] as Lead[] }),
  actions: {
    async fetchLeads() {
      try {
        const res = await api.get('/auth/leads_view')
        this.leads = Array.isArray(res.data) ? res.data : res.data.data || []
      } catch (err) {
        console.error('Error fetching leads:', err)
      }
    },

    addLead(lead: Lead) { this.leads.push(lead) },

    async removeLead(id: number) {
      try {
        await api.delete(`/leads/${id}`)
      } catch (err) {
        // ignore API failure but log
        console.error('Error deleting lead on server:', err)
      }
      this.leads = this.leads.filter(l => l.id !== id)
    },

    assignLead(id: number, employee: string) {
      const lead = this.leads.find(l => l.id === id)
      if (lead) lead.assignedTo = employee
    },

    convertLead(id: number, customerData: Record<string, any>) {
      // Ideally call backend to convert lead to customer; for now remove locally
      this.leads = this.leads.filter(l => l.id !== id)
      // Attempt server-side conversion (best-effort)
      api.post('/customers/create', customerData).catch((err: any) => console.error('Error converting lead:', err))
    },

    updateLead(id: number, data: Partial<Lead>) {
      const lead = this.leads.find(l => l.id === id)
      if (lead) Object.assign(lead, data)
    }
  }
})
