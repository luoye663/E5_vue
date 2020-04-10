// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
import store from './store'
// 全局注册，使用方法为:this.$axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:8083'
Vue.prototype.$axios = axios
Vue.use(ViewUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
