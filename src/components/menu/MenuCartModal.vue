<template>
  <div class="modal-wrapper">
    <base-card class="modal">
      <div class="modal-header">
        <h2>Your Cart</h2>
      </div>

      <div class="modal-items">
        <p class="modal-empty" v-if="orderedItems.length === 0">
          Your cart is empty!
        </p>
        <MenuCartModalItem
          v-else
          v-for="item in orderedItems"
          :key="item.id"
          :item="item"
        />
      </div>

      <div class="modal-footer">
        <div class="modal-total">
          <span>Total</span>
          <span>${{ $store.getters.priceTotal }}</span>
        </div>

        <div class="modal-actions">
          <base-button type="button" look="secondary" @click="onClose"
            >Cancel</base-button
          >
          <base-button
            type="button"
            look="primary"
            :disabled="orderedItems.length === 0"
            @click="handleOrder"
            >Checkout</base-button
          >
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import MenuCartModalItem from "./MenuCartModalItem.vue";
export default {
  components: {
    MenuCartModalItem,
  },
  props: ["menu", "onClose"],
  methods: {
    handleOrder(){
      this.onClose(); 
      this.$router.push("/checkout");
    }
  },
  computed: {
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
.modal-wrapper {
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

@keyframes appear-backdrop {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.modal {
  width: 95%;
  max-width: 800px;
}

.modal-header h2 {
  text-align: center;
}

.modal-items {
  max-height: 440px;
  overflow-y: auto;
}

.modal-empty {
  text-align: center;
  font-size: 1.2em;
  margin: 10px;
}

.modal-footer {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-total {
  font-size: 1.4em;
  margin: 5px 10px;

  display: flex;
  justify-content: space-between;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 5px 10px;
}

.modal-actions button {
  width: 80px;
  margin-left: 10px;
  font-size: 1em;
}
</style>
