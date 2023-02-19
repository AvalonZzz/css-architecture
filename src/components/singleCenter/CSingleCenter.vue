<template>
  <div class="c-single-center">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CSingleCenter'
}
</script>
<script setup></script>

<style lang="scss" scoped>
@include b(c-single-center) {
  @include grid($align-items: center);
}
</style>
