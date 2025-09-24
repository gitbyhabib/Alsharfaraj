<template>
  <div>
    <Navbar />
    <div class="p-6">
      <div class="flex justify-between mb-6">
        <h2 class="text-2xl font-bold">Service Types</h2>
        <button @click="openForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Service Type</button>
      </div>

      <table class="min-w-full bg-white rounded shadow">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2 px-4 text-left">ID</th>
            <th class="py-2 px-4 text-left">Name</th>
            <th class="py-2 px-4 text-left">Status</th>
            <th class="py-2 px-4 text-left">Minimum Cost</th>
            <th class="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in serviceTypes" :key="s.id" class="border-b">
            <td class="py-2 px-4">{{ s.id }}</td>
            <td class="py-2 px-4">{{ s.name }}</td>
            <td class="py-2 px-4">{{ s.status }}</td>
            <td class="py-2 px-4">{{ s.minimum_cost }}</td>
            <td class="py-2 px-4 space-x-2">
              <button @click="edit(s)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
              <button @click="remove(s.id)" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <ServiceTypeForm :serviceType="editData" :errors="store.errors" @save="save" @close="closeForm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import ServiceTypeForm from '../components/ServiceTypeForm.vue'
import { useServiceTypeStore } from '../store/serviceTypeStore'

const store = useServiceTypeStore()
const showForm = ref(false)
const editData = ref<any | null>(null)

onMounted(() => store.fetchServiceTypes())

const serviceTypes = computed(() => store.serviceTypes)

function openForm() { editData.value = null; showForm.value = true }
function closeForm() { showForm.value = false; editData.value = null }

async function save(data: { name: string; status: string; minimum_cost: number }) {
  if (editData.value) {
    await store.updateServiceType(editData.value.id, data)
  } else {
    await store.addServiceType(data)
  }
  closeForm()
}

function edit(s: any) { editData.value = s; showForm.value = true }
function remove(id: number) { store.deleteServiceType(id) }
</script>
