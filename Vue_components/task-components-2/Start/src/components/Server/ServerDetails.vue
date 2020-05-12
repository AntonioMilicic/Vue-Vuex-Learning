<template>
  <div class="col-xs-12 col-sm-6">
    <p v-if="!server"></p>
    <p v-else>Server #{{ server.id }} status: {{ server.status }}</p>
    <button @click="resetServerStatus">Reset</button>
  </div>
</template>

<script>
import { serverBus } from "../../main";

export default {
  data: function() {
    return {
      server: null
    };
  },
  methods: {
    resetServerStatus() {
      this.server.status = "normal";
    }
  },
  created() {
    serverBus.$on("selectedServerStatus", server => {
      this.server = server;
    });
  }
};
</script>

<style>
</style>
