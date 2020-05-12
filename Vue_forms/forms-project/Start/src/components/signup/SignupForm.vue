<template>
  <div>
    <app-full-name v-model="userData.fullName" />

    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" class="form-control" v-model="userData.password" />
    </div>

    <div class="form-group">
      <label for="email">Mail</label>
      <input type="email" id="email" class="form-control" v-model="userData.email" />
    </div>

    <app-store-data v-model="userData.dataSwitch" />

    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <button class="btn btn-primary" @click.prevent="submitData">Submit!</button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreSwitch from "./StoreSwitch.vue";
import FullName from "./FullName.vue";

export default {
  components: {
    appStoreData: StoreSwitch,
    appFullName: FullName
  },
  data() {
    return {
      userData: {
        fullName: "Antonio Milicic",
        password: "",
        email: "",
        dataSwitch: false,
        isSubmitted: true
      }
    };
  },
  methods: {
    submitData() {
      this.$emit("dataSubmitted", this.userData);
    }
  }
};
</script>

<style scoped>
</style>