import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'
import Auth from '@okta/okta-vue'

Vue.use(Router)

Vue.use(Auth, {
  issuer: 'https://atko-corporation-application.oktapreview.com/oauth2/default',
  client_id: '0oads7fzw6eKtYuDf0h7',
  redirect_uri: 'http://localhost:5000/implicit/callback',
  scope: 'openid profile email'
})

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Dashboard },
    { path: '/implicit/callback', component: Auth.handleCallback() },
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
