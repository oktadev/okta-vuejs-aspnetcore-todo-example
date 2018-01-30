import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Dashboard from './components/Dashboard'
// Import the Okta Vue SDK
import Auth from '@okta/okta-vue'

Vue.use(Router)

// Add the $auth plugin from the Okta Vue SDK to the Vue instance
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
    // Handle the redirect from Okta using the Okta Vue SDK
    { path: '/implicit/callback', component: Auth.handleCallback() },
  ]
})

// Check the authentication status before router transitions
router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
