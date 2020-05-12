<template>
  <li @click="selectedServerStatus">Server #{{ server.id }}</li>
</template>

<script>
import { serverBus } from "../../main";

export default {
  props: ["server"],
  methods: {
    selectedServerStatus() {
      serverBus.$emit("selectedServerStatus", this.server);
    }
  }
};
</script>