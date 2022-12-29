import Vue from 'vue'
import VueI18n from 'vue-i18n'

import es from 'vuetify/lib/locale/es'
import en from 'vuetify/lib/locale/en'

Vue.use(VueI18n)

const messages = {
  en: {
    ...require('@/locales/en.json'),
    $vuetify: en,
  },
  es: {
    ...require('@/locales/es.json'),
    $vuetify: es,
  },
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages,
})
