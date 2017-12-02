<template>
  <div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    
    <form @submit.prevent="login" autocomplete="off">
      <label for="email">Email</label>
      <input id="email" v-model="email" placeholder="you@example.com">
      <label for="password">Password</label>
      <input id="password" v-model="password" placeholder="password" type="password">
      <button type="submit">login</button>
      <p v-if="loginError" class="error">{{loginError}}</p>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  computed: {
    loginError () {
      return this.$store.state.loginError
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
       })
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}

label {
  display: block;
}

input {
  display: block;
  margin-bottom: 10px;
}
</style>
