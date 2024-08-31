<template lang="pug">
.a-ogp-card
  img.a-ogp-card__image(:src='ogp.image')
  .a-ogp-card__content
    .a-ogp-card__title {{ ogp.title }}
    .a-ogp-card__description {{ ogp.description }}


</template>

<script>
import { Ogp } from '~/models/ogp'
export default {
  name: 'AtomsOgpCard',
  props: {
    ogp: {
      type: Ogp,
      default: () => new Ogp(),
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
.a-ogp-card {
  display: flex;
  gap: 15px;

  &__image {
    border-radius: 5px;
    height: 90px;
    object-fit: cover;
    width: 90px;
  }

  &__content {
    flex-grow: 1;
    overflow: hidden;
  }

  &__title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__description {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>
