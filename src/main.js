import { createApp } from 'vue'
import App from './App.vue'

//router
import router from './router'

//store 
import store from "./store/store.js"

//UI components
import BaseButton from './components/UI/BaseButton.vue'
import BaseCard from './components/UI/BaseCard.vue'
import BasePage from './components/UI/BasePage.vue'
import BaseModal from './components/UI/BaseModal.vue'

const app = createApp(App)

app.use(router); 
app.use(store);


app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-page", BasePage);
app.component("base-modal", BaseModal);


app.mount('#app');
