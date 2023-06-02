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
@import '~/assets/stylesheets/variables';

.a-button {
  text-align: center;
  padding: 5px 15px;
  border-radius: 8px;
  background-color: #fff;
  color: $color-main;
}
</style>