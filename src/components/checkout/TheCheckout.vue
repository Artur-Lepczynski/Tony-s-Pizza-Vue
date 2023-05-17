<template>
  <base-page class="page">
    <base-card class="wrapper">
      <h2>Checkout</h2>
      <div class="info">
        <div class="user-info">
          <h2>Your Information</h2>
          <div class="user-info-item">
            <p>Name:</p>
            <p>{{ userData.name }}</p>
          </div>
          <div class="user-info-item">
            <p>Last Name:</p>
            <p>{{ userData.lastName }}</p>
          </div>
          <div class="user-info-item">
            <p>Email:</p>
            <p>{{ userData.email }}</p>
          </div>
          <div class="user-info-item">
            <p>Address:</p>
            <p>{{ userData.deliveryAddress }}</p>
          </div>

          <div class="payment">
            <h2>Payment options</h2>
            <div class="payment-item">
              <input
                type="radio"
                name="payment"
                id="cash"
                value="cash"
                v-model="paymentMethod"
                defaultChecked
              />
              <label htmlFor="cash">Cash</label>
            </div>

            <div class="payment-item">
              <input
                type="radio"
                name="payment"
                id="creditCard"
                value="creditCard"
                v-model="paymentMethod"
              />
              <label htmlFor="creditCard">Credit Card</label>
            </div>

            <div class="payment-item">
              <input
                type="radio"
                name="payment"
                id="bitcoin"
                value="bitcoin"
                v-model="paymentMethod"
              />
              <label htmlFor="bitcoin">Bitcoin</label>
            </div>
          </div>
        </div>
        <div class="order-info">
          <h2>Order</h2>

          <div
            class="order-info-item"
            v-for="item in orderedItems"
            :key="item.id"
          >
            <img alt="" :src="item.imgUrl" />
            <div class="order-item-info">
              <h3>{{ item.name }}</h3>
              <span class="item-price">$ {{ item.price }}</span>
              <span class="item-amount">x {{ item.amount }}</span>
            </div>
          </div>

          <div class="order-total">
            <span>Total</span>
            <span>$ {{ $store.getters.priceTotal }}</span>
          </div>
        </div>
      </div>
      <base-button type="button" look="primary" :disabled="orderedItems.length <= 0" @click="handleOrder">Place Order</base-button>
    </base-card>
  </base-page>
</template>

<script>
import {menu} from "../../store/products.js";

export default {
  data() {
    return {
      paymentMethod: "cash",
      menu,
    };
  },
  methods: {
    handleOrder(){
      this.$store.dispatch("order", {paymentMethod: this.paymentMethod});
      this.$router.push("/order");
    }
  },
  computed: {
    userData() {
      return {
        name: localStorage.name || "User",
        lastName: localStorage.lastName || "Last Name",
        email: localStorage.email || "Email address",
        address: localStorage.address || "Address",
        deliveryAddress: localStorage.deliveryAddress || "Delivery Address",
        password: localStorage.password,
      };
    },
    orderedItems() {
      const orderedItems = this.$store.getters.items.map((item) => {
        const orderedCategory = this.menu.find((category) => {
          return category.items.find((categoryItem) => {
            return item.id === categoryItem.id;
          });
        });

        const orderedItem = orderedCategory.items.find((categoryItem) => {
          return item.id === categoryItem.id;
        });

        return {
          amount: item.amount,
          name: orderedItem.name,
          price: orderedItem.price,
          id: item.id,
          imgUrl: orderedItem.imgUrl,
        };
      });

      return orderedItems;
    },
  },
};
</script>

<style scoped>
.page {
  padding: 5px;
}

.wrapper {
  width: 95%;
  max-width: 1000px;
  margin: 30px auto;
  padding: 5px 5px;
}

.wrapper h2 {
  margin: 5px auto;
  text-align: center;
}

.info {
  display: flex;

  position: relative;
}

.info::after {
  content: "";
  width: 2px;
  height: 100%;
  background-color: var(--primary-accent1);
  position: absolute;
  top: 0px;
  left: 50%;
}

.user-info {
  width: 50%;
  padding: 0px 10px;
  box-sizing: border-box;
}

.user-info-item {
  margin: 10px auto;
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 5px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.user-info-item p {
  font-size: 1.1em;
  margin: 10px 10px 10px 0px;
}

.payment-item {
  margin: 10px auto;
  padding: 10px 10px;
  border: 1px solid black;
  border-radius: 5px;
}

.order-info {
  width: 50%;
  padding: 0px 10px;
  box-sizing: border-box;
}

.order-info-item {
  width: 95%;
  height: 80px;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.order-info-item img {
  width: 80px;
  height: 80px;
}

.order-item-info {
  flex: 1 1 auto;
  height: 100px;
  margin-left: 13px;
}

.item-price {
  display: inline-block;
  margin: 0px 10px;
  font-size: 1.05em;
}

.item-amount {
  display: inline-block;
  margin: 0px 10px;
  padding: 5px;
  border: 1px solid var(--primary-accent1);
  border-radius: 5px;
}

.order-total {
  font-size: 1.4em;
  margin: 5px 10px;

  display: flex;
  justify-content: space-between;
}

.wrapper button {
  width: 140px;
  margin: 10px auto;
  font-size: 1em;
}
</style>
