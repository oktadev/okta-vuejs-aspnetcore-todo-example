export const state = {
  todos: []
}

export const mutations = {
  loadTodos(state, todos) {
    state.todos = todos || [];
  },

  clearTodos(state) {
    state.todos = [];
  }
}
