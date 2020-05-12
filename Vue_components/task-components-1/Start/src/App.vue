<template>
  <div class="container">
    <app-header />
    <hr />
    <div class="row">
      <app-servers />
      <app-server-status />
    </div>
    <hr />
    <app-footer />
  </div>
</template>

<script>
import Header from "./components/Shared/Header.vue";
import Footer from "./components/Shared/Footer.vue";
import Servers from "./components/Server/Servers.vue";
import ServerStatus from "./components/Server/ServerStatus.vue";

export default {
  components: {
    "app-header": Header,
    "app-servers": Servers,
    "app-server-status": ServerStatus,
    "app-footer": Footer
  }
};
</script>

<style></style>
