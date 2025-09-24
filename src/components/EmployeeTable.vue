<template>
  <div>
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Name</th>
          <th class="p-2 border">Email</th>
          <th class="p-2 border">Phone</th>
          <th class="p-2 border">Role</th>
          <th class="p-2 border">Status</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id" class="hover:bg-gray-50">
          <td class="p-2 border">{{ emp.id }}</td>
          <td class="p-2 border">{{ emp.name }}</td>
          <td class="p-2 border">{{ emp.email }}</td>
          <td class="p-2 border">{{ emp.phone_no }}</td>
          <td class="p-2 border">{{ emp.role }}</td>
          <td class="p-2 border">{{ emp.status }}</td>
          <td class="p-2 border flex gap-2 justify-center">
            <button @click="$emit('edit', emp)" class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
            <button @click="$emit('delete', emp.id)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Employee {
  id: number
  name: string
  email: string
  phone_no: string
  role: string
  status: string
}

const props = defineProps<{
  employees: Employee[]
}>()
</script>