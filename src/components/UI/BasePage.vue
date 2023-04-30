<template>
<div :class="[`page`, className]">
  <slot></slot>
</div>
</template>

<script>
export default {
  props: ["className"]
}
</script>

<style scoped>
.page{
  width: 100%;
  min-height: calc(100vh - var(--header-height));
  margin-top: var(--header-height);
  padding-top: 5px; 
  background-color: var(--bg5);
  box-sizing: border-box;
}

</style>