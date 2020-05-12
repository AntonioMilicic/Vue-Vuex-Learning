Koristimo Vue-resource za http requeste i firebase googlov za db.
U mainu importamo koristenje VR-a.
Vue.use(VueResource);
Kako ne bi pisali svako malo cilu adresu mozemo postavit
Vue.http.options.root = "root adresa";
Tada umjesto
this.$http.post("root adresa", this.user).then(...
koristimo
this.$http.post("", this.user).then(...

Interceptor uhvaca request prije nego dode na app ili prije nego ode s njega i onda se moze napraviti nekakav upit dodatni na taj paket.
Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if (request.method == "POST") request.method = "PUT";
  next();
});

next() je prazan ako ne radimo nista dalje. Al ako zelimo recimo sa responseom radit, onda mozemo tu staviti kod.
next(response => {})

this.resource.save({parametri}, data);

{ime}ako zelimo da je node nasa varijabla koja se mjenja.
this.resource = this.$resource("{node}.json", {}, customActions);
I onda u pozivu definiramo sta je ta varijabla zapravo, tj odakle se vuce podatak.
this.resource.getData({ node: this.node });

Da je imao
this.resource = this.$resource("{node}/{another}.json", {}, customActions);
onda bi i u
this.resource.getData({ node: this.node, another: this.another });...