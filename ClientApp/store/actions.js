import axios from 'axios'

const addAuthHeader = async (auth) => {
  return {
    headers: { 'Authorization': 'Bearer ' + await auth.getAccessToken() }
  }
}

export const actions = {
  async getAllTodos({ commit }, auth) {
    let response = await axios.get('/api/todo', await addAuthHeader(auth))
    
    if (response && response.data) {
      let updatedTodos = response.data
      commit('loadTodos', updatedTodos)
    }
  },  

  async addTodo({ dispatch }, auth, data) {
    await axios.post(
      '/api/todo',
      { text: data.text },
      addAuthHeader(auth))

    await dispatch('getAllTodos')
  },

  async toggleTodo({ dispatch }, auth, data) {
    await axios.post(
      '/api/todo/' + data.id,
      { completed: data.completed },
      addAuthHeader(auth))

    await dispatch('getAllTodos')
  },

  async deleteTodo({ dispatch }, auth, id) {
    await axios.delete('/api/todo/' + id, addAuthHeader(auth))
    await dispatch('getAllTodos')
  }
}
