import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Header from './components/HeaderComponent.vue';
import Footer from './components/FooterComponent.vue';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('HeaderComponent', Header);
app.component('FooterComponent', Footer);

app.mount('#app')
