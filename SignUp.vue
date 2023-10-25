<template>
    <form @submit.prevent="signUp">
    <h2>Sign Up</h2>
        Email: <input type="email" placeholder="Email"    required v-model="email"> <br>
        Password: <input type="password" placeholder="Password" required v-model="password"> <br>
        <input type="radio" value='tutor' id='tutor' name="type" v-model="personType">
        <label for="tutor">Tutor</label>
        <input type="radio" value='parent' id='parent' name="type" v-model="personType"> Parent <br>
        <button>Sign Up</button>
    </form>
  </template>
  
  <script>
  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
  import { auth } from '../firebase/init.js'  

  export default {
    emits: ['loggedIn'],
    data() {
      return {
        email:    '',
        password: '',
        type: 'tutor'
      }
    },
    methods: {
      signUp() {
        // register new user
        createUserWithEmailAndPassword(auth,this.email,this.password)
          .then((credential) => {
          // registered and signed in
          

          this.$emit('loggedIn')
          updateProfile(auth.currentUser, {
            displayName: this.personType
          })
          this.$router.push({name: "home"})
          console.log(credential.user)
        })

        .catch((error) => {
          console.log(error.message)
          alert(error.message)
        })
      }
    }
  }
  
  </script>