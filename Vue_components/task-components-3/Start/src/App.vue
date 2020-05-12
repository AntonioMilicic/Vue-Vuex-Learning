<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <br />
        <button @click="selectedComponent('Blue')" class="btn btn-primary">Load Blue Template</button>
        <button @click="selectedComponent('Green')" class="btn btn-success">Load Green Template</button>
        <button @click="selectedComponent('Red')" class="btn btn-danger">Load Red Template</button>
        <hr />
        <component :is="selectField">
          <p>Neki text {{ color }}</p>
        </component>
        <!-- <app-blue>
          <p>Neki text {{ color }}</p>
        </app-blue>
        <app-green>
          <p>Neki text {{ color }}</p>
        </app-green>
        <app-red>
          <p>Neki text {{ color }}</p>
        </app-red>-->
      </div>
    </div>
  </div>
</template>

<script>
import Blue from "./components/Blue.vue";
import Green from "./components/Green.vue";
import Red from "./components/Red.vue";

export default {
  data: function() {
    return {
      selectField: "appRed",
      color: "Red"
    };
  },
  components: {
    appBlue: Blue,
    appGreen: Green,
    appRed: Red
  },
  methods: {
    selectedComponent(newColor) {
      this.selectField = "app" + newColor;
      this.color = newColor;
    }
  }
};
</script>

<style>
</style>
