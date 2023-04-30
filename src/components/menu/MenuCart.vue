<template>
<button :class="[`cart-container`, {animation: animated}]" @click="handleCartClick">
  <i className="fa-solid fa-cart-shopping"></i>
  <div class="cart-number"> {{ $store.getters.numberOrdered }}</div>
</button>

<teleport to="body" v-if="modalShown">
  <MenuCartModal :menu="importedMenu" :onClose="handleModalClose" />
</teleport>

</template>


<script>
import {menu} from "../../store/products.js";
import MenuCartModal from "./MenuCartModal.vue";

export default {
  components: {
    MenuCartModal,
  },
  data(){
    return {
      importedMenu: menu, 
      modalShown: false,
      animated: false,
    }
  }, 
  methods: {
    handleCartClick(){
      this.modalShown = true;
    }, 
    handleModalClose(){
      this.modalShown = false;
    }
  },
  computed:{
    amount(){
      return this.$store.getters.numberOrdered;
    }
  },
  watch: {
    amount(){
      if(this.amount > 0){
        this.animated = true;
        setTimeout(() => {
          this.animated = false;
        }, 500);
      }
    }
  }
}
</script>


<style scoped>
.cart-container{
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: var(--primary-accent1);

  position: fixed;
  bottom: 20px;
  right: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.4em;
  color: var(--secondary-accent1);

  cursor: pointer;
  transition-property: background-color, color, transform;
  transition-duration: 50ms;
}

.cart-container:hover{
background-color: var(--primary-accent2);
}

.cart-container:active{
  background-color: var(--primary-accent3);
  transform: scale(0.95);
}


.cart-number{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--primary-text-error1);

  position: absolute;
  top: -13px;
  right: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.75em;
}

.animation{
  animation: 300ms ease-in-out bounce;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.9);
  }
  30% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
  



</style>























