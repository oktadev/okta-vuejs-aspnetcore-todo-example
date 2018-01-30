<template>
  <div class="dashboard">
    <template v-if="!this.$parent.authenticated">
      <p>You gotta log in!</p>
    </template>

    <template v-if="this.$parent.authenticated">
      <h2>{{name}}, here's your to-do list</h2>

      <input class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          @keyup.enter="addTodo">

      <ul class="todo-list">
        <todo-item v-for="(todo, index) in todos" :key="index" :item="todo"></todo-item>
      </ul>
      
      <p>{{ remaining }} remaining</p>
    </template>
  </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
  components: { TodoItem },
  computed: {
    name () {
      if (this.$parent.userInfo) {
        return this.$parent.userInfo.name
      } else {
        return null
      }
    },
    todos () {
      return this.$store.state.todos
    },
    complete () {
      return this.todos.filter(todo => todo.completed).length
    },
    remaining () {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    addTodo (e) {
      var text = e.target.value || ''
      text = text.trim()

      if (text.length) {
        this.$store.dispatch('addTodo', { $auth: this.$auth, text })
      }
      
      e.target.value = ''
    },
  }
}
</script>

<style>
.new-todo {
  width: 100%;
  font-size: 18px;
  margin-bottom: 15px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
