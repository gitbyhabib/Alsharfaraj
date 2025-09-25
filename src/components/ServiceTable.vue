<template>
  <div>
    <table class="min-w-full bg-white rounded shadow">
      <thead>
        <tr class="bg-gray-100">
          <th class="py-2 px-4 text-left">ID</th>
          <th class="py-2 px-4 text-left">Details</th>
          <th class="py-2 px-4 text-left">Charge</th>
          <th class="py-2 px-4 text-left">Assign To</th>
          <th class="py-2 px-4 text-left">Customer</th>
          <th class="py-2 px-4 text-left">Delivery</th>
          <th class="py-2 px-4 text-left">Receive</th>
          <th class="py-2 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.id" class="border-b">
          <td class="py-2 px-4">{{ service.id }}</td>
          <td class="py-2 px-4">{{ service.details }}</td>
          <td class="py-2 px-4">{{ service.charge_amount }}</td>
          <td class="py-2 px-4">{{ getEmployeeName(service.service_assign_to) }}</td>
          <td class="py-2 px-4">{{ service.customer_id }}</td>
          <td class="py-2 px-4">{{ formatDate(service.receive_date) }}</td>
          <td class="py-2 px-4">{{ formatDate(service.delivery_date) }}</td>
          <td class="py-2 px-4 space-x-2">
            <button @click="$emit('edit', service)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
            <button @click="$emit('delete', service.id)" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Service } from '../store/serviceStore'
import { useEmployeeStore } from '../store/employeeStore'

const props = defineProps<{ services: Service[] }>()
const employeeStore = useEmployeeStore()

function getEmployeeName(id: string | number) {
  const emp = employeeStore.employees.find(e => e.id == id)
  return emp ? emp.name : id
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return dateStr.split('T')[0] // take only YYYY-MM-DD
}
</script>
