import axios from 'axios'

const addAuthHeader = async (auth) => {
  return {
    headers: { 'Authorization': 'Bearer ' + await auth.getAccessToken() }
  }
}

export const actions = {
  async getAllTodos({ commit }, data) {
    let response = await axios.get('/api/todo', await addAuthHeader(data.$auth))
    
    if (response && response.data) {
      let updatedTodos = response.data
      commit('loadTodos', updatedTodos)
    }
  },  

  async addTodo({ dispatch }, data) {
    await axios.post(
      '/api/todo',
      { text: data.text },
      await addAuthHeader(data.$auth))

    await dispatch('getAllTodos', data.$auth)
  },

  async toggleTodo({ dispatch }, data) {
    await axios.post(
      '/api/todo/' + data.id,
      { completed: data.completed },
      await addAuthHeader(data.$auth))

    await dispatch('getAllTodos', data.$auth)
  },

  async deleteTodo({ dispatch }, data) {
    await axios.delete('/api/todo/' + data.id, await addAuthHeader(data.$auth))
    await dispatch('getAllTodos', data.$auth)
  }
}
