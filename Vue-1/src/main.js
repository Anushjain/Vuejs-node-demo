import Vue from 'vue';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';

import store from './store/index';
import vuetify from './plugins/vuetify';

Vue.use(VueCookies);

Vue.config.productionTip = false;

const newLocal = '#app';
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount(newLocal);
