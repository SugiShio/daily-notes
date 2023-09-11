<template lang="pug">
header.o-header
  nuxt-link.o-header__button(
    v-if='$store.state.isSignin',
    :to='{ name: "user" }'
  ) {{ displayName }}
  //- button.o-header__button(
    v-else,
    type='button',
    @click='showSigninForm = true'
    ) Signin
  //- template(v-if='showSigninForm')
    atoms-signin
    button(type='button', @click='showSigninForm = false') close
</template>

<script>
export default {
  name: 'OrganismsHeader',
  computed: {
    user() {
      return this.$store.state.user
    },
    displayName() {
      return this.user.displayName
        ? this.user.displayName
        : this.user.email.slice(0, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.o-header {
  padding: 0 10px;
  display: flex;
  justify-content: flex-end;

  &__button {
    padding: 10px;
    text-decoration: none;
  }
}
</style>