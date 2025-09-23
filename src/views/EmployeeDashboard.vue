<template>
  <div>
    <Navbar />
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Employee Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded shadow text-center">
          <div class="text-xl font-bold">Assigned Leads</div>
          <div class="text-3xl">{{ assignedLeads }}</div>
        </div>
        <div class="bg-white p-6 rounded shadow text-center">
          <div class="text-xl font-bold">Assigned Services</div>
          <div class="text-3xl">{{ assignedServices }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import { useLeadStore } from '../store/leadStore'
import { useServiceStore } from '../store/serviceStore'
import { useAuthStore } from '../store/authStore'

const leadStore = useLeadStore()
const serviceStore = useServiceStore()
const auth = useAuthStore()

const assignedLeads = leadStore.leads.filter(l => l.assignedTo === auth.user?.name).length
const assignedServices = serviceStore.services.filter(s => s.assignedTo === auth.user?.name).length
</script>
