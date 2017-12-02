import axios from 'axios'

const sleep  = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const actions = {
  checkLoggedIn({ commit }) {
    // Todo: commit('loggedIn') if the user is already logged in
  },

  async login({ dispatch, commit }, data) {
    // Todo: log the user in
    commit('loggedIn', { userName: data.email })
  },

  async logout({ commit }) {
      // Todo: log the user out
      commit('loggedOut')
  },

  async loginFailed({ commit }, message) {
    commit('loginError', message)
    await sleep(3000)
    commit('loginError', null)
  },

  async getAllTodos({ commit }) {
    // Todo: get the user's to-do items
    commit('loadTodos', [{ text: 'Fake to-do item' }])
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
