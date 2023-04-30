<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/valid-v-for -->
<template>
  <base-page class="page">
    <div class="menu-header">
      <button @click="handleNavClick(`pizza`)">Pizza</button>
      <button @click="handleNavClick(`sauces`)">Sauces</button>
      <button @click="handleNavClick(`drinks`)">Drinks</button>
      <button @click="handleNavClick(`salads`)">Salads</button>
      <button
        @click="handleNavClick(`desserts`)"
        :style="{ borderRight: `2px solid black` }"
      >
        Desserts
      </button>
    </div>
    <!-- menu categorie -->
    <div class="menu-categories">
      <MenuCategory
        v-for="item in menu"
        :key="item.id"
        :ref="menuRefs.get(item.category)"
        :category="item.category"
        :description="item.description"
        :items="item.items"
      />
    </div>

    <MenuCart/>
    
  </base-page>
</template>

<script>
import MenuCategory from './MenuCategory.vue';
import MenuCart from './MenuCart.vue';
import {menu} from "../../store/products.js"; 

export default {
  data() {
    return {
      menu: menu,
      menuRefs: new Map([
        ["pizza", "pizza"],
        ["sauces", "sauces"],
        ["drinks", "drinks"],
        ["salads", "salads"],
        ["desserts", "desserts"],]),
    };
  },
  components: {
    MenuCategory,
    MenuCart,
  },
  methods: {
    handleNavClick(category) {
      // :)
      const ref = this.$refs[this.menuRefs.get(category)][0].$refs.menuCategory;
      const offsetTop = ref.offsetParent.offsetTop;
      window.scrollTo({behavior: "smooth", top: offsetTop - 160})
    },
  },
};
</script>

<style scoped>
.page {
  padding-bottom: 20px;
}

.menu-header {
  width: 100%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.344);
  backdrop-filter: blur(10px);
  position: fixed;
  top: var(--header-height);
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: var(--primary-animation-duration) ease-in-out slideInFromTop;
}

@keyframes slideInFromTop {
  from {
    top: -50px;
  }
  to {
    top: var(--header-height);
  }
}

.menu-header button {
  height: 100%;
  width: 150px;
  border: none;
  border-left: 2px solid black;
  cursor: pointer;
  font-family: Lato;
  font-size: 1em;
  background-color: var(--primary-accent1);
}

.menu-header button:hover {
  background-color: var(--primary-accent2);
  color: var(--secondary-text1);
}

.menu-header button:active {
  background-color: var(--primary-accent3);
}

.menu-categories {
  margin-top: 80px;
}
</style>
