import { LOGIN_USER, LOGOUT_USER, UPDATE_PERSON } from '../mutation-types'

import {
  loginApi,
} from '@/api/modules'

 import router from '../../router'

const initialState = {
  user: {
    person: {},
  },
  logged: false,
}

const state = {
  ...initialState,
}

const getters = {
  user: state => state.user,
  logged: state => state.logged,
}

const mutations = {
  [LOGIN_USER]: (state, payload) => {
    state.user = payload
    state.logged = true
  },
  [LOGOUT_USER]: state => {
    state.user = initialState.user
    state.logged = initialState.logged
  },
  [UPDATE_PERSON]: (state, payload) => {
    state.user.person = {
      ...state.user.person,
      ...payload,
    }
  },
}

// const savePersonId = async email => {
//   console.log(email)
//   let serviceResponsePerson = await getAppPersonApi(email)
//   if (serviceResponsePerson.ok) {
//     localStorage.setItem('person_id', serviceResponsePerson.data.id)
//     router.push({ name: 'Home' })
//   }
// }

const actions = {
   async loginAction ({ commit }, payload) {
    let serviceResponse = await loginApi(payload)
    console.log(serviceResponse)
    if (serviceResponse.ok) {
        commit(LOGIN_USER, serviceResponse.data)
        localStorage.setItem('user_id', serviceResponse.data.id)
        localStorage.setItem('email', serviceResponse.data.email)
        localStorage.setItem('password', payload.password)
        localStorage.setItem('token', serviceResponse.data.token)
        router.push({ name: 'Dashboard' })
    } else {
      const params = { text: serviceResponse.message.text }
      window.getApp.$emit('SHOW_ERROR', params)
      router.push({ name: 'Login' })
    }
  },
  // logoutAction ({ commit, dispatch }) {
  //   localStorage.clear()
  //   commit(LOGOUT_USER)
  //   dispatch('cleanApp')
  //   // router.push({ name: "LoginPage" });
  // },
  // async updatePersonAction ({ commit, state }, payload) {
  //   const { id } = state.user
  //   let serviceResponse = await updateUserApi(id, payload)
  //   if (serviceResponse.ok) {
  //     const params = { text: serviceResponse.message.text }
  //     window.getApp.$emit('SHOW_MESSAGE', params)
  //     commit(UPDATE_PERSON, payload)
  //     router.push({ name: 'Home' })
  //   } else {
  //     const params = { text: serviceResponse.message.text }
  //     window.getApp.$emit('SHOW_ERROR', params)
  //   }
  // },
  // async createAppPersonAction ({ commit, state }, payload) {
  //   const { id } = state.user
  //   let serviceResponse = await createAppPersonApi(id, payload)
  //   if (serviceResponse.ok) {
  //     localStorage.setItem('password', payload.password)
  //     await savePersonId(state.user.email)
  //     const params = { text: serviceResponse.message.text }
  //     window.getApp.$emit('SHOW_MESSAGE', params)
  //     commit(UPDATE_PERSON, payload)
  //     router.push({ name: 'Home' })
  //   } else {
  //     const params = { text: serviceResponse.message.text }
  //     window.getApp.$emit('SHOW_ERROR', params)
  //   }
  // },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
