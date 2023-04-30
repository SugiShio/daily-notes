<template lang="pug">
.p-index
  templates-daily-notes
</template>

<script>
const dateObject = new Date()
const year = dateObject.getFullYear()
const month = dateObject.getMonth() + 1
const date = dateObject.getDate()
const dailyId = `${year}${`0${month}`.slice(-2)}${`0${date}`.slice(-2)}`

export default {
  name: 'PagesIndex',
  data() {
    return {
      dailyId,
    }
  },
}
</script>

<style lang="scss" scoped>
.p-index {
  padding: 0 20px;
}
</style>