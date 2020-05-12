import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";

//vue-http-server-52915 baza
// za http request pomocu this.$http
// pocetna adresa je imala data.json na kraju al smo to prebacili na resource dio,
// pa smo uklonili to odavde i lokalno za svaku dodali na "data.json".
Vue.use(VueResource);
Vue.http.options.root = "https://vue-http-server-52915.firebaseio.com/";
Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if (request.method == "POST") request.method = "PUT";
  next(response => {
    response.json = () => {
      return { messages: response.body };
    };
  });
});
new Vue({
  el: "#app",
  render: h => h(App)
});
