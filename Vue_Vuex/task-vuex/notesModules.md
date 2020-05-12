Kako bi store bio uredni, kreiramo dodatni folder modules.
Unutar njega cemo rasporedit nove js file-ove koji ce sadrzavat kod za pojedninu  funkciju.

Za svaki state/getters/mutations/actions koji se odnosi na neku pojedinu funkcionalnost,
napravimo ih kao konstante, odnosno objekte.

Exportamo ih iz tog filea na jednom mjestu sa export defaunt {state,getters...}

Kako bi ih importali u store, kreiramo novi prop modules: gdje samo navedemo sta importamo.

Ako zelimo dodatno rasteretit store, za one stvari koje nemaju gdje ici(po folderima),
tada kreiramo nove file-ove koji nose nazive funkcije(akcija/mutacija...)
U njih stavljamo sve akcije/mutacije... koje zelimo imati.
postavljamo svaku kao export const pa ime metode koju smo i prije koristili.

Za importat na taj nacin, mozemo jedno po jedno po imenu {} ili,
import * as actions from "./actions",
gdje * oznacava da ce js samo importat sve akcije u objekt actions, dati im imena itd.
Tada mozemo koristit taj objekt kakav je za action dolje u store djelu,
jer je to objekt, kao sto je i action: bio.
Moze se i module pojeliti na ovaj nacin, ako zelimo.

Treba paziti da su imena jedinstvena, kada se radi sa puno file-ova, to moze biti problem.
Tj. svaka akcija/getter/... moraju imati pojedinacno razlicita imena svojih elemenata.

Za to kreiramo novi js file, u razini sa storom, types.js.
U njemu kreiramo konstante:
export const DOUBLE_COUNTER = "counter/DOUBLE_COUNTER";
Konvencija imenovanja globalnih konstanti je velika slova i razdvojeni s _.
U "" je postavljeno gdje pripada(counter) i kako smo ga nazvali, tj kako se zove konstanta.
Ovo je dosta posla. Pa ponekad nije potrebno.

Osim toga novi Vuex je omogucio da se koristi njegov namespace,
tako da se navede u modules: propu namespaced: true.
// counter: {namespaced: true}
// Novi vuex namespace za unique namespaceing
// onda ce se u metodama i computed gdje se pozivaju raditi
// ...mapActions("counter", ["doSomething"])
// koji je zapravo definiran kao
// map this.doSomething() to this.$store.dispatch("counter/doSomething")