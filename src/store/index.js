import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('username') == null ? '' : window.localStorage.getItem('username'),
      token: window.localStorage.getItem('token') == null ? '' : window.localStorage.getItem('token')
    }
  },
  mutations: {
    login (state, user) {
      state.token = user.token
      window.localStorage.setItem('username', user.username)
    }
  }
})
