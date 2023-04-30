<template>
  <base-card class="main-wrapper">
    <h2 ref="menuCategory">{{ category }}</h2>
    <p class="category-description">{{ description }}</p>
    <div class="category-items">
      <!-- da items  -->
      <MenuItem
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :description="item.description"
        :price="item.price"
        :url="item.imgUrl"
      />
    </div>
  </base-card>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  components: {
    MenuItem,
  },
  props: ["category", "description", "items"],
};
</script>

<style scoped>
.main-wrapper {
  width: 95%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 5px;
  box-sizing: border-box;
}

.main-wrapper h2 {
  text-align: center;
  margin: 5px auto;
  text-transform: capitalize;
  position: relative;
}

.main-wrapper h2::after {
  content: "";
  width: 42%;
  height: 2px;
  background-color: var(--primary-accent1);
  position: absolute;
  right: 10px;
  top: 15px;
}

.main-wrapper h2::before {
  content: "";
  width: 42%;
  height: 2px;
  background-color: var(--primary-accent1);
  position: absolute;
  left: 10px;
  top: 15px;
}

.category-description {
  margin: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
}
</style>
