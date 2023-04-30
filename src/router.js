/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import MenuPage from "./pages/MenuPage.vue";
import AuthenticationPage from "./pages/AuthenticationPage.vue";
import AccountPage from "./pages/AccountPage.vue";
import CheckoutPage from "./pages/CheckoutPage.vue"
import OrderPage from "./pages/OrderPage.vue"

import store from "./store/store.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/menu", component: MenuPage, beforeEnter: menuAndCheckoutGuard },
    { path: "/auth", component: AuthenticationPage, beforeEnter: authGuard },
    { path: "/account", component: AccountPage, beforeEnter: accountGuard },
    { path: "/checkout", component: CheckoutPage, beforeEnter: menuAndCheckoutGuard},
    { path: "/order", component: OrderPage, beforeEnter: orderGuard},
    { path: "/:notFound(.*)", redirect: "/" },
  ],
});

function orderGuard(to, from, next) {
  if (store.getters.ordered) {
    next();
  } else {
    next("/menu");
  }
}

function menuAndCheckoutGuard(to, from, next) {
  if (store.getters.ordered) {
    next("/order");
  } else {
    next();
  }
}

function authGuard(to, from, next) {
  if (store.getters.isAuthenticated) {
    next("/account");
  } else {
    next();
  }
}

function accountGuard(to, from, next) {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next("/auth?mode=login");
  }
}

export default router;
