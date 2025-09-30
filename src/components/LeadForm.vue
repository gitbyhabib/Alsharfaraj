<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div class="bg-white p-6 rounded w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">Add Lead</h3>
      <form @submit.prevent="save" class="space-y-4">
        <input v-model="form.name" placeholder="Full Name" class="w-full border p-2 rounded" required />
        <input v-model="form.email" placeholder="Email Address" type="email" class="w-full border p-2 rounded" required />
        <input v-model="form.address" placeholder="Address" class="w-full border p-2 rounded" required />
        <input
          v-model="form.phone_no"
          placeholder="Phone Number"
          type="tel"
          class="w-full border p-2 rounded"
          required
          pattern="01[3-9][0-9]{8}"
          title="Enter a valid Bangladeshi phone number"
        />
        <textarea v-model="form.message" placeholder="Message" class="w-full border p-2 rounded" required></textarea>

        <p v-if="statusMessage"
           :class="statusError ? 'text-red-600' : 'text-green-600'"
           class="text-sm text-center">
          {{ statusMessage }}
        </p>

        <div class="flex justify-end space-x-2">
          <button @click="$emit('close')" type="button" class="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['save', 'close'])

const form = ref({
  name: '',
  email: '',
  address: '',
  phone_no: '',
  message: ''
})

const statusMessage = ref('')
const statusError = ref(false)

function buildFormData(data: Record<string, any>) {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  return formData
}

async function save() {
  statusMessage.value = ''
  statusError.value = false
  try {
    const response = await fetch('http://localhost:8000/api/leads', {
      method: 'POST',
      body: buildFormData(form.value)
    })

    if (!response.ok) throw new Error('Network response was not ok')

    statusMessage.value = '✅ Lead saved successfully!'
    statusError.value = false
    emit('save')       // parent can refresh list
    form.value = { name: '', email: '', address: '', phone_no: '', message: '' }

    setTimeout(() => emit('close'), 1000)
  } catch (error) {
    statusMessage.value = '❌ Failed to save lead. Please try again.'
    statusError.value = true
    console.error(error)
  }
}
</script>
