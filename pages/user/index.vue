<template lang="pug">
.p-user
  atoms-button(text='Signout', outline @click='signout')
</template>

<script>
export default {
  name: 'PagesUser',
  methods: {
    async signout() {
      await this.$store.dispatch('signout')
      this.$router.push({ name: 'index' })
    },
  },
}
</script>
