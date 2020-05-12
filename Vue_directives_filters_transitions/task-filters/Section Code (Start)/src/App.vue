<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Filters & Mixins</h1>
        <p>{{ text | toUpper | to-lower}}</p>
        <hr />
        <button @click="fruits.push('Barries')">Add new item</button>
        <input v-model="filterText" />
        <ul>
          <li v-for="fruit in filteredFruits" :key="fruit">{{ fruit }}</li>
        </ul>
        <hr />
        <app-mixin-list />
      </div>
    </div>
  </div>
</template>

<script>
import List from "./List.vue";
import { fruitMixin } from "./fruitMixin";

export default {
  data() {
    return {
      text: "hello"
    };
  },
  filters: {
    toUpper(value) {
      return value.toUpperCase();
    }
  },
  components: {
    appMixinList: List
  },
  mixins: [fruitMixin]
};
</script>

<style>
</style>
