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
import { useLeadStore } from '../store/leadStore'
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore'

const leadStore = useLeadStore()
const auth = useAuthStore()
const showForm = ref(false)

const leads = leadStore.leads

function addLead(data: any) {
  leadStore.addLead({...data, id: Date.now(), status: 'New'})
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
