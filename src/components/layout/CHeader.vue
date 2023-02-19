<template>
  <header class="c-header" :class="{ 'c-header--fixed': fixed }">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'CHeader'
}
</script>
<script setup>
const props = defineProps({
  fixed: {
    type: Boolean,
    default: false
  }
})
console.log(props)
</script>

<style lang="scss" scoped>
@include b(c-header) {
  @include m(fixed) {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 10;
  }
}
</style>
