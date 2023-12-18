import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './config/router/router.js'
// Vuetify

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-icons/iconfont/material-icons.css';
import '@mdi/font/css/materialdesignicons.css' //This in order to use mdi icons in vuetify
const pinia = createPinia()

const vuetify = createVuetify({
    components
    , directives
})


const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
