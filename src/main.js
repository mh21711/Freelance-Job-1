import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// default options config: { expires: '1d', path: '/', domain: '', secure: '', sameSite: 'Lax' }
// import bootstrap 5 css
import "bootstrap/dist/css/bootstrap.css";
// sweet alert 2 css
// sweet alert 2 css files
import "sweetalert2/dist/sweetalert2.min.css";

// create app
const app = createApp(App);

// import bootstrab 5 js
import "bootstrap/dist/js/bootstrap.js";
// sweet alert 2 js files

app.use(createPinia());
app.use(router);

app.mount("#app");
