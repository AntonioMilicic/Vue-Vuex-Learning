import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import { routes } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes, // routes: routes
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    // ovo je za # skakanje po stranici, da zapravo skoci, kada udemo na stranicu
    // return { x: 0, y: 700 }; za skocit na neku lokaciju koju zelimo, al defaultno
    // drugi nacin je sa selekterom.
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  console.log("global beforeEach");
  next(); //Propusta nista, false za abort ili path {putanja}
}); //Provjera prije nego se ude na neku rutu

new Vue({
  el: "#app",
  router, //router: router
  render: h => h(App)
});
