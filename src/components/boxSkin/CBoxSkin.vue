<template>
  <div
    class="c-box-skin"
    :class="type ? 'c-box-skin--' + type : ''"
    bg-secondary
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CBoxSkin'
}
</script>

<script setup>
const props = defineProps({
  type: {
    validator: function (value) {
      return ['top', 'bottom'].indexOf(value) !== -1
    }
  }
})
console.log(props)
</script>

<style lang="scss" scoped>
@include b(c-box-skin) {
  @include m(top) {
    border-top: $border-base;
  }
  @include m(bottom) {
    border-bottom: $border-base;
  }
}
</style>
