import { defineStore } from 'pinia'
import axios from 'axios'

export type Role = 'super_admin' | 'admin' | 'employee'

interface Employee {
  id: number
  name: string
  email: string
  phone: string
  role: Role
  status: 'active' | 'inactive'
}

export const useEmployeeStore = defineStore('employees', {
  state: () => ({
    employees: [] as Employee[],
    baseUrl: 'http://localhost:8000/api',
    token: localStorage.getItem('token') || '' // ensure token from login is saved here
  }),
  actions: {
    async fetchEmployees() {
      try {
        const res = await axios.get(`${this.baseUrl}/auth/view`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.employees = res.data.data || res.data
      } catch (err) {
        console.error('Error fetching employees:', err)
      }
    },

    async addEmployee(emp: any) {
      try {
        const res = await axios.post(`${this.baseUrl}/auth/register/`, emp, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.employees.push(res.data.data || res.data)
      } catch (err) {
        console.error('Error adding employee:', err)
        throw err
      }
    },

    async updateEmployee(id: number, data: Partial<Employee>) {
      try {
        const res = await axios.post(`${this.baseUrl}/auth/update/${id}`, data, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        const index = this.employees.findIndex(e => e.id === id)
        if (index !== -1) {
          this.employees[index] = res.data.data || { ...this.employees[index], ...data }
        }
      } catch (err) {
        console.error('Error updating employee:', err)
        throw err
      }
    },

    async removeEmployee(id: number) {
      try {
        await axios.delete(`${this.baseUrl}/auth/delete/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.employees = this.employees.filter(e => e.id !== id)
      } catch (err) {
        console.error('Error deleting employee:', err)
      }
    }
  }
})
