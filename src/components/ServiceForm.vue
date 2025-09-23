<template>
  <div class="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">{{ service ? 'Edit Service' : 'Add Service' }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block mb-1">Customer ID</label>
        <input v-model="form.customerId" type="number" class="w-full border px-3 py-2 rounded" required />
      </div>
      <div>
        <label class="block mb-1">Service Type</label>
        <select v-model="form.type" class="w-full border px-3 py-2 rounded" required>
          <option value="Air Ticket">Air Ticket</option>
          <option value="Manpower">Manpower</option>
          <option value="Visa Processing">Visa Processing</option>
        </select>
      </div>
      <div>
        <label class="block mb-1">Service Cost</label>
        <input v-model="form.cost" type="number" class="w-full border px-3 py-2 rounded" required />
      </div>
      <div>
        <label class="block mb-1">Status</label>
        <select v-model="form.status" class="w-full border px-3 py-2 rounded" required>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div class="flex justify-end space-x-2">
        <button type="button" @click="$emit('close')" class="px-4 py-2 rounded border">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {{ service ? 'Update' : 'Add' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Service } from '../store/serviceStore'

const props = defineProps<{ service?: Service }>()
const emit = defineEmits<{
  (e: 'save', service: Service): void
  (e: 'close'): void
}>()

const form = ref({
  id: props.service?.id || 0,
  customerId: props.service?.customerId || 0,
  type: props.service?.type || 'Air Ticket',
  cost: props.service?.cost || 0,
  status: props.service?.status || 'Pending',
})

watch(() => props.service, (newVal) => {
  if (newVal) {
    form.value = { ...newVal }
  }
})

function handleSubmit() {
  emit('save', { ...form.value })
}
</script>
