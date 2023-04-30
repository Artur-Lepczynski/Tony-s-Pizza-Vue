<template>
  <div class="wrapper">
    <div class="modal">
      <div class="content">
        <h2>{{ header }}</h2>
        <p>{{ message }}</p>
      </div>
      <div class="actions">
        <base-button
          type="button"
          look="secondary"
          class="button"
          @click="onCancel"
          >{{ cancelText }}</base-button
        >
        <base-button
          type="button"
          look="primary"
          class="button"
          @click="onConfirm"
          >{{ confirmText }}</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "header",
    "message",
    "cancelText",
    "onCancel",
    "confirmText",
    "onConfirm",
  ],
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);

  display: flex;
  justify-content: center;
  align-items: center;

  animation: var(--primary-animation-duration) ease-in appear-backdrop;

  font-family: Lato;
}

.modal {
  width: 500px;
  height: 230px;
  background-color: var(--bg3);
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: flex-start; */
  position: relative;
  overflow: hidden;

  animation: var(--primary-animation-duration) ease-in appear-modal;
}

.modal h2 {
  margin: 5px auto;
}

.modal::after {
  content: "";
  height: 100%;
  width: 10px;

  position: absolute;
  left: 0px;
  top: 0px;
  background-color: var(--primary-accent1);
}

.content {
  /* background-color: coral; */
}

.actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  /* background-color: coral; */
}

.button {
  width: 100px;
  margin-left: 15px;
  font-size: 0.95em;
}

@keyframes appear-modal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes appear-backdrop {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
