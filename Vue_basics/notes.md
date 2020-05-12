1. Vue pogled se sastoji od elementa na koji se kaci(el: #id ili class). Nakon toga se dodaju podatci u data, ili metode u methods dijelu.
   Za pristup podatcima, nije potrebno koristiti this., vue sam alocira this na odredeni id/class, cime poveze sve podatke iz tog pogleda.
   Metode su funkcije koje se imenuju imeMetode: nakon cega se stavlja tip, bilo funkcija, arrow...
   U samom pogledu koristimo this., jer tu nemamo scope za this isti kao i u html djelu.

String interpolation, ubacivanje vrijednosti u string.

// Krace u zagradama
v-on:(@)eventType se koristi u html kodu za poziv metode na nekom eventu.
v-bind:(:)href(recimo), binda 2 atributa elementa.
v-once rendera podatke samo jednom, bez obzira dal se prebrise ili ne u samom izvoru.
v-html="nazivPodatka", koristi se za direktno renderanje html koda, a ne da ga esc-a(odnosno samo ispise sta je tu). Ova komanda je korisnia, al treba paziti na crossite script napad, ako recimo korisnik unosi taj podatak, pa moze napravit sto god zeli s tim.
v-model="name", 2 way data binding, omogucava da se update propagira po svim poljima koja koriste taj property

2. Increase(2, $event) u pozivu, ako saljemo argumente, mozemo poslati i event,
tada ga saljemo s $event. To je predefinirana varijabla.

Event.stopPropagation(), zaustavlja nadredene dogadaje u tom djelu koda gdje se poziva.
Drugi nacin je da se preko Vue-a u samom eventu blokira, v-on:mousemove.stop="",
Vue zaustavlja propagaciju i poziva praznu funkciju. Cesto se koristi i .eventdefault.
keyup.modifikator, gdje je modifikator tipka koju zelimo koristiti za event.

Poziv metode sa i bez ():
<pagination @click.native="fetchData"></pagination> // Poziv u kojemu saljemo referencu metode koju pozivamo
//the event object gets passed to the event handler as the first argument when binding only the method name as the event handler.
In your example, the click event gets passed to fetchData
<pagination @click.native="fetchData()"></pagination> // Poziv u kojemu pozivamo metodu
//alternatively, an actual method call can be used as an event handler. This allows you to pass any custom arguments to the method.
In your example, no argument was passed to fetchData, hence offset was assigned the default value specified: false.

3. Computed objekt(property), omogucava da pohranimo property-e.
   Razlika je u pozivu. Metodu kada pozivamo koristimo poziv funkcije.
   Kada pozivamo computed, mozemo ga pozvati kao data objekt.
   Razlika je sto computed se ne poziva svaki put kada dode do promjene, vec kad se zadovolji uvijet promjene,
   odnosno ako stari state nije vise iste vrijednosti kao i novi.
   Method se poziva svaki put i svaki put se re-rendera taj dio.
   Odnosno, u nasem slucaju, kada se promjeni vrijednost secondCounter-a,
   metode se pozivaju, ali computed ne, sto znaci da promjena u data, koja se ne tice tog dijela se ponovno poziva i izvrsava funkcija.
   Dakle ovdje drzimo podatke u cache-u preko "Computed", a "Method" re rendera sve.
   Watch: property koji promatra odreden podata u data, te se mora referencirat na njega.
   Argument koji prima ta funkcija je "value", koji vue prosljeduje sam.
   Ako koristimo callback, moramo koristiti neku varijablu koja ce spremiti this.
   Watch moze koristiti asinkrone funkcije.

4. Postoji vise nacina mjenjanja css-a dinamicki.
   Jedan je computed: i napraviti funkciju koja ce na event promjenu napravit.
   Druga je da se napravi property u data, koji se veze s v-model="" na neki input ili slicno, pa se preko toga minja.
   Ako zelimo da nosi vise classova, onda ih stavimo u []. Takoder mozemo koristiti neka svojstva pomocu {}, recimo true/false...
   Na taj nacin mozemo povezati vise razlicitih uvijeta, koji idu po prioritetu, od prvog classa prema doli.
