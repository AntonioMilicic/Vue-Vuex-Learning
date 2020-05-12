<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Http</h1>
        <div class="form-group">
          <label for="username">Username</label>
          <input class="form-control" type="text" v-model="user.username" />
        </div>
        <div class="form-group">
          <label for="email">Mail</label>
          <input class="form-control" type="email" v-model="user.email" />
        </div>
        <button class="btn btn-primary" @click="submit">Submit</button>
        <hr />
        <input type="text" class="form-control" v-model="node" />
        <br />
        <br />
        <button class="btn btn-primary" @click="fetchData">Get data</button>
        <br />
        <br />
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="(u, index) in users"
            :key="index"
          >{{u.username}} - {{u.email}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        email: ""
      },
      users: [],
      resource: {},
      node: "data"
    };
  },
  methods: {
    submit() {
      // Bez resource-a
      // this.$http.post("data.json", this.user).then(
      //   respose => {
      //     console.log(respose);
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
      // 1)Resource) this.resource.save({}, this.user);
      this.resource.saveAlt(this.user);
    },
    fetchData() {
      // Bez resource custom actiona.
      // this.$http
      //   .get("data.json")
      //   .then(response => {
      //     return response.json();
      //   })
      //   .then(data => {
      //     const resultArray = [];
      //     for (let key in data) {
      //       resultArray.push(data[key]);
      //     }
      //     this.users = resultArray;
      //   });
      this.resource.getData({ node: this.node }).then(data => {
        const resultArray = [];
        for (let key in data) {
          resultArray.push(data[key]);
        }
        this.users = resultArray;
      });
    }
  },
  created() {
    const customActions = {
      saveAlt: { method: "POST", url: "alternative.json" },
      getData: { method: "GET" }
    };
    // $resource dolazi or VueResourca, on je alternativa, pogotovo ako zelimo customAction napravit
    this.resource = this.$resource("{node}.json", {}, customActions);
  }
};
</script>

<style>
</style>
