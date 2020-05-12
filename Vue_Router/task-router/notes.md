<router-view> za poziciju gdje cemo routat u aplikaciji.
U mainu namistit:
Vue.use(VueRouter);

Gdje je routes importane rute iz nekog filea.
const router = new VueRouter({
  routes // routes: routes
});
new Vue({
  el: "#app",
  router, //router: router
  render: h => h(App)
});

U URL-u se dodaje # automatski, VUe-router to koristi defaultno.
Ako je obicni URL bez #, onda se svi requesti salju serveru na enteru.
Al mi zelimo nase rute handlat na lokalnoj stranici pomocu komponenti i ruta.
Da bi makli # mora se uvik vratit index.js.
To cemo napravit sa mode: "history", default je hash.

href salje request na server uvijek, nama to ne treba, pa Vue daje
<router-link to="/"> gdje to oznacava sta se nadodaje na osnovno ime.
Sa :to="" mozemo dinamicki postaviti vrijednost routera.

Na klik rute dodaje se klasa router-active, nju koristimo za visibitity routing.
Router koristi event vlastiti koji slusa klik event i routa lokalno.

Router-link dodaje <a> tag na unutarnje elemente.
Kako bi koristili listu recimo, mozemo je vani staviti, al onda je problem sa routing visibitity,
jer se klasa router-active dodaje na <a> tag, a mi recimo zelimo listu <li>
tada dodajemo property tag="li" u router-link, a <a> vlastorucno stavljamo unutar router-linka <a>Home</a>.
Kako bi override-ali aktivnu klasu, odnosno umjesto da se stavi router-list-active klasa,
stavi se nasa. To se napravi dodavanjem property-a active-class="nasaKlasa".

Problem koji se stvara je da su sve adrese sa /, a obzirom na to, nasa "active" klasa misli da je i home aktivna kad nije.
To je dobro ako zelimo imati /user/user-personal..., pa da user ostane aktivan. Al to nije uvik slucaj.
Za to dodajemo exact prop na onaj koji ne zelimo da se nasljedi, vec mora imati full path tocan.

Ako zelimo recimo da se nakon nekog dogadaja cekanja ili slicno dogodi routanje,
tada cemo napraviti u metodi:
this.$router.push(); //$ znaci da je neka vanjska varijabla(dio vue-a)
Push se koristi da bi nam history radio kako spada, odnosno da mozemo ic nazad i naprid i da zapamti da smo bili tu.
Pogledati User.vue za to, gdje je dan primjer. Botun se moze napravit i s router-linkom, al ovo je da bi bio primjer realiziran.

Za dinamicki path radimo tako da na path="/user/:id", gdje je id nas podatak.

this.$route.params.id -> za pristup ruti sa $route, parametri, id.
Obzirom da imamo samo id koji saljemo mozemo ovako.

Ako imamo vise ljudi koji su na id, moramo pazit jer taj dio ce se minjat u ruti,
ali se nece update-at komponenta. Jer Vue ne vidi to kao novu komponentu.
Zato koristimo:
watch: {
    $route(to, from) {
      this.id = to.params.id;
    }
  }
Koji sada prati $route funkciju, koja prima 2 argumenta, to i from, gdje je nama bitno da update-amo stranicu,
obzirom da se id trebao promjenit, pa prosljedimo this.id = to.params.id.

Moze se i sa computed napravit, al ovdje mozemo sad izvrsit jos koda.

Od novije verzije Vue-a mozemo koristit u ruti definiran props: gdje mozemo poslat nista, parametar, ili dinamicki paramentar.

To napravimo tako da u ruti postavimo recimo props: true, ako zelimo slat :id parametar,
a u komponenti gdje koristimo stavimo props: ["nasProp"], koji sada prati Vue i sam upatea.

Ako zelimo imati listu koju cemo routat, onda koristimo:
{ path: "/user", component: User, children: [{path: ""}]}
PAZI! Ako na path ovdje stavimo /, onda se cili path prije brise i stavlja se na pocetni path/1 recimo, mice se user.
Ako se stavi bez, onda ostaje path/user1 recimo.

Kada radimo sa children rutama, one se nece renderat u primarnom router-view-u. Za njih treba napravim u prvom parentu novi router-view.

Jedan nacin za dinamicki stavit dio rute je:

:to="'/user' + $route.params.id + '/edit'"

Drugi nacin je pomocu named path. Stavimo u path name: "ime" i onda pozivamo se na njega.

:to="{ name: 'userEdit', params: { id: $route.params.id }}"

Query parametri:

Za query parametre mozemo hardkoridat ? u putanji ili postavit u :to="query: {n:'', q: 100}"
Mozemo redati atribute, oni se odvajaju s & u urlu.

Da bi pristupili ovim podatcima mozemo napravit s $route.query.imeParametra.
Ovo prati vrijednosti sa urla i ako se promeni url, stranica se reloada.

Ako se koriste linkovi koji ne uniste stranicu, nema loada, onda mora se stavit watcher.

Moguce je imenovat i router-view, ne samo linkove.
Tada u rutama ne stavljamo component: nego components: koji je objekt, koji ima default: za ono sto se uvik prikazuje, i ostale imenovane.
Kada zelimo imati neki drugaciji layout na ruti, jer se moze isti element premjestit.


Ako user unese bilo koju rutu moramo se pobrinit da redirectamo.
Postavimo neku rutu kojom cemo ga preusmjerit:
  { path: "/redirect-me", redirect: { name: "home" } } // Moze biti redirect: "string"

Ali ako zelimo sa bilo koje rute redirect napravimo opet novu rutu,
a za path postavimo samo *.
  { path: "*", redirect: "/" }
On hvata bilo koji url koji ne koristimo.


Tranzicija u routeru, samo umotat router-view u <transition>


Ako zelimo prebacit stranicu na neki dio te stranice koristimo #...
Tada stavimo u link :to odakle skacemo vec prema toj stranici:
hash: "#data"
Potrebno je onda stavit u main.js u routeru:
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

Ta metoda prima 3 argumenta to, from, savedPosition.
to je prop koji nosi vrijednosti koje propustamo na odredistu, ukljucujuci i ovaj nas hash,
from samo obratno, a savedPosition je tu ako se korisnik nalazio na nekom djelu stranice, da mu vratimo tu,
kada ponovno ucita.


Kako bi osigurali da korisnik prode autorizaciju(kada smije uci ili izaci),
koristimo:
//Provjera prije nego se ude na neku rutu, za sve rute
// U main.js
router.beforeEach((to, from, next) => {
  console.log("global beforeEach");
  next(); //Propusta nista, false za abort ili path {putanja}
}); 


Za pojedine rute:
// stavit u rutu pojedinu.
beforeEnter: (to, from, next) => {
          console.log("inside route setup");
          next();
}
Sve ostalo je isto. beforeEnter je funkcija, tako da se moze ovo importat.


Zadnji nacin je u nekoj komponenti ubacit novi lifecycle koji daje router:
  beforeRouteEnter(to, from, next) {
    
    next();
  }
Koji nastavi dalje samo ako next se izvrsi. On se pokrece prije postavljanja komponente,
pa nemamo pristup data ni ostalim propsima tog dijela.
Ako zelimo bas, onda moramo koristit neki prop iz te komponente,
onda passamo callback na next.
next(vm => vm.link) gdje je link dio data().
Propustamo VueModel(vm) instancu komponente i zbog toga imamo pristup.
Tada je to callback koji se pokrece kada se komponenta postavi.

Al ako zelimo napravit provjeru prije nego se postavi komponenta, onda nemamo pristup.

Tada ako ima korisnik prava pristupa, ovisno o nekom podatku koji prosljedimo ucitamo podata sa rute s koje dolazimo ili idemo(to,from),
i onda if else postavimo next(true) ili next(false)


Ako zelimo provjeru prije izlaska, napravimo lifecylce, u toj komponenti iz koje se izlazi.
beforeRouteLeave() {
	next();
}


Lazy loading:

Preko webpacka napravimo:
const User = resolve => {
  require.ensure(["./components/user/User.vue"], () => {
    resolve(require("./components/user/User.vue"));
  } //tu je dodano);
};
Za import. Tada loada samo dio aplikacije koji nam treba.

Ako zelimo ih vise stavit u isti bundle, onda napravimo imenovanje bundla, dodavanjem:
"user"