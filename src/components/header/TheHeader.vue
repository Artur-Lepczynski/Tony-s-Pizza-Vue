<template>
  <header class="header">
    <div class="logo-wrapper">
      <img src="../../images/logo.png" alt="logo" />
      <router-link to="/" class="link-home">
        <h1 class="header-name">Tony's Pizza</h1>
      </router-link>
      <base-button
        v-if="$store.state.ordered"
        type="button"
        look="primary"
        class="order-button"
        @click="handleTrackOrder"
        >Track Order</base-button
      >
    </div>
    <nav v-if="$store.getters.isAuthenticated">
      <p>Hello, {{ name }}</p>
      <base-button type="link" look="primary" to="/account" className="account">
        <i className="fa-solid fa-user"></i>
      </base-button>
    </nav>
    <nav v-else>
      <base-button type="link" look="primary" to="/auth?mode=login" className="link">
        Log In
      </base-button>
      <base-button type="link" look="secondary" to="/auth?mode=signup" className="link">
        Sign Up
      </base-button>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleTrackOrder() {
      this.$router.push("/order");
    },
  },
  mounted(){
    console.log("reading name:", localStorage.name)
  }, 
  computed: {
    name(){
      return localStorage.name || "User";
    },  
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: var(--header-height);
  padding: 0 50px;
  border-bottom: 2px solid rgb(71, 71, 71);

  position: fixed;
  top: 0;
  z-index: 10;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  background-color: var(--bg4);
}

.header img {
  height: 80%;
}

.logo-wrapper {
  height: 100%;
  flex-basis: 260px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* background-color: darkgrey; */
}

.link-home {
  color: black;
}

.link-home h1:hover {
  color: red;
}

.header a,
.header a:link,
.header a:visited {
  text-decoration: none;
}

.header-name {
  width: 200px;
  margin: 0;
  font-weight: 300;
}

.order-button {
  width: 100px;
  font-size: 1em;
}

.header nav {
  flex-basis: 240px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: azure; */
}

.link {
  width: 45%;
  margin-left: 15px;
}

.account {
  width: 35%;
  margin-left: 15px;
  font-size: 1.2em;
}
</style>
