<template>
  <div>
    <Navbar />
    <div class="p-6">
      <div class="flex justify-between mb-6">
        <h2 class="text-2xl font-bold">Services</h2>
        <button @click="showForm = true" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Service</button>
      </div>

      <ServiceTable :services="services" @edit="editService" @delete="deleteService" />
      <ServiceForm v-if="showForm" :service="selectedService" @save="saveService" @close="showForm=false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import ServiceTable from '../components/ServiceTable.vue'
import ServiceForm from '../components/ServiceForm.vue'
import { useServiceStore, type Service } from '../store/serviceStore'
import { ref } from 'vue'

const serviceStore = useServiceStore()
const services = serviceStore.services

const showForm = ref(false)
const selectedService = ref<Service | undefined>(undefined)

function editService(service: Service) {
  selectedService.value = { ...service }
  showForm.value = true
}

function saveService(service: Service) {
  if (serviceStore.services.find(s => s.id === service.id)) {
    serviceStore.updateService(service)
  } else {
    serviceStore.addService(service)
  }
  showForm.value = false
  selectedService.value = undefined
}

function deleteService(id: number) {
  serviceStore.removeService(id)
}
</script>
