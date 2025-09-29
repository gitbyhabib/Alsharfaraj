<template>
  <table class="w-full border rounded overflow-hidden">
    <thead class="bg-gray-100">
      <tr>
        <th class="p-2 border">ID</th>
        <th class="p-2 border">Name</th>
        <th class="p-2 border">Email</th>
        <th class="p-2 border">Phone</th>
        <th class="p-2 border">Message</th>
        <th class="p-2 border">Address</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="l in leads" :key="l.id" class="hover:bg-gray-50">
        <td class="p-2 border">{{ l.id }}</td>
        <td class="p-2 border">{{ l.name }}</td>
        <td class="p-2 border">{{ l.email }}</td>
        <td class="p-2 border">{{ l.phone_no }}</td>
        <td class="p-2 border">{{ l.message }}</td>
        <td class="p-2 border">{{ l.address }}</td>
       
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ leads: Array })
const emit = defineEmits(['delete', 'assign', 'convert'])
</script>
