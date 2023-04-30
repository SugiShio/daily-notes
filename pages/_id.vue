<template lang="pug">
.p-id
  templates-daily-notes(:daily-id='dailyId')
</template>

<script>
export default {
  name: 'PagesId',
  validate({ params }) {
    return /^\d{8}$/.test(params.id)
  },
  data() {
    return {
      dailyId: this.$route.params.id,
    }
  },
}
</script>

<style lang="scss" scoped>
.p-id {
  padding: 0 20px;
}
</style>