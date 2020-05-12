<template>
  <div class="container">
    <form>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <!-- Exercise 1 -->
          <!-- Create a Signup Form where you retrieve the following Information -->
          <!-- Full Name (First Name + Last Name) -->
          <!-- Mail -->
          <!-- Password -->
          <!-- Store Data? Yes/No -->
          <app-signup-form @dataSubmitted="userDataHandler" v-if="!userData.isSubmitted" />

          <!-- Exercise 2 -->
          <!-- Only display the Form if it has NOT been submitted -->
          <!-- Display the Data Summary ONCE the Form HAS been submitted -->
          <app-user-data v-else :userData="userData" />

          <!-- Exercise 3 -->
          <!-- Edit the Example from above and create a custom "Full Name" Control -->
          <!-- which still holds the First Name and Last Name Input Field -->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import UserDataC from "./components/userData/userDataContainer.vue";
import SignupForm from "./components/signup/SignupForm.vue";

export default {
  components: {
    appUserData: UserDataC,
    appSignupForm: SignupForm
  },
  data() {
    return {
      userData: {
        fullName: "",
        email: "",
        password: "",
        isStored: false,
        isSubmitted: false
      }
    };
  },
  methods: {
    userDataHandler(userInfo) {
      this.userData.fullName = userInfo.fullName;
      this.userData.email = userInfo.password;
      this.userData.password = userInfo.email;
      this.userData.isStored = userInfo.dataSwitch;
      this.userData.isSubmitted = userInfo.isSubmitted;
    }
  }
};
</script>

<style>
</style>
