<template>
  <div class="c-box-center" font-tertiary>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CBoxCenter'
}
</script>

<script setup>
const props = defineProps({
  text: {
    type: String,
    require: true
  }
})
console.log(props)
</script>

<style lang="scss" scoped>
@include b(c-box-center) {
  @include box-center;
}
</style>
