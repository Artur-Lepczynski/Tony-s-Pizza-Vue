<!-- eslint-disable vue/no-parsing-error -->
<template>
  <base-page className="main">
    <main>
      <img class="banner" src="../../images/banner.jpg" alt="" />
      <base-card class="order">
        <h2>
          {{ $store.state.ordered ? "Start a new order" : "Begin your order" }}
        </h2>
        <input type="text" v-model="enteredAddress" @blur="addressBlur" placeholder="Enter address..."/>
        <p v-if="!enteredAddressInputValid" class="text-invalid">
          Address should be at least 7 characters long
        </p>
        <base-button
          type="button"
          look="primary"
          :disabled="!enteredAddressValid"
          @click="handleOrder"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </base-button>
      </base-card>
    </main>

    <base-card className="description">
      <h2>Why choose us?</h2>
      <div class="description-item">
        <i className="fa-solid fa-pizza-slice"></i>
        <div>
          <h3>Best quality</h3>
          <p>
            Satisfy your cravings with Tony's Pizza! Our handmade pizzas are
            crafted with the freshest ingredients and baked to perfection,
            ensuring that every slice is packed with flavor. From classic
            toppings to gourmet combinations, we've got something for everyone.
            Don't settle for ordinary pizza. Experience the difference with
            Tony's.
          </p>
        </div>
      </div>

      <div class="description-item">
        <i className="fa-solid fa-pizza-slice"></i>
        <div>
          <h3>Fast delivery</h3>
            <p>
              Hungry and in a hurry? No problem! Tony's Pizza has you covered.
              Our lightning-fast delivery service ensures that your hot, fresh
              pizza arrives at your doorstep in no time. Our drivers are
              friendly and efficient, so you can enjoy your pizza without the
              wait. Order now and taste the difference with Tony's Pizza.
            </p>
        </div>
      </div>

      <div class="description-item">
        <i className="fa-solid fa-pizza-slice"></i>
        <div>
          <h3>Affordable prices</h3>
            <p>
              At Tony's Pizza, we believe that great pizza shouldn't break the
              bank. That's why we offer affordable prices without sacrificing
              quality. Our handmade pizzas are made with the freshest
              ingredients, so you can indulge in the most delicious pizza
              without hurting your wallet. With our great deals and specials,
              there's never been a better time to enjoy Tony's Pizza. Order now
              and taste the value for yourself.
            </p>
        </div>
      </div>
    </base-card>
  </base-page>
</template>

<script>
export default {
  data() {
    return {
      enteredAddress: localStorage.deliveryAddress || localStorage.address || "",
      enteredAddressTouched: false,
    };
  },
  methods: {
    addressBlur() {
      this.enteredAddressTouched = true;
    },
    handleOrder() {
      if (this.$store.state.ordered) {
        this.$store.dispatch("reset");
      }
      localStorage.deliveryAddress = this.enteredAddress;
      this.$router.push("/menu");
    },
  },
  computed: {
    enteredAddressValid() {
      return this.enteredAddress.length > 6;
    },
    enteredAddressInputValid() {
      return this.enteredAddressValid || !this.enteredAddressTouched;
    },
  },
};
</script>

<style scoped>
.main {
  position: relative;
  padding-bottom: 5px;
}

.banner {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transform: translateY(-5px);
  position: absolute;
  top: 0px;
}

.order {
  width: 95%;
  max-width: 500px;
  height: 200px;
  margin: 180px auto 50px;
  padding: 5px;
  box-sizing: border-box;
}

.order form {
  height: 90%;
  position: relative;
}

.order h2 {
  text-align: center;
}

.order input {
  width: 90%;
  height: 25px;
  margin: 20px auto 5px;

  border: 1px solid black;
  border-radius: 5px;

  display: block;
}

.order input:focus {
  outline: 1px solid var(--primary-accent1);
}

.order button {
  width: 50px;
  height: 50px;
  margin: 5px auto;
  border-radius: 50%;
  font-size: 1.1em;

  position: absolute;
  left: calc(50% - 25px);
  bottom: 10px;
}

.text-invalid {
  text-align: center;
  margin: 0px;
  font-size: 0.8em;
  color: var(--primary-text-error1);
}

.description {
  width: 95%;
  max-width: 1000px;
  margin: 0px auto 40px;
  padding: 10px;
  box-sizing: border-box;
}

.description h2 {
  text-align: center;
}

.description-item {
  min-height: 150px;
  margin: 20px 0px;
  padding-right: 5px;
  border: 2px solid var(--primary-accent1);
  border-radius: 5px;
  display: flex;
}

.description-item div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.description-item i {
  flex-basis: 130px;
  /* background-color: rgb(63, 55, 120);*/
  color: var(--primary-accent1);
  text-align: center;
  font-size: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.description-item h3 {
  margin: 15px 0px 10px;
}
</style>
