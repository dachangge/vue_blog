import Vue from 'vue'
import 'babel-polyfill';
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  }
})
