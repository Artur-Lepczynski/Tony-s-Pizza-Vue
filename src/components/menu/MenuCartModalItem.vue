<template>
  <div class="modal-item">
    <img alt="food item" :src="item.imgUrl">
    <div class="modal-item-info">
      <h3>{{ item.name }}</h3>
      <span class="item-price">${{ item.price }}</span>
      <span class="item-amount">x {{ item.amount }}</span>
    </div>
    <div class="item-actions">
      <base-button type="button" look="primary" @click="handleAdd">+</base-button>
      <base-button type="button" look="secondary" @click="handleRemove">-</base-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    handleAdd(){
      this.$store.dispatch("addItem", {id: this.item.id, quantity: 1}); 
    },
    handleRemove(){
      this.$store.dispatch("removeItem", {id: this.item.id, quantity: 1}); 
    }
  }
};
</script>

<style scoped>
.modal-item {
  width: 95%;
  height: 110px;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.modal-item img {
  width: 100px;
  height: 100px;
}

.modal-item-info {
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

.item-actions {
  height: 100%;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.item-actions button {
  font-size: 1.1em;
}
</style>
