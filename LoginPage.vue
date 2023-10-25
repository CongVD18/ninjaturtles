<template>
  <form @submit.prevent="login">
  <h2>Log in</h2>
    <input type="email"    placeholder="Email"    required v-model="email">
    <input type="password" placeholder="Password" required v-model="password">
    <button>Log in</button>
  </form>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/init.js'

export default {
  data() {
    return {
      email:    '',
      password: ''
    }
  },
  methods: {
    login() {
      // login user
      signInWithEmailAndPassword(auth,this.email,this.password)
      .then(() => {
        // emit event for member area
        this.$emit('loggedIn')
        this.$router.push({name: "home"})
      })
      .catch((error) => {
        switch(error.code) {
          default:
            error.code = "Email or Password was incorrect. Please check it again!"
        }
        alert(error.code)
      })
    }
  }
}
</script>