<template lang="pug">
div
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