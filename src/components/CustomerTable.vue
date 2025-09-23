<template>
  <table class="w-full border rounded overflow-hidden">
    <thead class="bg-gray-100">
      <tr>
        <th class="p-2 border">ID</th>
        <th class="p-2 border">Name</th>
        <th class="p-2 border">Passport</th>
        <th class="p-2 border">Phone</th>
        <th class="p-2 border">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="c in customers" :key="c.id" class="hover:bg-gray-50">
        <td class="p-2 border">{{ c.id }}</td>
        <td class="p-2 border">{{ c.name }}</td>
        <td class="p-2 border">{{ c.passport }}</td>
        <td class="p-2 border">{{ c.phone }}</td>
        <td class="p-2 border">{{ c.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({ customers: Array })
</script>
