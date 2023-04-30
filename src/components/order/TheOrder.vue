<template>
  <base-page>
    <base-card class="main-wrapper">
      <h2>Thanks for you order!</h2>
      <!-- timer -->
      <div class="delivery" v-if="!delivered">
        <p>Your order will be delivered in:</p>
        <div class="time">
          <p>{{ deliveryTimeString }}</p>
        </div>
      </div>
      <div class="delivered" v-else>
        <p>Your order has been delivered!</p>
      </div>


      <hr />
      <base-button type="button" look="primary" @click="handleReset"
        >Reset Order</base-button
      >
    </base-card>
  </base-page>
</template>

<script>

export default {
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    deliveryTime() {
      if (localStorage.deliveryTime) {
        return localStorage.deliveryTime;
      }
      return this.$store.getters.deliveryTime;
    },
    delivered(){
      return this.deliveryTime - new Date().getTime() <= 0;
    }, 
    deliveryTimeString(){
      return new Date(+this.deliveryTime).toLocaleString("en-US", {day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric"});
    }
  },
  methods: {
    handleReset() {
      this.$store.dispatch("reset");
      this.$router.push("/");
    },
  },
  mounted() {
    localStorage.deliveryTime = this.$store.getters.deliveryTime;
    console.log(this.deliveryTime)
  },
  
};
</script>

<style scoped>
.main-wrapper {
  width: 95%;
  max-width: 1000px;
  margin: 10px auto;
  padding: 5px 0px;
}

.main-wrapper h2 {
  margin: 5px;
  text-align: center;
}

.main-wrapper button {
  width: 160px;
  margin: 10px auto;
  font-size: 1.1em;
}

.delivery {
  margin: 30px auto;

  text-align: center;
}

.time {
  width: 60%;
  margin: 0px auto;
  border: 1px solid var(--primary-accent1);
  border-radius: 5px;

  font-size: 1.5em;
}

.time p {
  margin: 5px auto;
}

.delivered {
  text-align: center;
  color: green;
  font-size: 1.3em;
}
</style>
