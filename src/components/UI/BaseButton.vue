<template>
  <button
    v-if="type === `button`"
    :class="[
      `button`,
      { primary: look === `primary`, secondary: look === `secondary`, disabled: disabled },
      className,
    ]"
    @click="onClick"
    :disabled="disabled"
  >
  <slot></slot>
  </button>
  <router-link v-else-if="type === `link`" :to="to"
  :class="[`button`, { primary: look === `primary`, secondary: look === `secondary`, disabled: disabled }, className]"
  >
  <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ["type", "look", "disabled", "className", "onClick", "to"],
};
</script>

<style scoped>
.button {
  min-width: 50px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: background-color, color, transform;
  transition-duration: 100ms;

  cursor: pointer;
  font-family: Lato;
}

.button:active:not(:disabled) {
  transform: scale(0.95);
}

.primary {
  background-color: var(--primary-accent1);
  color: var(--primary-text1);
}

.primary:hover {
  background-color: var(--primary-accent2);
  color: var(--secondary-text1);
}

.primary:active {
  background-color: var(--primary-accent3);
}

.secondary {
  background-color: var(--secondary-accent1);
  color: var(--primary-text1);
}

.secondary:hover {
  background-color: var(--secondary-accent2);
}

.secondary:active {
  background-color: var(--secondary-accent3);
}

.button:disabled {
  cursor: not-allowed;
  background-color: var(--secondary-accent2);
  color: var(--secondary-text2);
}
</style>
