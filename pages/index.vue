<template lang="pug">
div
  templates-daily-notes(:daily-id='dailyId')
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