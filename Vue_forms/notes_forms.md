v-model.lazy - reagira samo na promjenu, odnosno ne na input, vec kada kliknemo negdje drugdje
v-model.trim - uklanja blank s pocetka i kraja
v-model.number - mora biti broj, tj forsira ga da se transformira u broj

v-model moze se pozvati s istim imenom na vise mista, onda ce spremat podatke sa oba mjesta na taj data prop, pazi mora biti [], array, mozda i object.
v-model - radi bind :value na neku varijablu i istovremeno radi @input(ili change)="varijabla = $event.target.value"
Zbog toga se koristi u metodama this.$emit("input", isOn);, jer input se stvara preko vmodela isto.

style="white-space: pre" - za ispis multi line stringa, ako zelimo line brake imat.

:selected="item == 'itemsContent'" - odabire se koji ce biti selektiran iz niza za prikaz.
v-model u parentu overridea selected od childa.