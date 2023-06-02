<template lang="pug">
section
  header
    button(v-if='$store.state.isSignin', type='button', @click='signout') Signout
    button(v-else, type='button', @click='showSigninForm = true') Signin
    template(v-if='showSigninForm')
      atoms-signin
      button(type='button', @click='showSigninForm = false') close
  section
    nuxt
  templates-food-item
</template>

  <script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { app } from '~/plugins/firebase'
import { User } from '~/models/user'

const auth = getAuth(app)
export default {
  name: 'LayoutsDefault',
  data() {
    return {
      showSigninForm: false,
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit('setUser', new User({ ...user }))
        this.$store.commit('setIsSignin')
        this.showSigninForm = false
      } else {
        this.$store.commit('resetUser')
      }
    })
  },
  methods: {
    async signout() {
      try {
        await signOut(auth)
        this.$store.commit('resetIsSignin')
        this.$store.commit('resetUser')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
