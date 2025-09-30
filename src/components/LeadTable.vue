<template>
  <div>
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
        <tr v-if="!leads.length">
          <td colspan="6" class="text-center p-4 text-gray-500">
            No leads found.
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios' // ✅ your axios instance

const leads = ref<any[]>([])
const error = ref('')

async function fetchLeads() {
  try {
    const response = await api.get('/auth/leads/view') // ✅ axios GET
    leads.value = response.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Something went wrong'
    console.error(err)
  }
}

onMounted(fetchLeads)
</script>
