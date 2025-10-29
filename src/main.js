import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/App.css'
import { initializeApp } from './utils/helpers'

initializeApp()

createApp(App).use(router).mount('#app')
