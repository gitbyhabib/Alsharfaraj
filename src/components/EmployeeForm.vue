<template>
  <div class="bg-white rounded w-full">
    <h3 class="text-xl font-bold mb-4">{{ editData ? 'Edit' : 'Add' }} Employee</h3>
    <form @submit.prevent="handleSubmit">

      <!-- Name -->
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        class="w-full mb-1 p-2 border rounded"
      />
      <div v-if="errors.name" class="text-red-600 text-sm mb-2">{{ errors.name[0] }}</div>

      <!-- Email -->
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full mb-1 p-2 border rounded"
      />
      <div v-if="errors.email" class="text-red-600 text-sm mb-2">{{ errors.email[0] }}</div>

      <!-- Username -->
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="w-full mb-1 p-2 border rounded"
      />
      <div v-if="errors.username" class="text-red-600 text-sm mb-2">{{ errors.username[0] }}</div>

      <!-- Phone -->
      <input
        v-model="phone_no"
        type="text"
        placeholder="Phone"
        class="w-full mb-1 p-2 border rounded"
      />
      <div v-if="errors.phone_no" class="text-red-600 text-sm mb-2">{{ errors.phone_no[0] }}</div>

      <!-- Password (only for add) -->
      <div v-if="!editData" class="relative mb-1">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="w-full p-2 border rounded pr-10"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute right-3 top-2 text-gray-500"
        >
          <span v-if="showPassword">🙈</span>
          <span v-else>👁️</span>
        </button>
      </div>
      <div v-if="errors.password" class="text-red-600 text-sm mb-2">{{ errors.password[0] }}</div>

      <!-- Confirm Password -->
      <div v-if="!editData" class="relative mb-1">
        <input
          v-model="password_confirmation"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Confirm Password"
          class="w-full p-2 border rounded pr-10"
        />
        <button
          type="button"
          @click="showConfirmPassword = !showConfirmPassword"
          class="absolute right-3 top-2 text-gray-500"
        >
          <span v-if="showConfirmPassword">🙈</span>
          <span v-else>👁️</span>
        </button>
      </div>
      <div v-if="errors.password_confirmation" class="text-red-600 text-sm mb-2">{{ errors.password_confirmation[0] }}</div>

      <!-- Role -->
      <select v-model="role" class="w-full mb-1 p-2 border rounded" required>
        <option value="">Select Role</option>
        <option value="super_admin">Super Admin</option>
        <option value="sub_admin">Admin</option>
        <option value="employee">Employee</option>
      </select>
      <div v-if="errors.role" class="text-red-600 text-sm mb-2">{{ errors.role[0] }}</div>

      <!-- Status -->
      <select v-model="status" class="w-full mb-1 p-2 border rounded">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <div v-if="errors.status" class="text-red-600 text-sm mb-2">{{ errors.status[0] }}</div>

      <!-- Image -->
    <!--   <input type="file" @change="onFileChange" class="mb-4" />
      <div v-if="errors.img" class="text-red-600 text-sm mb-2">{{ errors.img[0] }}</div> -->

      <!-- Buttons -->
      <div class="flex justify-end gap-2">
        <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {{ editData ? 'Update' : 'Add' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useEmployeeStore } from "@/store/employeeStore"

const props = defineProps<{ editData: any | null }>()
const emit = defineEmits<{ (e: "save"): void; (e: "close"): void }>()

const store = useEmployeeStore()

// Form fields
const name = ref("")
const email = ref("")
const username = ref("")
const phone_no = ref("")
const password = ref("")
const password_confirmation = ref("")
const role = ref("")
const status = ref("active")
const imgFile = ref<File | null>(null)
const errors = ref<Record<string, string[]>>({})

// Password toggle
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Watch for edit data
watch(
  () => props.editData,
  (newVal) => {
    if (newVal) {
      name.value = newVal.name
      email.value = newVal.email
      username.value = newVal.username || ""
      phone_no.value = newVal.phone_no
      role.value = newVal.role
      status.value = newVal.status
      password.value = ""
      password_confirmation.value = ""
    } else {
      name.value = ""
      email.value = ""
      username.value = ""
      phone_no.value = ""
      role.value = ""
      status.value = "active"
      password.value = ""
      password_confirmation.value = ""
    }
    errors.value = {}
  },
  { immediate: true }
)

// Handle file change
function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    imgFile.value = target.files[0]
  }
}

// Frontend validation
function validateForm(): boolean {
  errors.value = {}

  if (!name.value.trim()) errors.value.name = ["Name is required."]
  if (!email.value.trim()) errors.value.email = ["Email is required."]
  if (!username.value.trim()) errors.value.username = ["Username is required."]
  if (!phone_no.value.trim()) errors.value.phone_no = ["Phone number is required."]
  if (!role.value) errors.value.role = ["Role is required."]
  if (!status.value) errors.value.status = ["Status is required."]

  if (!props.editData) {
    if (!password.value) errors.value.password = ["Password is required."]
    else if (password.value.length < 8) errors.value.password = ["Password must be at least 8 characters."]
    if (password.value !== password_confirmation.value) errors.value.password_confirmation = ["Passwords do not match."]
  }

  return Object.keys(errors.value).length === 0
}

// Handle submit
async function handleSubmit() {
  if (!validateForm()) return

  const formData = new FormData()
  formData.append("name", name.value)
  formData.append("email", email.value)
  formData.append("username", username.value)
  formData.append("phone_no", phone_no.value)
  formData.append("role", role.value)
  formData.append("status", status.value)

  if (!props.editData) {
    formData.append("password", password.value)
    formData.append("password_confirmation", password_confirmation.value)
  }

  if (imgFile.value) {
    formData.append("img", imgFile.value)
  }

  try {
    if (props.editData) {
      await store.updateEmployee(props.editData.id, formData)
    } else {
      await store.addEmployee(formData)
    }
    emit("save")
  } catch (err: any) {
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors || {}
    } else {
      console.error("Unexpected error:", err)
    }
  }
}
</script>
