import Vue from "vue";
import pApp from "./pApp.vue";

Vue.filter("letterCount", value => {
  return value + " " + "(" + value.length + ")";
});

Vue.mixin({
  created() {
    console.log("Global mixin");
  }
});

new Vue({
  el: "#app",
  render: h => h(pApp)
});
