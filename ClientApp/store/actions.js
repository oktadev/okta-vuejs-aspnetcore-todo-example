import axios from 'axios'
import oktaAuth from '../oktaAuth'

const sleep  = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const addAuthHeader = () => {
  return {
    headers: { 'Authorization': 'Bearer ' + oktaAuth.client.tokenManager.get('access_token').accessToken }
  }
}

export const actions = {
  checkLoggedIn({ commit }) {
    if (oktaAuth.client.tokenManager.get('access_token')) {
      let idToken = oktaAuth.client.tokenManager.get('id_token')
      commit('loggedIn', idToken.claims)
    }
  },
  
  async login({ dispatch, commit }, data) {
    let authResponse
    try {
      authResponse = await oktaAuth.client.signIn({
        username: data.email,
        password: data.password
      });
    }
    catch (err) {
      let message = err.message || 'Login error'
      dispatch('loginFailed', message)
      return
    }
  
    if (authResponse.status !== 'SUCCESS') {
      console.error("Login unsuccessful, or more info required", response.status)
      dispatch('loginFailed', 'Login error')
      return
    }
  
    let tokens
    try {
      tokens = await oktaAuth.client.token.getWithoutPrompt({
        responseType: ['id_token', 'token'],
        scopes: ['openid', 'email', 'profile'],
        sessionToken: authResponse.sessionToken,
      })
    }
    catch (err) {
      let message = err.message || 'Login error'
      dispatch('loginFailed', message)
      return
    }
  
    // Verify ID token validity
    try {
      await oktaAuth.client.token.verify(tokens[0])
    } catch (err) {
      dispatch('loginFailed', 'An error occurred')
      console.error('id_token failed validation')
      return
    }
  
    oktaAuth.client.tokenManager.add('id_token', tokens[0]);
    oktaAuth.client.tokenManager.add('access_token', tokens[1]);
  
    commit('loggedIn', tokens[0].claims)
  },
  
  async logout({ commit }) {
    oktaAuth.client.tokenManager.clear()
    await oktaAuth.client.signOut()
    commit('loggedOut')
  },  

  async loginFailed({ commit }, message) {
    commit('loginError', message)
    await sleep(3000)
    commit('loginError', null)
  },

  async getAllTodos({ commit }) {
    let response = await axios.get('/api/todo', addAuthHeader())
    
    if (response && response.data) {
      let updatedTodos = response.data
      commit('loadTodos', updatedTodos)
    }
  },  

  async addTodo({ dispatch }, data) {
    // Todo: save a new to-do item
    await dispatch('getAllTodos')
  },

  async toggleTodo({ dispatch }, data) {
    // Todo: toggle to-do item completed/not completed
    await dispatch('getAllTodos')
  },

  async deleteTodo({ dispatch }, id) {
    // Todo: delete to-do item
    await dispatch('getAllTodos')
  }
}
