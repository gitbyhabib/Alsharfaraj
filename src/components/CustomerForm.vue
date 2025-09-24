<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div class="bg-white p-6 rounded w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">{{ customer ? 'Edit Customer' : 'Add Customer' }}</h3>

      <!-- General backend messages -->
      <div v-if="errors.general" class="text-red-600 text-sm mb-2" v-for="(err, i) in errors.general" :key="i">
        {{ err }}
      </div>

      <form @submit.prevent="save" class="space-y-4">

        <input v-model="name" placeholder="Full Name" class="w-full border p-2 rounded"/>
        <div v-if="errors.name" class="text-red-600 text-sm">{{ errors.name[0] }}</div>

        <input v-model="passport_no" placeholder="Passport Number" class="w-full border p-2 rounded"/>
        <div v-if="errors.passport_no" class="text-red-600 text-sm">{{ errors.passport_no[0] }}</div>

        <input  v-model="phone_no" placeholder="Phone Number" class="w-full border p-2 rounded"/>
        <div v-if="errors.phone_no" class="text-red-600 text-sm">{{ errors.phone_no[0] }}</div>

        <input v-model="lead_id" placeholder="Lead ID" class="w-full border p-2 rounded"/>
        <div v-if="errors.lead_id" class="text-red-600 text-sm">{{ errors.lead_id[0] }}</div>

        <input v-model="address" placeholder="Address" class="w-full border p-2 rounded"/>
        <div v-if="errors.address" class="text-red-600 text-sm">{{ errors.address[0] }}</div>

        <div class="flex justify-end space-x-2">
          <button @click="$emit('close')" type="button" class="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Customer } from '../store/customerStore'

const props = defineProps<{ customer?: Customer; errors?: Record<string, string[]> }>()
const emit = defineEmits<{ (e: 'save', customer: Customer): void; (e: 'close'): void }>()

const customer = props.customer
const errors = ref<Record<string, string[]>>(props.errors || {})

const name = ref(customer?.name || '')
const passport_no = ref(customer?.passport_no || '')
const phone_no = ref(customer?.phone_no || '')
const lead_id = ref(customer?.lead_id || '')
const address = ref(customer?.address || '')

watch(() => props.errors, val => {
  errors.value = val || {}
})

function validate() {
  errors.value = {}
  if (!name.value) errors.value.name = ['Name is required']
  if (!passport_no.value) errors.value.passport_no = ['Passport number is required']
  if (!phone_no.value) errors.value.phone_no = ['Phone number is required']
  else if (!/^\d{7,15}$/.test(phone_no.value)) errors.value.phone_no = ['Phone must be 7–15 digits']
 /*  if (!lead_id.value) errors.value.lead_id = ['Lead ID is required'] */
  if (!address.value) errors.value.address = ['Address is required']
  return Object.keys(errors.value).length === 0
}

function save() {
  if (!validate()) return
  emit('save', { 
    id: customer?.id || 0,
    name: name.value,
    passport_no: passport_no.value,
    phone_no: phone_no.value,
    lead_id: lead_id.value,
    address: address.value
  })
}
</script>
