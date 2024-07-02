<template lang="pug">
form.a-signin
  .a-signin__item
    label.a-signin__label(for='email') Email
    .a-signin__content
      atoms-input-text(v-model='email' id='email')

  .a-signin__item
    label.a-signin__label(for='password') Password
    .a-signin__content
      atoms-input-text(v-model='password' type='password' id='password')

  p {{ error }}

  .a-signin__item
    .a-signin__content
      atoms-button(text='Signin', @click='signin' :disabled='!email || !password || isConnecting')

</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'AtomsSignin',
  data() {
    return {
      email: '',
      isConnecting: false,
      password: '',
      error: '',
    }
  },
  methods: {
    async signin() {
      const auth = getAuth()
      try {
        this.isConnecting = true
        await signInWithEmailAndPassword(auth, this.email, this.password)
        this.$store.commit('removeTemplateNames')
      } catch (error) {
        this.error = error
        console.error(error)
      }
      this.isConnecting = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/form';
.a-signin {
  &__item {
    @extend %form__item;
  }

  &__label {
    @extend %form__label;
  }

  &__content {
    @extend %form__content;
  }
}
</style>
