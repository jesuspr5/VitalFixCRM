import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import modules from './modules'
import { VRangeSlider } from 'vuetify/lib'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    // color de la barra verde
    barColor: 'rgba(117, 186, 104, .8), rgba(20, 126, 72, .8)',
    // img para que apareza en la barra VRangeSlider, esta img de ya no existe y por eso no aparece
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  getters,
  mutations,
  actions,
  modules,
})
