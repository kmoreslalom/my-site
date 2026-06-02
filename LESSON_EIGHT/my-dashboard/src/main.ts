import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import {
  VApp,
  VAppBar,
  VToolbarTitle,
  VSpacer,
  VSelect,
  VMain,
  VContainer,
  VRow,
  VCol,
  VCard,
  VCardTitle,
  VCardText,
  VBtn,
  VIcon,
  VSheet,
} from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components: {
    VApp,
    VAppBar,
    VToolbarTitle,
    VSpacer,
    VSelect,
    VMain,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardTitle,
    VCardText,
    VBtn,
    VIcon,
    VSheet,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'dark',
  },
})

createApp(App).use(router).use(vuetify).mount('#app')
