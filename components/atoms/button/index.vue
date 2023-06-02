<template lang="pug">
button.a-button(@click='$emit("click")') {{ text }}
</template>
<script>
export default {
  name: 'AtomsButton',
  props: {
    text: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.a-button {
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  border: 1px double #fff;
}
</style>