// src/utils/dateFormat.ts

// Convert from "DD-MM-YYYY" (backend) → "YYYY-MM-DD" (input field)
export function toInputDate(date: string): string {
  if (!date) return ''
  const [day, month, year] = date.split('-')
  return `${year}-${month}-${day}`
}

// Convert from "YYYY-MM-DD" (input field) → "DD-MM-YYYY" (backend)
export function toBackendDate(date: string): string {
  if (!date) return ''
  const [year, month, day] = date.split('-')
  return `${day}-${month}-${year}`
}
