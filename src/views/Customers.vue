<template>
  <div>
    <Navbar />
    <div class="p-6">
      <div class="flex justify-between mb-6">
        <h2 class="text-2xl font-bold">Customers</h2>
        <button @click="showForm = true" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Customer</button>
      </div>
      <CustomerTable :customers="customers" @delete="deleteCustomer" />
      <CustomerForm v-if="showForm" @save="addCustomer" @close="showForm=false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import CustomerTable from '../components/CustomerTable.vue'
import CustomerForm from '../components/CustomerForm.vue'
import { useCustomerStore } from '../store/customerStore'
import { ref } from 'vue'

const customerStore = useCustomerStore()
const showForm = ref(false)
const customers = customerStore.customers

function addCustomer(data: any) {
  customerStore.addCustomer({...data, id: Date.now()})
  showForm.value = false
}

function deleteCustomer(id: number) {
  customerStore.removeCustomer(id)
}
</script>
