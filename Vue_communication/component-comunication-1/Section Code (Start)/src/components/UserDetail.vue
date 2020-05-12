<template>
  <div class="component">
    <h3>You may view the User Details here</h3>
    <p>Many Details</p>
    <p>User Name: {{ switchName( ) }}</p>
    <p>User Age: {{ userAge }}</p>
    <button @click="resetName()">Reset costum</button>
    <button @click="resetFn()">Reset callback</button>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    resetFn: Function,
    userAge: Number
  },
  methods: {
    switchName() {
      return this.name
        .split("")
        .reverse()
        .join("");
    },
    resetName() {
      this.name = "resetirano";
      this.$emit("nameWasReset", this.name);
    }
  },
  created() {
    eventBus.$on("ageWasEdited", age => {
      this.userAge = age;
    });
  }
};
</script>

<style scoped>
div {
  background-color: lightcoral;
}
</style>
