1) v-if="" se moze koristiti sa truthy vrijednostima, koje onda mogu maknuti recimo skroz element s dom-a, kao sto je u primjeru,
sa show = false. v-else se povezuje sa najblizim v-if uvijetom.
Takoder postoji i v-else-if, za nizanje if else uvijeta.

Template se ne rendera u domu, al unutarnji elementi da.
Template se koristi kada zelimo vise stvari staviti pod neki uvijet,
a ne zelimo imati taj template element u domu.

v-show koristimo ako zelimo zadrzat element u domu, ali ga makniti od korisnika.
On stavlja display: none, preko cssa. Takoder truthy.

v-for="thing in things", omogucava da prolazimo kroz niz.
Onda ih ispisemo pomocu {{ thing }}.

Mozemo i naci koji je index elementa koji ispisujemo iz niza, pomocu:
v-for="(thing, i) in things" ispis {{thing}} {{i}}. Prvi element je uvijek element niza, a drugi index.

Takoder moze se staviti i key, koji ide nakon imena,
recimo (thing, key), takoder moze se dodati i index (thing, k, i).
Key se koristi kod objekata.
Takoder se moze koristiti i za: n=1->10 kao v-for="n in 10".

ingredients.push('spices'), pusha u najblizi array i samo u memoriji stavlja drugu vrijednost, ne mjenja nista u primarnom arrayu.
On samo prati poziciju, ne koji je po redu u listi.
Za red u listi koristimo :key="", u "" stavljamo index koji je unique. Ovo je key bind.

2):class="{'player-turn': turn.isPlayer, 'monster-turn': !turn.isPlayer}"
Postavi klasu ovisno da li je turn.isPlayer true ili false. Mozemo redati uvijete,
a svaki uvijet je postavljen nakon :, on ce vratiti true ili false na klasu.

3)Moguce je napraviti vise Vue instanci, povezati svaku s nekim drugim dijelom prema id-u.
Takoder instance mogu biti spremljene u varijable, te se mogu mjenjati medusobno,
pomocu funkcija koje pristupaju preko imena tim elementima Vue instance.
Nije preporucljivo, bolje je staviti ono sto ima zajednicku interakciju u istu instancu.

Moguce je napraviti novi Vue property, ali kada se napravi taj property, on nece biti proxy-an,
odnosno nece se postaviti watcher nad njim, tako da ce se pojavit u property-ju, al nece biti updatean,
niti ce se moci pratiti preko Vue-a za automatski update.

$data sadrzi data property, $refs moze pristupiti nekom html elementu, recimo ako zelimo dobiti neku vrijednost ili tako slicno,
umjesto querySelectora. Al nije dobar za mjenjanje podataka, jer isto nije proxyano.

vm1.$mount("#app1"); Mounta Vue instancu gdje zelimo, umjesto da stavljamo el:...
Korisno kada ne znamo gdje ni sta ce bit napravljeno, pa pozivamo kasnije mountanje.

Moze se napraviti komponenta koja je reusable tako da se napravi:
Vue.component("imeKomponente", {
    template: "<h1>Hello component</h1>"
  });
Poziv isto kao i kod reacta <hello></hello>
Na taj nacin kreiramo reusable komponente.

template: property za ubacivanje html-a.

Vue instanca <-> VDOM <-> DOM

new Vue -> beforeCreate() -> 
inicijalizacija podataka i dogadaja-> 
created() -> kompajliranje templatea i povezivanje -> 
beforeMount() -> zamjena el: sa kompajliranim templatom -> 
mountanje DOMa -> promjena podataka -> 
beforeUpdate() -> rerender DOM-a -> updated() -> 
mountanje DOM-a -> beforeDestroy() -> destroyed()

Takoder postoje i activated() i deactivated(), koje se koriste kod dinamickih komponenti.