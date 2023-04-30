<template>
  <base-page>
    <base-card class="main">
      <h2 class="header">Account Information</h2>

      <div class="info-wrapper">
        <div class="info-item">
          <p class="info-item-label">Name:</p>
          <p class="info-item-value">{{ userData.name }}</p>
        </div>

        <div class="info-item">
          <p class="info-item-label">Last Name:</p>
          <p class="info-item-value">{{ userData.lastName }}</p>
        </div>

        <div class="info-item">
          <p class="info-item-label">Email:</p>
          <p class="info-item-value">{{ userData.email }}</p>
        </div>

        <div class="info-item">
          <p class="info-item-label">Address:</p>
          <p class="info-item-value">{{ userData.address }}</p>
        </div>
      </div>

      <base-button
        class="button-logout"
        @click="signoutHandler"
        type="button"
        look="primary"
      >
        Sign out
      </base-button>

      <teleport to="body">

        <base-modal
          v-if="modalShown"
          header="Signing out"
          message="Are you sure you want to sign out?"
          cancelText="Cancel"
          confirmText="Sign out"
          @cancel="cancelHandler"
          @confirm="confirmHandler"
        ></base-modal>

      </teleport>


    </base-card>
  </base-page>
</template>

<script>
export default {
  data() {
    return {
      modalShown: false,
    };
  },
  computed: {
    userData() {
      return {
        name: localStorage.name,
        lastName: localStorage.lastName,
        email: localStorage.email,
        password: localStorage.password,
        address: localStorage.address,
      };
    },
  },
  methods: {
    signoutHandler() {
      this.modalShown = true;
    },
    cancelHandler() {
      this.modalShown = false;
    },
    confirmHandler() {
      this.modalShown = false;
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  }
};
</script>

<style scoped>
.main {
  width: 95%;
  max-width: 1200px;
  margin: 60px auto 0px;
  padding: 5px;
}

.header {
  text-align: center;
}

.info-wrapper {
  width: 50%;
  margin: auto;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  /* background-color: rgb(94, 94, 172); */
}

.info-item {
  display: flex;
  justify-content: flex-start;
  font-size: 1.1em;
}

.info-item-label {
  flex-basis: 50%;
}

.button-logout {
  width: 100px;
  font-size: 1em;
  margin: 20px auto;
}
</style>
