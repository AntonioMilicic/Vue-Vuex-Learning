<template>
  <div>
    <h1>The User Page</h1>
    <hr />
    <!-- <p>Loaded ID: {{ id }}</p> -->
    <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  // Stari nacin
  // data() {
  //   return {
  //     id: this.$route.params.id
  //   };
  // },
  // watch: {
  //   $route(to, from) {
  //     this.id = to.params.id;
  //   }
  // },
  // Novi nacin
  // props: ["id"],
  methods: {
    navigateToHome() {
      this.$router.push("/");
      // isto tako se moze stavit named i onda parametre stavit nakon ako treba.
      // this.$router.push({ path: "imePuta" });
    }
  }
};
</script>
