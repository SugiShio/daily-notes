<template lang="pug">
section.l-default
  atoms-pager
  template(v-if='isSignin')
    organisms-header
    nuxt
  .l-default__signin(v-else)
    atoms-button(text='Signin', outline @click='showSigninForm')

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
  methods: {
    showSigninForm() {
      this.$store.commit('pager/setTemplateNames', 'templates-signin-form')
    },
  },
}
</script>

<style lang="scss" scoped>
.l-default {
  min-height: 100vh;

  &__signin {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
}
</style>
