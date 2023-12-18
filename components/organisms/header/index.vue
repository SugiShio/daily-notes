<template lang="pug">
header.o-header
  nuxt-link.o-header__button(
    v-if='$store.state.isSignin',
    :to='{ name: "user" }'
  )
    i.o-header__user-icon.el-icon-user

  button.o-header__button(
    v-else,
    type='button',
    @click='showSigninForm'
    ) Signin
</template>

<script>
export default {
  name: 'OrganismsHeader',
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    showSigninForm() {
      this.$store.commit('setTemplateNames', 'templates-signin-form')
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
