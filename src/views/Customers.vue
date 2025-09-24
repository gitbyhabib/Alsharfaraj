<template>
  <div>
    <Navbar />
    <div class="p-6">
      <div class="flex justify-between mb-6">
        <h2 class="text-2xl font-bold">Customers</h2>
        <button @click="openForm()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Customer</button>
      </div>

      <CustomerTable 
        :customers="store.customers" 
        @edit="editCustomer" 
        @delete="deleteCustomer"
      />

      <CustomerForm 
        v-if="showForm" 
        :customer="selectedCustomer"
        :errors="formErrors"
        @save="saveCustomer" 
        @close="closeForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import CustomerTable from '../components/CustomerTable.vue'
import CustomerForm from '../components/CustomerForm.vue'
import { useCustomerStore, type Customer } from '../store/customerStore'

const store = useCustomerStore()
const showForm = ref(false)
const selectedCustomer = ref<Customer | undefined>()
const formErrors = ref<Record<string, string[]>>({})

onMounted(() => {
  store.fetchCustomers()
})

function openForm() {
  selectedCustomer.value = undefined
  formErrors.value = {}
  showForm.value = true
}

function editCustomer(customer: Customer) {
  selectedCustomer.value = { ...customer }
  formErrors.value = {}
  showForm.value = true
}

function closeForm() {
  selectedCustomer.value = undefined
  formErrors.value = {}
  showForm.value = false
}

async function saveCustomer(customer: Customer) {
  formErrors.value = {}
  try {
    if (customer.id) {
      await store.updateCustomer(customer)
    } else {
      await store.addCustomer(customer)
    }
    await store.fetchCustomers()
    closeForm()
  } catch (error) {
    formErrors.value = store.errors
  }
}

async function deleteCustomer(id: number) {
  await store.removeCustomer(id)
}
</script>
