<template lang="pug">
section.l-default
  atoms-pager
  organisms-header
  nuxt(v-if='isSignin')
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

<style lang="scss" scoped>
.l-default {
  min-height: 100vh;
}
</style>
