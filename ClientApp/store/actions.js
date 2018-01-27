import axios from 'axios'

const addAuthHeader = () => {
  return {
    headers: { 'Authorization': 'Bearer ' + oktaAuth.client.tokenManager.get('access_token').accessToken }
  }
}

export const actions = {
  async getAllTodos({ commit }) {
    let response = await axios.get('/api/todo', addAuthHeader())
    
    if (response && response.data) {
      let updatedTodos = response.data
      commit('loadTodos', updatedTodos)
    }
  },  

  async addTodo({ dispatch }, data) {
    await axios.post(
      '/api/todo',
      { text: data.text },
      addAuthHeader())

    await dispatch('getAllTodos')
  },

  async toggleTodo({ dispatch }, data) {
    await axios.post(
      '/api/todo/' + data.id,
      { completed: data.completed },
      addAuthHeader())

    await dispatch('getAllTodos')
  },

  async deleteTodo({ dispatch }, id) {
    await axios.delete('/api/todo/' + id, addAuthHeader())
    await dispatch('getAllTodos')
  }
}
