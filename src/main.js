import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import router from './router/routes.js';
import 'vuetify/styles'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'  // Certifique-se de importar o CSS do mdi
import VScrollLock from 'v-scroll-lock'
import VueToastificationPlugin, { POSITION } from 'vue-toastification';

import App from './App.vue'


import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
const vuetify = createVuetify({
  icons: {
    icons: 'mdi'
  },
  components,
  directives,
})

app.use(VueToastificationPlugin, {
  position: POSITION.TOP_RIGHT, 
  timeout: 3000,  
});
app.use(VScrollLock)
app.use(vuetify)
app.use(router)

app.mount('#app')
