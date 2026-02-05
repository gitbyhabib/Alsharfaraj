<template>
  <div>
    <Navbar />
    <div class="p-6">
      <div class="flex justify-between mb-6">
        <h2 class="text-2xl font-bold">Leads</h2>
        <button @click="showForm = true" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Lead</button>
      </div>

      <LeadTable :leads="leads" @delete="deleteLead" @assign="assignLead" @convert="convertLead" />
      <LeadForm v-if="showForm" @save="addLead" @close="showForm=false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import LeadTable from '../components/LeadTable.vue'
import LeadForm from '../components/LeadForm.vue'
import { useLeadStore, type Lead } from '../store/leadStore'
import { ref, onMounted } from 'vue'

const leadStore = useLeadStore()

const showForm = ref(false)

onMounted(() => {
  leadStore.fetchLeads()
})

const leads = leadStore.leads

function addLead(data: Lead) {
  // If backend returned a saved lead, prefer that; otherwise assign a temporary id
  const newLead = { ...data, id: data.id || Date.now(), status: data.status || 'New' }
  leadStore.addLead(newLead)
  showForm.value = false
}

function deleteLead(id: number) {
  leadStore.removeLead(id)
}

function assignLead(id: number, employee: string) {
  leadStore.assignLead(id, employee)
}

function convertLead(id: number, customerData: any) {
  leadStore.convertLead(id, customerData)
}
</script>
