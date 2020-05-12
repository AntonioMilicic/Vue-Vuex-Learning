<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Directives Exercise</h1>
        <!-- Exercise -->
        <!-- Build a Custom Directive which works like v-on (Listen for Events) -->
        <p></p>
        <button v-personalOn:click="buttonClicked">Click</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    personalOn: {
      bind(el, binding) {
        const eventType = binding.arg;
        const calledFunction = binding.value;
        el.addEventListener(eventType, calledFunction);
      }
    }
  },
  methods: {
    buttonClicked() {
      console.log("Done something");
    }
  }
};
</script>

<style>
</style>
