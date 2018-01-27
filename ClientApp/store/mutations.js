import router from '../router'

export const state = {
  todos: [],
  userName: null
}

export const mutations = {
  loadTodos(state, todos) {
    state.todos = todos || [];
  }
}
