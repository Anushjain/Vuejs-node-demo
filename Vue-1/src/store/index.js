import Vuex from 'vuex';
import Vue from 'vue';
import authModule from '../pages/auth/auth/index';
import appModule from '../pages/home/app/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    app: appModule,
  },
});

export default store;
