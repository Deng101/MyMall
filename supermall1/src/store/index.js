import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)
const state = {
  cartList: [],
  username: '',
  password: '',
  log_status: true,
  myLocation:[],
  testIndex: null,
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [createPersistedState()],
})
export default store
