/* eslint-disable no-unused-vars */
import { createStore } from "vuex";
import { menu } from "./products";

function financial(x) {
  return Number.parseFloat(x.toFixed(2));
}

//auth store:
const authStore = {
  state() {
    return {
      token: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
    },
  },
  actions: {
    login(context, payload) {
      context.dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },
    signup(context, payload) {
      context.dispatch("auth", {
        ...payload,
        mode: "signup",
      });
    },
    logout(context) {
      delete localStorage.token;

      delete localStorage.email;
      delete localStorage.password;
      delete localStorage.name;
      delete localStorage.lastName;
      delete localStorage.address;

      context.commit("setUser", {
        token: null,
      });
    },
    auth(context, payload) {
      // const mode = payload.mode;

      //łączenie z backendem w celu pobrania tokenu (i rejestracji w przypadku trybu "signup"),
      // i zapisanie go w vuex i localstorage
      // let url =
      //   "http://localhost:8080/login";

      // if (mode === "signup") {
      //   url =
      //     "http://localhost:8080/signup";
      // }

      // const response = await fetch(url, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     email: payload.email,
      //     password: payload.password,
      //     returnSecureToken: true,
      //   }),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   console.log(data);
      //   const error = new Error(data.message || "failed to auth");
      //   throw error;
      // }

      const token = "token" + Math.random();

      localStorage.email = payload.email;
      localStorage.password = payload.password;
      localStorage.name = payload.name || "User";
      localStorage.lastName = payload.lastName || "Last Name";
      localStorage.address = payload.address || "Address";

      localStorage.token = token;

      context.commit("setUser", {
        token: token,
      });
    },
    tryLogin(contetxt){
      //proba zalogowania sie podczas odwiezania strony
      //aby użytkownik nie był wylogowywany przy każdym odświeżeniu strony
      if(localStorage.token){
        contetxt.commit("setUser", {
          token: localStorage.token,
        });
      }
    }
  },
  getters: {
    token(state){
      return state.token;
    }, 
    isAuthenticated(state){
      return !!state.token;
    }
  }
};

//cart store:
const store = createStore({
  modules: {
    auth: authStore,
  },
  state() {
    return {
      ordered: false,
      paymentMethod: "",
      priceTotal: 0,
      numberOrdered: 0,
      deliveryTime: null,
      items: [],
    };
  },
  mutations: {
    order(state, payload) {
      state.ordered = true;
      state.paymentMethod = payload.paymentMethod;
      state.deliveryTime = new Date().getTime() + 1000 * 60 * 60 * 0.25;
    },
    reset(state) {
      state.ordered = false;
      state.paymentMethod = "";
      state.deliveryTime = null;
      state.items = [];
      state.priceTotal = 0;
      state.numberOrdered = 0;
    },
    //payload: {id: 1, quantity: 2}
    addItem(state, payload) {
      const orderedCategory = menu.find((category) => {
        return category.items.find((item) => {
          return item.id === payload.id;
        });
      });

      const orderedItem = orderedCategory.items.find((item) => {
        return item.id === payload.id;
      });

      const itemIndex = state.items.findIndex((item) => item.id === payload.id);

      if (itemIndex === -1) {
        state.items.push({
          id: payload.id,
          amount: payload.quantity,
        });
        state.priceTotal = financial(state.priceTotal + orderedItem.price * payload.quantity);
        state.numberOrdered += payload.quantity;
      } else {
        state.items[itemIndex].amount += payload.quantity;
        state.priceTotal = financial(state.priceTotal + orderedItem.price * payload.quantity);
        state.numberOrdered += payload.quantity;
      }
    },
    //payload: {id: 1, quantity: 1}
    removeItem(state, payload) {
      const orderedCategory = menu.find((category) => {
        return category.items.find((item) => {
          return item.id === payload.id;
        });
      });

      const orderedItem = orderedCategory.items.find((item) => {
        return item.id === payload.id;
      });

      const itemIndex = state.items.findIndex((item) => item.id === payload.id);

      if (itemIndex === -1) {
        return;
      } else {
        state.items[itemIndex].amount -= 1; //-1 always
        state.priceTotal = financial(state.priceTotal - orderedItem.price);
        state.numberOrdered -= 1;

        if (state.items[itemIndex].amount <= 0) {
          state.items.splice(itemIndex, 1);
        }
      }
    },
  },
  actions: {
    order(context, payload) {
      context.commit("order", payload);
    },
    reset(context) {
      context.commit("reset");
    },
    addItem(context, payload) {
      context.commit("addItem", payload);
    },
    removeItem(context, payload) {
      context.commit("removeItem", payload);
    },
  },
  getters: {
    ordered(state) {
      return state.ordered;
    },
    paymentMethod(state) {
      return state.paymentMethod;
    },
    deliveryTime(state) {
      return state.deliveryTime;
    },
    items(state) {
      return state.items;
    },
    priceTotal(state) {
      return state.priceTotal;
    },
    numberOrdered(state) {
      return state.numberOrdered;
    },
  },
});

export default store;
