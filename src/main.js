import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import vueResource from "vue-resource";
import VueProgressBar from "vue-progressbar";
import VuetifyConfirm from "vuetify-confirm";

Vue.config.productionTip = false;
Vue.use(vueResource);
Vue.http.interceptors.push(request => {
  request.headers.set("Authorization", "Bearer " + localStorage.getItem("user-token"));
});
Vue.use(VuetifyConfirm, { vuetify });
Vue.use(VueProgressBar, {
  color: "rgb(143, 255, 199)",
  thickness: "4px",
  failedColor: "red"
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
