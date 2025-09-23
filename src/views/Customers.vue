<template>
  <div>
    <Navbar />
    <div class="p-6">
      <div class="flex justify-between mb-6">
        <h2 class="text-2xl font-bold">Customers</h2>
        <button @click="showForm = true" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Customer</button>
      </div>

      <CustomerTable :customers="customers" />

      <CustomerForm 
        v-if="showForm" 
        @save="saveCustomer" 
        @close="showForm = false" 
        :errors="store.errors"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import CustomerTable from '../components/CustomerTable.vue'
import CustomerForm from '../components/CustomerForm.vue'
import { useCustomerStore } from '../store/customerStore'

const store = useCustomerStore()
const showForm = ref(false)
const customers = store.customers

onMounted(() => {
  store.fetchCustomers()
})

function saveCustomer(data: any) {
  store.addCustomer(data)
  if (Object.keys(store.errors).length === 0) {
    showForm.value = false
  }
}
</script>
