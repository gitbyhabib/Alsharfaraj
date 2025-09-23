<!-- src/views/Dashboard.vue -->
<template>
  <div>
    <Navbar />
    <div class="p-6 space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded shadow flex flex-col items-center">
          <div class="text-3xl font-bold">{{ customers.length }}</div>
          <div class="text-gray-600">Total Customers</div>
        </div>
        <div class="bg-white p-6 rounded shadow flex flex-col items-center">
          <div class="text-3xl font-bold">{{ employees.length }}</div>
          <div class="text-gray-600">Total Employees</div>
        </div>
        <div class="bg-white p-6 rounded shadow flex flex-col items-center">
          <div class="text-3xl font-bold">{{ services.length }}</div>
          <div class="text-gray-600">Total Services</div>
        </div>
      </div>

      <!-- Quick Action Links -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <router-link to="/customers" class="block bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700 text-center">Manage Customers</router-link>
        <router-link v-if="isAdmin" to="/employees" class="block bg-green-600 text-white p-6 rounded shadow hover:bg-green-700 text-center">Manage Employees</router-link>
        <router-link to="/services" class="block bg-purple-600 text-white p-6 rounded shadow hover:bg-purple-700 text-center">Manage Services</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import { useCustomerStore } from '../store/customerStore'
import { useEmployeeStore } from '../store/employeeStore'
import { useServiceStore } from '../store/serviceStore'
import { useAuthStore } from '../store/authStore'

const customerStore = useCustomerStore()
const employeesStore = useEmployeeStore()
const serviceStore = useServiceStore()
const auth = useAuthStore()

const customers = customerStore.customers
const employees = employeesStore.employees
const services = serviceStore.services
const isAdmin = auth.user?.role === 'admin' || auth.user?.role === 'super_admin'
</script>
