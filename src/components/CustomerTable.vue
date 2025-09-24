<template>
  <div>
    <table class="min-w-full bg-white rounded shadow">
      <thead>
        <tr class="bg-gray-100">
          <th class="py-2 px-4 text-left">ID</th>
          <th class="py-2 px-4 text-left">Name</th>
          <th class="py-2 px-4 text-left">Passport</th>
          <th class="py-2 px-4 text-left">Phone</th>
          <th class="py-2 px-4 text-left">Lead ID</th>
          <th class="py-2 px-4 text-left">Address</th>
          <th class="py-2 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id" class="border-b">
          <td class="py-2 px-4">{{ customer.id }}</td>
          <td class="py-2 px-4">{{ customer.name }}</td>
          <td class="py-2 px-4">{{ customer.passport_no }}</td>
          <td class="py-2 px-4">{{ customer.phone_no }}</td>
          <td class="py-2 px-4">{{ customer.lead_id }}</td>
          <td class="py-2 px-4">{{ customer.address }}</td>
          <td class="py-2 px-4 space-x-2">
            <button @click="$emit('edit', customer)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
            <button @click="$emit('delete', customer.id)" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Customer } from '../store/customerStore'

const props = defineProps<{ customers: Customer[] }>()
const emit = defineEmits<{ (e: 'edit', customer: Customer): void; (e: 'delete', id: number): void }>()
</script>
