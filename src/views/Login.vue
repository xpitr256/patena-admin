<template>
  <v-app>
    <v-content class="bg">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <img src="login_logo.png" alt="Patena" height="95%" />
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="email"
                    abel="Email"
                    type="email"
                    v-model="email"
                    placeholder="Email"
                    v-on:keyup.enter="handleSubmit"
                    ref="email"
                    :rules="emailRule"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                    v-on:keyup.enter="handleSubmit"
                    :rules="passRule"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/" large @click="handleSubmit">Sign In</v-btn>
              </v-card-actions>
            </v-card>
            <v-alert v-show="errorMessage !== ''" dismissible color="red" border="left" elevation="2" colored-border class="mt-3" icon="mdi-alert">{{
              errorMessage
            }}</v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
import BackendService from "../services/BackendService";

export default {
  name: "Login",
  props: {
    source: String
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      passRule: [v => !!v || "Password is required", v => v.length >= 6 || "Password must be at least 6 characters"],
      emailRule: [v => /^[^\s@]+@[^\s@]+$/.test(v) || "Invalid Email address"]
    };
  },
  created: function() {
    setTimeout(() => {
      this.$nextTick(() => this.setFocus());
    }, 100);
  },
  methods: {
    setFocus: function() {
      this.$refs.email.focus();
    },
    clearErrorMessage() {
      this.errorMessage = "";
    },
    async handleSubmit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        this.clearErrorMessage();
        this.$Progress.start();
        const response = await BackendService.login(this.email, this.password);
        this.$Progress.finish();
        if (!response.error && response.auth) {
          localStorage.setItem("user-token", response.token);
          this.$router.push("task");
        } else {
          this.errorMessage = response.error;
        }
      }
    }
  }
};
</script>

<style>
.bg {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://cdn.pixabay.com/photo/2020/06/05/03/20/particles-5261293_1280.jpg");
  background-size: cover;
}

.bg::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.55);
}
</style>
