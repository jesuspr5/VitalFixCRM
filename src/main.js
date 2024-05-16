// =========================================================
// * Vuetify Material Dashboard PRO - v2.0.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from '@/store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/vue-world-map'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import VueLoading from 'vuejs-loading-plugin'
import Toasted from 'vue-toasted'
import './api/config/axiosConfig'
Vue.config.productionTip = false
Vue.use(VueLoading)
Vue.use(Toasted, {
  iconPack: 'material', // set your iconPack, defaults to material. material|fontawesome|custom-class
})
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
