<template>
  <div>
    <Navbar />
    <div class="p-6">
      <div class="flex justify-between mb-6">
        <h2 class="text-2xl font-bold">Employees</h2>
        <button @click="openForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Employee
        </button>
      </div>

      <EmployeeTable
        :employees="employees"
        @delete="deleteEmployee"
        @edit="editEmployee"
      />

      <!-- Modal -->
      <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded shadow-lg w-[80%] max-w-lg relative">
          <!-- Close Button -->
          <button @click="closeForm" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            ✕
          </button>

          <!-- Employee Form -->
          <EmployeeForm
            :editData="editData"
            @save="saveEmployee"
            @close="closeForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import Navbar from "../components/Navbar.vue"
import EmployeeTable from "../components/EmployeeTable.vue"
import EmployeeForm from "../components/EmployeeForm.vue"
import { useEmployeeStore } from "../store/employeeStore"

const employeeStore = useEmployeeStore()
const showForm = ref(false)
const editData = ref<any | null>(null)

onMounted(() => {
  employeeStore.fetchEmployees()
})

const employees = computed(() => employeeStore.employees)

function saveEmployee(data: FormData) {
  if (editData.value) {
    employeeStore.updateEmployee(editData.value.id, data)
  } else {
    employeeStore.addEmployee(data)
  }
  closeForm()
}

function deleteEmployee(id: number) {
  employeeStore.removeEmployee(id)
}

function editEmployee(emp: any) {
  editData.value = emp
  showForm.value = true
}

function openForm() {
  editData.value = null
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editData.value = null
}
</script>