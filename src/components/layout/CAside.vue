<template>
  <div class="c-aside">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CAside'
}
</script>
<script lang="ts" setup></script>

<style lang="scss" scoped>
@include b(c-aside) {
  overflow: auto;
  flex-shrink: 0;
}
</style>
