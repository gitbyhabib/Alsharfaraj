<template>
  <div class="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">{{ service ? 'Edit Service' : 'Add Service' }}</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block mb-1">Details</label>
        <input v-model="form.details" type="text" class="w-full border px-3 py-2 rounded" required />
      </div>

      <div>
        <label class="block mb-1">Charge Amount</label>
        <input v-model="form.charge_amount" type="number" class="w-full border px-3 py-2 rounded" required />
      </div>

      <div>
        <label class="block mb-1">Assign To</label>
        <input v-model="form.service_assign_to" type="text" class="w-full border px-3 py-2 rounded" required />
      </div>

      <div>
        <label class="block mb-1">Customer ID</label>
        <input v-model="form.customer_id" type="number" class="w-full border px-3 py-2 rounded" required />
      </div>

      <div>
        <label class="block mb-1">Service Type ID</label>
        <input v-model="form.service_type_id" type="number" class="w-full border px-3 py-2 rounded" required />
      </div>

      <div>
        <label class="block mb-1">Delivery Date</label>
        <input v-model="form.delivery_date" type="date" class="w-full border px-3 py-2 rounded" required />
      </div>

      <div>
        <label class="block mb-1">Receive Date</label>
        <input v-model="form.receive_date" type="date" class="w-full border px-3 py-2 rounded" required />
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
const emit = defineEmits<{ (e: 'save', service: Service): void; (e: 'close'): void }>()

const form = ref({
  id: props.service?.id || 0,
  details: props.service?.details || '',
  charge_amount: props.service?.charge_amount || 0,
  service_assign_to: props.service?.service_assign_to || '',
  customer_id: props.service?.customer_id || 0,
  service_type_id: props.service?.service_type_id || 0,
  delivery_date: props.service?.delivery_date || '',
  receive_date: props.service?.receive_date || '',
})

watch(() => props.service, (newVal) => {
  if (newVal) {
    form.value = { ...newVal }
  } else {
    form.value = {
      id: 0,
      details: '',
      charge_amount: 0,
      service_assign_to: '',
      customer_id: 0,
      service_type_id: 0,
      delivery_date: '',
      receive_date: '',
    }
  }
})

function handleSubmit() {
  emit('save', { ...form.value })
}
</script>
