<template>
  <table class="w-full border rounded overflow-hidden">
    <thead class="bg-gray-100">
      <tr>
        <th class="p-2 border">ID</th>
        <th class="p-2 border">Name</th>
        <th class="p-2 border">Email</th>
        <th class="p-2 border">Phone</th>
        <th class="p-2 border">Status</th>
        <th class="p-2 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="l in leads" :key="l.id" class="hover:bg-gray-50">
        <td class="p-2 border">{{ l.id }}</td>
        <td class="p-2 border">{{ l.name }}</td>
        <td class="p-2 border">{{ l.email }}</td>
        <td class="p-2 border">{{ l.phone }}</td>
        <td class="p-2 border">{{ l.status }}</td>
        <td class="p-2 border flex space-x-2">
          <button @click="$emit('delete', l.id)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          <button v-if="l.status === 'New'" @click="$emit('assign', l.id, prompt('Assign to employee:'))" class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Assign</button>
          <button v-if="l.status !== 'Converted'" @click="$emit('convert', l.id, {name: l.name, passport: prompt('Passport No:'), phone: l.phone, email: l.email})" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Convert</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ leads: Array })
const emit = defineEmits(['delete', 'assign', 'convert'])
</script>
