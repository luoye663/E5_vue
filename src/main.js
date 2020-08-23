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
axios.defaults.baseURL = process.env.API_HOST
// let _this = this

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
        // _this.$Notice.success({
        //   title: '身份已过期，请重新登录!'
        // })
        router.push('/user/login')
      }
    }
  }
)
axios.interceptors.response.use(
  response => {
    // 当返回信息为未登录或者登录失效的时候重定向为登录页面
    if (response.data.status !== 200 && response.data.status !== undefined) {
      alert('系统异常:http响应代码:' + response.data.status)
    }
    return response
  },
  error => {
    return Promise.reject(error)
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
