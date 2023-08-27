<template lang="pug">
.t-meal-graph
  atoms-graph(:graph-items='items')
</template>

<script>
export default {
  name: 'TemplatesMealGraph',
  computed: {
    items() {
      return this.$store.state.graph.items
    },
  },
}
</script>