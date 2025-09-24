<template>
  <div>
    <Navbar />
    <div class="p-6">
      <div class="flex justify-between mb-6">
        <h2 class="text-2xl font-bold">Services</h2>
        <button @click="openForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Service
        </button>
      </div>

      <ServiceTable
        :services="services"
        @edit="editService"
        @delete="deleteService"
      />

      <ServiceForm
        v-if="showForm"
        :service="selectedService"
        @save="saveService"
        @close="closeForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import ServiceTable from '../components/ServiceTable.vue'
import ServiceForm from '../components/ServiceForm.vue'
import { useServiceStore, type Service } from '../store/serviceStore'
import { ref, onMounted } from 'vue'

const serviceStore = useServiceStore()
const services = serviceStore.services
const showForm = ref(false)
const selectedService = ref<Service | undefined>()

onMounted(() => {
  serviceStore.fetchServices()
})

function openForm() {
  selectedService.value = undefined
  showForm.value = true
}

function editService(service: Service) {
  selectedService.value = { ...service }
  showForm.value = true
}

async function saveService(service: Service) {
  if (service.id) {
    await serviceStore.updateService(service)
  } else {
    await serviceStore.addService(service)
  }
  closeForm()
}

async function deleteService(id: number) {
  await serviceStore.removeService(id)
}

function closeForm() {
  showForm.value = false
  selectedService.value = undefined
}
</script>
