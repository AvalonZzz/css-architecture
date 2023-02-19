<template>
  <section class="c-layout" :class="{ 'c-layout--horizontal': horizontal }">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'CLayout'
}
</script>
<script setup>
const props = defineProps(['horizontal'])
console.log(props)
</script>

<style lang="scss" scoped>
@include b(c-layout) {
  display: flex;
  flex-direction: column;
  @include m(horizontal) {
    flex-direction: row;
  }
}
</style>
