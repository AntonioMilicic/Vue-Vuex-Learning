Kreiramo novi folder store, unutar njega js store.js.
Importamo vuex, kojeg moramo dodatno instalirati.

Vue.use(Vuex);

kreiramo novi store new Vuex.store({}), koji je metoda.
Exportamo ga preko: export const store = new Vuex.Store.
Unutar njega imamo state:. Mora se tako nazvati, dio je VUEX-a.
State je objekt.

State-u se pristupa pomocu computed metode,
this.$store.state. je nacin za pristup.

Gatters skuplja podatke iz stora i obavlja kalkulacije koje mora.
Obavezno se tako naziva prop u storu, gatters:.
Unutar njega obavljamo neke funkcije kojima propustamo state podatke.(bez this, obicni js)

Kako ne bi morali svaki put computed prop radit i pristupat svakoj od getter funkcija,
moguce je napraviti to pomocu mapGetters. Prvo ga importamo iz Vuex-a,
onda napravimo computed: mapGetters([ "imeMetodeuGetteru",..]).
Ovo zapravo napravi poveznicu izmedu odnosno,
mapiranje izmedu computed prop-a i njegovih metoda koje su mapirane sa onima iz Gettera.
Moze se propustit i objekt,
ili mapirati sa drugacijim imenima.
Npr: mapGetters({propertyName: "doubleCounter"}).

Javlja se problem ako ovako napravimo, ne mozemo koristit computed prop za ista drugo.

Tada se moze napraviti da je computed objekt, al problem je sta je i mapGetters sam kreira objekte za computed.
Odnosno objekt u objektu nije moguce u js imat.
Tada napravimo ...mapGetters([]). Spread objekta, koji sam kreira key/value za svaki element objekta.

Instaliramo za rest/spread npm i --save-dev babel-preset-stage-2.
Onda moramo u babel file-u postaviti ["stage-2"]

Da bi bilo uredno pracenje promjene stora, koristimo mutations, kojemu se commita promjena.
mutations: je property u kojemu definiramo metode koje ce izvesti promjene na storu.
this.$store.commit("decrement");
Ovdje umjesto da pristupamo mjestu i metodi, radimo commit sa imenom metode koju koristimo.
Takoder moguce je koristit mapMutations na isti nacin kao i mapGetteres.

MUTACIJE MORAJU BITI SINKRONE! Jer se inace ne moze pratiti koji je zapravo redosljed promjene state-a,
jer neka druga mutacija moze se izvrsit prije, iako je zapocela iza.

Actions omogucava da se pokrece asinkroni kod,
koji ce onda commit napravit na mutaciji kada se napravi asinkroni kod akcije.
Omogucava da se promjene na storu dogadaju sinkrono, ali je kod izvrsen asinkrono.
Action prima context, objekt koji ima pristup vecinu stora, te se preko njega commita.
actions: {
    increment: context => { // ({ commit }) umjesto context, ako zelimo samo commit koristit.
      context.commit("increment"); // commit("increment")
    }
  }
Ono sto nam mapActions radi je zapravo:
increment(by) { //moze se propustit vrijednost
this.$store.dispatch("increment", by)}
Tada moramo u actions djelu stora postavit payload argument uz context/commit,
isto napraviti i u mutations, taj payload cemo poslati uz poziv metode mutacije iz actiona.

Ako zelimo vise argumenata poslati, onda moramo ih staviti u objekt ({by: ads, drugi: daa})
Tada mozemo pristuputi njima preko payload.by/drugi...

Dobro bi bilo koristit uvijek akcije, bez obzira da li je asinkrono ili ne.

Da bi napravili 2-way bind, odnosno v-model, tada moramo napraviti metodu koja ce dispatchat promjenu na store.
updateValue(event) {
      this.$store.dispatch("updateValue", event.target.value);
    }
I onda na storu se pozove akcija updateValue...
Ako zelimo samo obicni bind :value="nesto" @input="updateValue", mozemo tako.
Ako zelimo v-model moramo promjeniti computed property value-a.
computed: {
    value: {
      get() {
        return this.$store.getters.value;
      },
      set(value) {
        this.$store.dispatch("updateValue", value);
      }
    }
  },
Tada value postaje property () - :.
Postavljamo get i set.
computed je vrsta metode koja inace zeli gatherat podatke.
U ovom slucaju koji je izniman koristimo i set.
U set value je vrijednost koja prima iz v-modela.
