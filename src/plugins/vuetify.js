import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/i18n'

Vue.use(Vuetify)

// theme color
const theme = {
  // colores usados en las etiquetas html
  primary: '#E73542',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
  greenligth: '#75B768',
  grenndark: '#147E48',
  four: '#97A575',
  five: '#CCD8F3',
  gray: '#4B524A',
}

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})
