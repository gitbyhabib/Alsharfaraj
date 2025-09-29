<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import type { Customer } from '../store/customerStore'

const props = defineProps<{ customer?: Customer; errors: Record<string, string[]> }>()
const emit = defineEmits<{ (e: 'save', customer: Customer): void; (e: 'close'): void }>()

// local form data
const localCustomer = ref<Customer>({
  name: '',
  passport_no: '',
  passport_expired_date: '',   // ✅ new field
  phone_no: '',
  lead_id: undefined,
  address: ''
})

// watch for edit mode
watch(
  () => props.customer,
  (val) => {
    if (val) {
      localCustomer.value = { ...val }
    } else {
      localCustomer.value = { 
        name: '', 
        passport_no: '', 
        passport_expired_date: '',   // ✅ reset
        phone_no: '', 
        lead_id: undefined, 
        address: '' 
      }
    }
  },
  { immediate: true }
)

const save = () => {
  emit('save', { ...localCustomer.value })
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow w-96">
      <h3 class="text-xl font-bold mb-4">{{ customer?.id ? 'Edit Customer' : 'Add Customer' }}</h3>

      <div class="space-y-3">
        <div>
          <label class="block mb-1">Name</label>
          <input v-model="localCustomer.name" type="text" class="w-full border px-2 py-1 rounded" />
          <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</p>
        </div>

        <div>
          <label class="block mb-1">Passport</label>
          <input v-model="localCustomer.passport_no" type="text" class="w-full border px-2 py-1 rounded" />
          <p v-if="errors.passport_no" class="text-red-500 text-sm">{{ errors.passport_no[0] }}</p>
        </div>

        <!-- ✅ New Passport Expired Date -->
        <div>
          <label class="block mb-1">Passport Expired Date</label>
          <input v-model="localCustomer.passport_expired_date" type="date" class="w-full border px-2 py-1 rounded" />
          <p v-if="errors.passport_expired_date" class="text-red-500 text-sm">{{ errors.passport_expired_date[0] }}</p>
        </div>

        <div>
          <label class="block mb-1">Phone</label>
          <input v-model="localCustomer.phone_no" type="text" class="w-full border px-2 py-1 rounded" />
          <p v-if="errors.phone_no" class="text-red-500 text-sm">{{ errors.phone_no[0] }}</p>
        </div>

        <div>
          <label class="block mb-1">Lead ID</label>
          <input v-model="localCustomer.lead_id" type="number" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label class="block mb-1">Address</label>
          <input v-model="localCustomer.address" type="text" class="w-full border px-2 py-1 rounded" />
        </div>
      </div>

      <div class="mt-4 flex justify-end space-x-2">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
        <button @click="save" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
      </div>
    </div>
  </div>
</template>
