<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold mb-4">{{ service ? 'Edit Service' : 'Add Service' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Details -->
      <div>
        <label class="block mb-1">Details</label>
        <input v-model="form.details" type="text" placeholder="Enter service details"
               class="w-full border px-3 py-2 rounded" required />
      </div>

      <!-- Charge Amount -->
      <div>
        <label class="block mb-1">Charge Amount</label>
        <input v-model="form.charge_amount" type="number" placeholder="Enter charge amount"
               class="w-full border px-3 py-2 rounded" required />
      </div>

      <!-- Assign To (Employee Dropdown) -->
      <div>
        <label class="block mb-1">Assign To</label>
        <select v-model="form.service_assign_to" class="w-full border px-3 py-2 rounded" required>
          <option value="">Select Employee</option>
          <option v-for="emp in employees" :key="emp.id" :value="emp.id">{{ emp.name }}</option>
        </select>
      </div>

      <!-- Customer ID -->
      <div>
        <label class="block mb-1">Customer ID</label>
        <input v-model="form.customer_id" type="number" placeholder="Enter customer ID"
               class="w-full border px-3 py-2 rounded" required />
      </div>

      <!-- Service Type ID -->
      <div>
        <label class="block mb-1">Service Type ID</label>
        <input v-model="form.service_type_id" type="number" placeholder="Enter service type ID"
               class="w-full border px-3 py-2 rounded" required />
      </div>

      <!-- Delivery Date -->
      <div>
        <label class="block mb-1">Delivery Date</label>
        <input v-model="form.delivery_date" type="date" class="w-full border px-3 py-2 rounded" required />
      </div>

      <!-- Receive Date -->
      <div>
        <label class="block mb-1">Receive Date</label>
        <input v-model="form.receive_date" type="date" class="w-full border px-3 py-2 rounded" required />
      </div>

      <!-- Buttons -->
      <div class="flex justify-end space-x-2">
        <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {{ service ? 'Update' : 'Add' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { Service } from '../store/serviceStore'
import { useEmployeeStore } from '../store/employeeStore'

const props = defineProps<{ service?: Service }>()
const emit = defineEmits<{ (e: 'save', service: Service): void; (e: 'close'): void }>()

const form = ref<Service>({
  id: props.service?.id || 0,
  details: props.service?.details || '',
  charge_amount: props.service?.charge_amount || 0,
  service_assign_to: props.service?.service_assign_to || '',
  customer_id: props.service?.customer_id || 0,
  service_type_id: props.service?.service_type_id || 0,
  delivery_date: props.service?.delivery_date || '',
  receive_date: props.service?.receive_date || '',
})

// Watch for edit changes
watch(() => props.service, (newVal) => {
  if (newVal) form.value = { ...newVal }
  else form.value = { id: 0, details: '', charge_amount: 0, service_assign_to: '', customer_id: 0, service_type_id: 0, delivery_date: '', receive_date: '' }
})

// Employee store for dropdown
const employeeStore = useEmployeeStore()
const employees = computed(() => employeeStore.employees)

onMounted(() => {
  employeeStore.fetchEmployees()
})

function handleSubmit() {
  const payload = { ...form.value }
  if (payload.id === 0) delete payload.id
  emit('save', payload)
}
</script>
