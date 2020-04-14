import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
import store from './store'
import utils from './util/utils'
import moment from 'moment'
// 全局注册，使用方法为:this.$axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:8083'
let _this = this

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
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
    //  dsa
    }
    return response
  },
  error => {
    if (error.response) {
      // eslint-disable-next-line eqeqeq
      if (error.response.status == 403) {
        store.commit('clearLoginInfo')
        _this.$Notice.success({
          title: '身份已过期，请重新登录!'
        })
        router.push('/user/login')
      }
    }
  }
)
// 设置相关属性
moment.locale('zh-cn')

// 全局注册
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
Vue.prototype.$utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
