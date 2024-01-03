<template lang="pug">
header.o-header
  organisms-header-search
  nuxt-link.o-header__button(
    :to='{ name: "index" }'
  )
    i.el-icon-date
  nuxt-link.o-header__button(
    v-if='$store.state.isSignin',
    :to='{ name: "user" }'
  )
    i.el-icon-user

  //- button.o-header__button(v-else, type='button', @click='showSigninForm') Signin
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
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;

  &__button {
    cursor: pointer;
    padding: 10px;
    text-decoration: none;
  }
}
</style>
