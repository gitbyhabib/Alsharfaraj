<template>
  <div>
    <table class="min-w-full bg-white rounded shadow">
      <thead>
        <tr class="bg-gray-100">
          <th class="py-2 px-4 text-left">Service ID</th>
          <th class="py-2 px-4 text-left">Customer</th>
          <th class="py-2 px-4 text-left">Type</th>
          <th class="py-2 px-4 text-left">Cost</th>
          <th class="py-2 px-4 text-left">Status</th>
          <th class="py-2 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.id" class="border-b">
          <td class="py-2 px-4">{{ service.id }}</td>
          <td class="py-2 px-4">{{ service.customerName }}</td>
          <td class="py-2 px-4">{{ service.type }}</td>
          <td class="py-2 px-4">{{ service.cost }}</td>
          <td class="py-2 px-4">{{ service.status }}</td>
          <td class="py-2 px-4 space-x-2">
            <button @click="$emit('edit', service)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
              Edit
            </button>
            <button @click="$emit('delete', service.id)" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Service {
  id: number
  customerName: string
  type: string
  cost: number
  status: string
}

const props = defineProps<{ services: Service[] }>()
const emit = defineEmits<{
  (e: 'edit', service: Service): void
  (e: 'delete', id: number): void
}>()
</script>
