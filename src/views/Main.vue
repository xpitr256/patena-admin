<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" src="https://cdn.vuetifyjs.com/images/backgrounds/bg.jpg">
      <img src="logo.png" class="pa-2" width="75%" alt="Patena" />

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text text-subtitle-1">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Admin</v-app-bar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer padless app>
      <v-row justify="center" no-gutters>
        <v-col class="primary lighten-1 py-4 text-center white--text" src="https://cdn.vuetifyjs.com/images/backgrounds/bg.jpg" cols="12">
          {{ new Date().getFullYear() }} — <strong>Patena Admin</strong>
        </v-col>
      </v-row>
    </v-footer>
    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      items: [
        { title: "Tasks", icon: "mdi-format-list-text", to: "/" },
        { title: "Statistics", icon: "mdi-chart-arc", to: "/statistics" },
        { title: "Logout", icon: "mdi-logout", to: "/logout" }
      ],
      drawer: null
    };
  }
};
</script>
