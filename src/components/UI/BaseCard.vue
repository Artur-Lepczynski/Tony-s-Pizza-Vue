<template>
<div :class="[`card`, className]">

  <slot></slot>
</div>

</template>

<script>
export default {
  props: ["className"]
}
</script>

<style scoped>
.card{
  /* width: 95%;
  max-width: 1200px; */
  min-width: 300px; 
  min-height: 100px;
  /* margin: auto;
  padding: 10px; */
  border-radius: 5px;
  background-color: var(--bg4);
  color: var(--primary-text1);
  animation: var(--primary-animation-duration) ease-in forwards appear; 
}

@keyframes appear{
  from{
    opacity: 0;
    transform: translateY(20px);
  }

  to{
    opacity: 1;
    transform: translateY(0px);
  }
}

</style>