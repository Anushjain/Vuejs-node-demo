import Vuex from 'vuex'
import Vue from 'vue'
import authModule from './modules/auth/index.js';
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: authModule
  }
});

export default store;