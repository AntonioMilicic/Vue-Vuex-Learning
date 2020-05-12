1) Components
Ako zelimo koristit ponavljanje nekog template-a, moramo koristiti componente.
Inace Vue koristi instance, instanca moze imat samo jedno pozivno mjesto, gdje se podatci renderaju.

U komponentama moramo naglasiti da je data funkcija, koja vraca neki podatak, da se ne ispreplete data iz komponente i data iz Vue instance.
Na taj nacin dobijemo pokazivace na razlicite objekte.

Postoje 2 nacina za kreiranje komponenti.
Jedan je Vue.component('my-personal-comp-tag', {data...}) -> globalna komponenta
Drugi je let imeKomponente = {data...} -> lokalna komponenta, koju pozivamo tako sta stavljamo u Vue instanci:
new Vue ({
	el: '#app',
	components: {
	'my-personal-comp-tag': imeKomponente
	}
})

Moze se vratiti samo 1 element kao parent element komponente, zato se moraju zamotat u neki div ili slicno.
<template> se ne racuna, jer se on mice iz DOM-a.

Za stilove mozemo dodati <style scoped> koji se onda odnosi samo na tu komponentu.
Ovo je vrsta "shadow DOM-a", stvara se vise DOM-ova koji su vezani u jedan glavni DOM.
To se moze prepoznat jer se doda data-v-nekiID u elementima. 

1.2) Component komunikacija

Kako bi se parent => child komunikacija odvijala moramo postaviti props u child komponenti,
koji cemo nazvati isto kao i prop koji mu saljemo.
props: ["propName"]. 
Da bi napravili validaciju moramo napraviti da je props objekt. Onda za pojedini prop stavljamo,
vrstu podatka koji ocekujemo. Na ovaj nacin ce Vue javiti gresku, inace ce se samo slomit app.
props: {
    name: [String, Array]
  },
Takoder moze prop biti objekt, tada se stavlja name: {type: String},
osim toga mozemo postaviti required: true, ako zelimo osigurati da se komponenta koristi samo ako prop se posalje.
Takoder mozemo postaviti i default:, ali onda required nema smisla. Ako je tip podatka objekt,
onda moramo default: function() {return{name: "",...}}, za default.

U parentu stavljamo prop unutar taga komponente u pozivu:
<app-user-detail :name="name">.
Ako hardcodiramo mozemo stavit samo name="nesto", raditi ce, prosljedit ce.
Ali posto zelimo da prati vrijednost varijable, a ne string name,
onda moramo v-bind napravit, dakle :name="varijabla".

Props imenovanje je bolje ne koristit case sensitive, jer moze nastat problem s DOM-om,
ako se ne koristi single file format.

Property se ne bi smio minjat iz child komponente, vec samo sa parenta.
Objekti i slozeni tipovi podataka su samo pokazivaci u memoriji, zbog toga nije pametno ovaj korak iza.

Da bi child komunicirao s parentom koristimo this.$emit("imeEventa", this.name), Vue costum event.
Taj event je potrebno zabiljeziti na parent komponenti, gdje se stavlja:
@imeEventa="name= $event", unutar poziva child komponente. $event nosi vrijednost koju event listener zaprima.

Drugi nacin je da se napravi callback,
on se radi tako da se pozove metoda iz parenta, koja se propusti child-u kao prop,
te se onda poziva iz childa. Na taj nacin se uprate radi na parentu isto.

Child => child komunikacija nije direktno moguca, koristimo parent komponentu koja upravlja propertijma.
Jedan nacin je da napravimo props u parentu koji prosljedimo svim childovima koji ga trebaju.
Onda pomocu $emit u childu radimo promjenu, koja se propagira na parenta, a sa parenta i na sve childove.
Drugi nacin je pomocu callbacka, kao i gore.

Treci nacin je EventBus, on omogucava malo drugaciju komunikaciju, te je bolji kad imamo vise child-unutar childa za komunikaciju.
Event bus da bi koristili koristimo globalni Vue objekt, koji cemo u main.js definirat iznad poziva new Vue.
export const eventBus = new Vue();
Takoder moguce je napraviti metode itd u eventBus-u, i onda mozemo pozvati metodu preko eventBus.changeAge...
export const eventBus = new Vue({ methods: {}...});
Isto tako mozemo dodati i data:, ne funkcijski data, obicni, koji je dostupan bilo gdje iz app.

Moramo importat eventBus onda u onim komponentama di koristimo ga.
U onoj komponenti gdje zelimo promjenu(mozemo promjenu napravit na childu, a ne i parentu) pozivamo:
created() {
	eventBus.$on("ageWasEditedWithBus", age => {
      this.userAge = age;
    });
} hook, koji ce slusati dogadaje otkad se napravi komponenta.
On ce podatke koji su dosli iz eventa spremiti u age, te napraviti promjenu lokalnog userAgea.

Zadnji nacin je vuex.

1.3) Advanced components

Slot je tag <slot/> koji se moze koristiti da se preko parent komponente u child posalje linije html koda, ili bilo kojeg podatka.
Za slot, stil koji se koristi moze biti sa child-a ili sa parenta.
Slot tag se moze pozvati na vise mjesta ako zelimo istu komponentu vise puta.
Ako zelimo razlicite komponente, odnosno dio podataka poslat odredenom slotu,
onda ih imenujemo u child komponenti, s atributom:
<slot name="imeSlota" />, 
dok u parentu stavljamo atribut:
<ime-taga slot="imeSlota" />.
Ako imamo neki slot s imenom i drugi bez, onaj bez je default i prima sve ostale podatke.
Ako u <slot>Neki podatak<slot/>, imamo neki podatak, onda ce to biti default, sta ce se zaminit ako se dobije podatak.

Primjer primjene je slideshow, gdje imamo glavni okvir koji ne zelimo minjat, nego samo podatak unutar.


Dinamicne komponente su komponente kojima se prosljedi sto renderat preko direktive,
:is="varijablaSImenom".
<component :is="selectedComponent">
          <p>Default content</p>
</component>.
Dinamicke komponente se uniste svaki put kad se prebaci izmedu njih.
Kako se to ne bi dogodilo zamotamo ih u tag <keep-alive>.

@click.prevent, event se ne salje na server, vec se samo izvrsi metoda koja se poziva.

@click.native, event se propagira sa native elementa komponente. Dakle ako se klikne neki element unutar komponente, tretiraj kao da se klikla komponenta.
Koristi se jer se tag koji mi kreiramo ne rendera u DOM-u, vec samo nativni.




