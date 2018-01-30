import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Dashboard from './components/Dashboard'
// Import the Okta Vue SDK
import Auth from '@okta/okta-vue'

Vue.use(Router)

// Add the $auth plugin from the Okta Vue SDK to the Vue instance
Vue.use(Auth, {
  // Replace this with your Okta domain:
  issuer: 'https://{yourOktaDomain}.com/oauth2/default',
  // Replace this with the client ID of the Okta app you just created:
  client_id: '{clientId}',
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
