<template>
  <main class="c-main">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'CMain'
}
</script>
<script setup></script>

<style lang="scss" scoped>
@include b(c-main) {
  overflow: auto;
  flex: 1;
}
</style>
