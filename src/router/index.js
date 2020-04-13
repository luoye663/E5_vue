import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import store from '../store'
import Receive from '../github/auth2/Receive'
import Login from '../github/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/home',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/user/login',
      name: 'login',
      component: Login
    }, {
      path: '/auth2/receive',
      name: 'receive',
      component: Receive
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.token) {
      next()
    } else {
      next({
        path: '/user/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
}
)
export default router
