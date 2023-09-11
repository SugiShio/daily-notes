<template lang="pug">
section
  atoms-pager
  organisms-header
  nuxt(v-if='isSignin')
  atoms-signin(v-else)
</template>

  <script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '~/plugins/firebase'
const auth = getAuth(app)

export default {
  name: 'LayoutsDefault',
  computed: {
    isSignin() {
      return this.$store.state.isSignin
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch('setUser', user.uid)
      } else {
        this.$store.commit('resetUser')
      }
    })
  },
}
</script>
