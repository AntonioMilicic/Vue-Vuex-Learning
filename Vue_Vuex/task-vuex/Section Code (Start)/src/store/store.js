import Vue from "vue";
import Vuex from "vuex";
import counter from "./modules/counter";
import * as actions from "./actions";
import * as mutations from "./mutations";
import * as getters from "./getters";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    value: 0
  },
  getters,
  // getters: {
  //   value: state => {
  //     return state.value;
  //   }
  // },
  mutations,
  // mutations: {
  //   updateValue: (state, payload) => {
  //     state.value = payload;
  //   }
  // },
  actions,
  modules: {
    counter
    // counter: {namespaced: true}
    // Novi vuex namespace za unique namespaceing
    // onda ce se u metodama i computed gdje se pozivaju raditi
    // ...mapActions("counter", ["doSomething"])
    // koji je zapravo definiran kao
    // map this.doSomething() to this.$store.dispatch("counter/doSomething")
  }
});
