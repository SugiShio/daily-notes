<template lang="pug">
form.a-signin
  .a-signin__item
    label.a-signin__label(for='date') Email
    .a-signin__content
      atoms-input-text(v-model='email')

  .a-signin__item
    label.a-signin__label(for='date') Password
    .a-signin__content
      atoms-input-text(v-model='password')

  p {{ error }}

  .a-signin__item
    .a-signin__content
      atoms-button(text='Signin', @click='signin')

</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'AtomsSignin',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async signin() {
      const auth = getAuth()
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
      } catch (error) {
        this.error = error
        console.error(error)
      }
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
