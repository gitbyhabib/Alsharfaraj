<template>
  <div class="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">{{ serviceType?.id ? 'Edit Service Type' : 'Add Service Type' }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">

      <div>
        <label class="block mb-1">Name</label>
        <input v-model="form.name" type="text" placeholder="Service Type Name" class="w-full border px-3 py-2 rounded" required />
        <div v-if="errors.name" class="text-red-600 text-sm">{{ errors.name[0] }}</div>
      </div>

      <div>
        <label class="block mb-1">Status</label>
        <select v-model="form.status" class="w-full border px-3 py-2 rounded" required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div v-if="errors.status" class="text-red-600 text-sm">{{ errors.status[0] }}</div>
      </div>

      <div>
        <label class="block mb-1">Minimum Cost</label>
        <input v-model.number="form.minimum_cost" type="number" placeholder="Minimum Cost" class="w-full border px-3 py-2 rounded" required />
        <div v-if="errors.minimum_cost" class="text-red-600 text-sm">{{ errors.minimum_cost[0] }}</div>
      </div>

      <div class="flex justify-end space-x-2">
        <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {{ serviceType?.id ? 'Update' : 'Add' }}
        </button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ServiceType } from '../store/serviceTypeStore'

const props = defineProps<{ serviceType?: ServiceType; errors?: Record<string, string[]> }>()
const emit = defineEmits<{ (e: 'save', data: { name: string; status: string; minimum_cost: number }): void; (e: 'close'): void }>()

const form = ref({
  name: props.serviceType?.name || '',
  status: props.serviceType?.status || 'Active',
  minimum_cost: props.serviceType?.minimum_cost || 0
})

const errors = ref<Record<string, string[]>>(props.errors || {})

watch(() => props.serviceType, val => {
  form.value = val ? { name: val.name, status: val.status, minimum_cost: val.minimum_cost } : { name: '', status: 'Active', minimum_cost: 0 }
})

watch(() => props.errors, val => errors.value = val || {})

function handleSubmit() {
  emit('save', { ...form.value })
}
</script>
