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
                <v-form>
                  <v-text-field prepend-icon="mdi-account" name="email" label="Email" type="text" v-model="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="mdi-lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/" large @click="handleSubmit">Sign In</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
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
      password: ""
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0 && this.email.length > 0) {
        const response = await BackendService.login(this.email, this.password);
        if (!response.error && response.auth) {
          localStorage.setItem("user-token", response.token);
          this.$router.push("task");
        } else {
          //todo show error message
          console.error(response.error);
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
  background-image: url("https://cdn.pixabay.com/photo/2018/07/15/10/44/dna-3539309_1280.jpg");
  background-size: cover;
}

.bg::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
