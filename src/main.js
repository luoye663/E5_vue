import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
import store from './store'
import utils from './util/utils'
// 全局注册，使用方法为:this.$axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:8083'
Vue.prototype.$utils = utils
Vue.use(ViewUI)
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers['token'] = localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
