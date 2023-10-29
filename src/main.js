import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import store from './store'

import components from '@/components/components.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const app = createApp(App);

components.forEach((component) => {
    app.component(component.name, component);
})

app
    .use(store)
    .use(router)
    .mount('#app')
