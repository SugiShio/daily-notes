<template lang="pug">
ul.a-input-image
  li.a-input-image__image-item(v-for='(src, index) in images')
    button.a-input-image__button-delete(@click='onDeleteClicked(index)')
      i.el-icon-close
    img.a-input-image__image(:src='src')
  li.a-input-image__image-item(v-if='addable')
    label.a-input-image__add(:style='style')
      input.a-input-image__input(
        type='file',
        accept='image/*',
        @input='addFile'
      )
      i.a-input-image__button-icon.el-icon-picture-outline
      span.a-input-image__button-text Add photo
</template>

<script>
export default {
  name: 'AtomsInputImage',
  props: {
    originalFiles: { type: Array, default: () => [] },
    max: { type: Number, default: undefined },
  },
  data() {
    return {
      files: [],
      srcs: [],
    }
  },
  computed: {
    addable() {
      return this.max === undefined || this.srcs.length < this.max
    },
    images() {
      return [...this.originalFiles, ...this.srcs]
    },
    style() {
      const colorConfig = this.$store.state.colorConfig || {}
      return {
        borderColor: colorConfig.mainDark,
        color: colorConfig.mainDark,
      }
    },
  },
  methods: {
    addFile($event) {
      const file = $event.target.files[0]
      this.$emit('input', file)
      this.files.push(file)
      const reader = new FileReader()
      reader.onload = (_) => {
        this.srcs.push(reader.result)
      }
      reader.readAsDataURL(file)
    },
    onDeleteClicked(index) {
      if (index >= this.originalFiles.length) {
        this.srcs.splice(index - this.originalFiles.length, 1)
      }
      this.$emit('delete-clicked', index)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
.a-input-image {
  display: flex;
  margin: -5px;
  flex-wrap: wrap;

  &__input {
    display: none;
  }

  &__image-item {
    padding: 5px;
    position: relative;
  }

  &__image {
    border-radius: 5px;
    height: 100px;
    object-fit: cover;
    width: 100px;
  }

  &__add {
    align-items: center;
    border: 1px dashed;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 98px;
    justify-content: center;
    width: 98px;
  }

  &__button-icon {
    font-size: 20px;
  }

  &__button-text {
    font-size: 8px;
    text-align: center;
    margin-top: 5px;
  }

  &__button-delete {
    border-radius: 10px;
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 3px;
    line-height: 1;
    font-size: 11px;
    background-color: $color-text;
    color: #fff;
  }
}
</style>
