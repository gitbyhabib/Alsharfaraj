<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div class="bg-white p-6 rounded w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">Add Customer</h3>
      <form @submit.prevent="save" class="space-y-4">
        <input v-model="name" placeholder="Full Name" class="w-full border p-2 rounded"/>
        <input v-model="passport" placeholder="Passport Number" class="w-full border p-2 rounded"/>
        <input v-model="phone" placeholder="Phone" class="w-full border p-2 rounded"/>
        <input v-model="email" placeholder="Email" class="w-full border p-2 rounded"/>
        <input v-model="address" placeholder="Address" class="w-full border p-2 rounded"/>
        <div class="flex justify-end space-x-2">
          <button @click="$emit('close')" type="button" class="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['save', 'close'])

const name = ref('')
const passport = ref('')
const phone = ref('')
const email = ref('')
const address = ref('')

function save() {
  emit('save', {name: name.value, passport: passport.value, phone: phone.value, email: email.value, address: address.value})
}
</script>
