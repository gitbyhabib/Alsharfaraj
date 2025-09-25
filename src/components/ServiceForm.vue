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
        <input v-model="form.charge_amount" type="text" placeholder="Enter charge amount"
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

      <!-- Service Type Dropdown -->
      <div>
        <label class="block mb-1">Service Type</label>
        <select v-model="form.service_type_id" class="w-full border px-3 py-2 rounded" required>
          <option value="">Select Service Type</option>
          <option v-for="type in serviceTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
        </select>
      </div>

        <!-- Receive Date -->
      <div>
        <label class="block mb-1">Receive Date</label>
        <input v-model="form.receive_date" type="date" class="w-full border px-3 py-2 rounded" required />
      </div>
      <!-- Delivery Date -->
      <div>
        <label class="block mb-1">Delivery Date</label>
        <input v-model="form.delivery_date" type="date" class="w-full border px-3 py-2 rounded" required />
      </div>

    

      <!-- Buttons -->
      <div class="flex justify-end space-x-2">
        <button type="button" @click="handleCancel" class="px-4 py-2 border rounded">Cancel</button>
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
import { useServiceTypeStore } from '../store/serviceTypeStore'

const props = defineProps<{ service?: Service }>()
const emit = defineEmits<{ (e: 'save', service: Service): void; (e: 'close'): void }>()

// For date input, just return YYYY-MM-DD
function formatDateForInput(dateStr: string) {
  if (!dateStr) return ''
  return dateStr.split('T')[0] // backend already gives YYYY-MM-DD
}

function formatDateForBackend(date: string) {
  if (!date) return ''
  const [year, month, day] = date.split('-') // date input is already YYYY-MM-DD
  return `${year}-${month}-${day}` // keep as YYYY-MM-DD
}

// Form reactive object
const form = ref<Service>({
  id: props.service?.id || 0,
  details: props.service?.details || '',
  charge_amount: props.service?.charge_amount || 0,
  service_assign_to: props.service?.service_assign_to || '',
  customer_id: props.service?.customer_id || 0,
  service_type_id: props.service?.service_type_id || '',
  delivery_date: formatDateForInput(props.service?.delivery_date || ''),
  receive_date: formatDateForInput(props.service?.receive_date || ''),
})

// Watch for prop changes (edit mode)
watch(() => props.service, (newVal) => {
  if (newVal) {
    form.value = {
      ...newVal,
      delivery_date: formatDateForInput(newVal.delivery_date),
      receive_date: formatDateForInput(newVal.receive_date),
    }
  } else {
    resetForm()
  }
})


// Employee store
const employeeStore = useEmployeeStore()
const employees = computed(() => employeeStore.employees)
onMounted(() => {
  employeeStore.fetchEmployees()
})

// Service Type store
const serviceTypeStore = useServiceTypeStore()
const serviceTypes = computed(() => serviceTypeStore.serviceTypes)
onMounted(() => {
  serviceTypeStore.fetchServiceTypes()
})

// Reset form
function resetForm() {
  form.value = {
    id: 0,
    details: '',
    charge_amount: 0,
    service_assign_to: '',
    customer_id: 0,
    service_type_id: 0,
    delivery_date: '',
    receive_date: ''
  }
}

// Cancel button
function handleCancel() {
  resetForm()
  emit('close')
}

// Submit
function handleSubmit() {
  const payload: Service = {
    ...form.value,
    delivery_date: formatDateForBackend(form.value.delivery_date),
    receive_date: formatDateForBackend(form.value.receive_date),
  }

  if (payload.id === 0) delete payload.id

  console.log('Submitting service payload:', payload) // check format

  emit('save', payload)
}

</script>
