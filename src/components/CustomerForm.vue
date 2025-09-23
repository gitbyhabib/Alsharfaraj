<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div class="bg-white p-6 rounded w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">Add Customer</h3>
      <form @submit.prevent="save" class="space-y-4">

        <input v-model="name" placeholder="Full Name" class="w-full border p-2 rounded"/>
        <div v-if="errors.name" class="text-red-600 text-sm">{{ errors.name[0] }}</div>

        <input v-model="passport_no" placeholder="Passport_no Number" class="w-full border p-2 rounded"/>
        <div v-if="errors.passport_no" class="text-red-600 text-sm">{{ errors.passport_no[0] }}</div>

        <input v-model="phone_no" placeholder="Phone_no" class="w-full border p-2 rounded"/>
        <div v-if="errors.phone_no" class="text-red-600 text-sm">{{ errors.phone_no[0] }}</div>

        <input v-model="lead_id" placeholder="lead_id" class="w-full border p-2 rounded"/>
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
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['save', 'close'])
const props = defineProps<{ errors: Record<string, string[]> }>()

const name = ref('')
const passport_no = ref('')
const phone_no = ref('')
const lead_id = ref('')
const address = ref('')

const errors = ref<Record<string, string[]>>({})

watch(() => props.errors, (val) => {
  errors.value = val || {}
})

function save() {
  emit('save', { name: name.value, passport_no: passport_no.value, phone_no: phone_no.value, lead_id: lead_id.value, address: address.value })
}
</script>
