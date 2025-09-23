<template>
  <div>
    <Navbar />
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded shadow text-center">
          <div class="text-xl font-bold">Customers</div>
          <div class="text-3xl">{{ customerCount }}</div>
        </div>
        <div class="bg-white p-6 rounded shadow text-center">
          <div class="text-xl font-bold">Leads</div>
          <div class="text-3xl">{{ leadCount }}</div>
        </div>
        <div class="bg-white p-6 rounded shadow text-center">
          <div class="text-xl font-bold">Services</div>
          <div class="text-3xl">{{ serviceCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import { useCustomerStore } from '../store/customerStore'
import { useLeadStore } from '../store/leadStore'
import { useServiceStore } from '../store/serviceStore'

const customerStore = useCustomerStore()
const leadStore = useLeadStore()
const serviceStore = useServiceStore()

const customerCount = customerStore.customers.length
const leadCount = leadStore.leads.length
const serviceCount = serviceStore.services.length
</script>
