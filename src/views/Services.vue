<template>
  <div>
    <Navbar />
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between mb-6">
        <h2 class="text-2xl font-bold">Services</h2>
        <button @click="openForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Service
        </button>
      </div>

      <!-- Service Table -->
      <ServiceTable
        :services="services"
        @edit="editService"
        @delete="deleteService"
      />

      <!-- Modal -->
      <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded shadow-lg w-[80%] max-w-lg relative">
          <!-- Close Button -->
          <button @click="closeForm" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            ✕
          </button>

          <!-- Service Form -->
          <ServiceForm
            :service="selectedService"
            @save="saveService"
            @close="closeForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import ServiceTable from '../components/ServiceTable.vue'
import ServiceForm from '../components/ServiceForm.vue'
import { useServiceStore, type Service } from '../store/serviceStore'
import { ref, onMounted, computed } from 'vue'

const serviceStore = useServiceStore()
const showForm = ref(false)
const selectedService = ref<Service | undefined>()

onMounted(() => {
  serviceStore.fetchServices()
})

const services = computed(() => serviceStore.services)

// Open modal for adding
function openForm() {
  selectedService.value = undefined
  showForm.value = true
}

// Open modal for editing
function editService(service: Service) {
  selectedService.value = { ...service }
  showForm.value = true
}

// Save (add or update)
async function saveService(service: Service) {
  if (service.id) {
    await serviceStore.updateService(service)
  } else {
    await serviceStore.addService(service)
  }
  closeForm()
}

// Delete
async function deleteService(id: number) {
  await serviceStore.removeService(id)
}

// Close modal
function closeForm() {
  showForm.value = false
  selectedService.value = undefined
}
</script>
