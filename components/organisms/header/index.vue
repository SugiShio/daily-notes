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
</template>

<script>
export default {
  name: 'OrganismsHeader',
  computed: {
    user() {
      return this.$store.state.user
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
