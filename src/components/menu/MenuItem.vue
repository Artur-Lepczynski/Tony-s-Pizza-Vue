<template>
  <div class="main-wrapper">
    <img alt="food image" :src="url" />
    <div class="menu-text">
      <h3>{{ name }} - ${{ price }}</h3>
      <p>{{ description }}</p>
    </div>
    <div class="menu-controls">
      <input
        type="number"
        min="0"
        max="5"
        :value="quantity"
        @change="handleQuantityChange"
      />
      <div class="menu-buttons">
        <base-button type="button" look="secondary" @click="handleMinusClick"
          >-</base-button
        >
        <base-button type="button" look="primary" @click="handleAddClick"
          >+</base-button
        >
      </div>
      <base-button
        class="button-add"
        type="button"
        look="primary"
        @click="handleAddToCart"
      >
        Add</base-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0,
    };
  },
  props: ["id", "name", "description", "price", "url"],
  methods: {
    handleQuantityChange(event) {
      const value = event.target.value;
      if (value < 0 || value > 5 || value === "") {
        this.quantity = 0;
        return;
      }
      this.quantity = Number.parseInt(event.target.value);
    },
    handleAddClick() {
      if (this.quantity < 5) {
        this.quantity++;
      }
    },
    handleMinusClick() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
    handleAddToCart(){
      if(this.quantity === 0) return; 
      this.$store.dispatch("addItem", {id: this.id, quantity: this.quantity});
      this.quantity = 0;
    }
  },
};
</script>

<style scoped>
.main-wrapper {
  margin: 20px 10px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  display: flex;
}

.main-wrapper img {
  height: 150px;
}

.menu-text {
  padding-left: 15px;
  /* background-color: rgb(148, 81, 81); */
  flex: 1 1 auto;
}

.menu-controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-wrapper input {
  width: 50%;
  height: 15px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}

.main-wrapper input:focus {
  outline: 1px solid var(--primary-accent1);
}

.menu-buttons {
  width: 75%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
}

.menu-buttons button {
  font-family: Lato;
  height: 30px;
}

.button-add {
  width: 45%;
  margin: 10px auto 0px;
  font-family: Lato;
}
</style>
