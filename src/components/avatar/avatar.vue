<template>
  <div
    class="c-avatar"
    :class="{ 'c-avatar--vertical': direction === 'vertical' }"
  >
    <img class="c-avatar__img" :src="url" circle />
    <span
      :class="{ 'c-avatar__span--vertical': direction === 'vertical' }"
      class="c-avatar__span"
      :style="'fontSize:' + size"
    >
      <!-- {{ text }} -->
      123
    </span>
  </div>
</template>
<script>
export default {
  name: 'CAvatar',
  props: {
    direction: {
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    },
    url: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 12
    },
    text: {}
  },
  onMounted() {
    console.log(this.text, 123123, '----text')
  }
}
</script>
<style lang="scss" scoped>
@include b(c-avatar) {
  @include box-center($align: center);
  @include m(vertical) {
    flex-direction: column;
  }

  @include e(span) {
    width: 100px;
    display: inline-block;
    @include ellipsis(1);
    @include m(vertical) {
      text-align: center;
    }
  }
}
</style>
