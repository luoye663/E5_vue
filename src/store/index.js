import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'

Vue.use(Vuex)
const state = new Vuex.Store
{
  isLogin: false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
}
export default new Vuex.Store({
  state
})
