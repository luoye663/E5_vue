import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('username') == null ? '' : window.localStorage.getItem('username'),
      token: window.localStorage.getItem('token') == null ? '' : window.localStorage.getItem('token'),
      expire: window.localStorage.getItem('expire') == null ? '' : window.localStorage.getItem('expire')
    }
  },
  mutations: {
    changeLogin (state, user) {
      state.user = user
      window.localStorage.setItem('username', user.username)
      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('expire', user.expire)
    },
    clearLoginInfo () {
      window.localStorage.setItem('username', '')
      window.localStorage.setItem('token', '')
      window.localStorage.setItem('expire', '')
    }
  }
})
