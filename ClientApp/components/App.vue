<template>
  <div class="app-container">
    <div class="app-view">
      <router-view />

      <template v-if="authenticated">
        <button v-if='authenticated' v-on:click='logout'>Log out</button>
      </template>

      <template v-else>
        <button v-on:click='$auth.loginRedirect'>Log in</button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      authenticated: false,
      userInfo: null
    }
  },
  created () {
    this.checkAuthentication()
  },
  watch: {
    // Everytime the route changes, check for auth status
    '$route': 'checkAuthentication'
  },
  methods: {
    async checkAuthentication () {
      let previouslyLoggedIn = this.authenticated
      this.authenticated = await this.$auth.isAuthenticated()

      let justLoggedIn = !previouslyLoggedIn && this.authenticated
      if (justLoggedIn) {
        this.$store.dispatch('getAllTodos', this.$auth)
        this.userInfo = await this.$auth.getUser()
      }

      let justLoggedOut = previouslyLoggedIn && !this.authenticated
      if (justLoggedOut) {
        console.log('just logged out!')
        this.userInfo = null
        //this.$store.commit('clearTodos')
      }
    },
    async logout () {
      await this.$auth.logout()
      await this.checkAuthentication()

      // Navigate back to home
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
html, body {
	margin: 0;
	padding: 0;
}

body {
	font: 14px -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;
	line-height: 1.4em;
	background: #F3F5F6;
	color: #4d4d4d;
}

ul {
  padding: 0;
}

h1, h2 {
  text-align: center;
}

.app-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-view {
  background: #fff;
  min-width: 400px;
  min-height: 200px;
  padding: 20px 25px 15px 25px;
  margin: 30px;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 5px 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
