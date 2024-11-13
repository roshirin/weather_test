import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import Notifications from '@kyvg/vue3-notification'

import App from './App.vue'
import router from './router'

import en from './locales/en'
import uk from './locales/uk'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'uk',
  messages: {
    en,
    uk,
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Notifications)

app.mount('#app')
