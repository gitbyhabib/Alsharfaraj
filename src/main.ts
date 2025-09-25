import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/authStore'

const app = createApp(App)
app.use(router)
app.use(createPinia())

// Load user from localStorage before router runs
const authStore = useAuthStore()
authStore.initialize()
app.mount('#app')
