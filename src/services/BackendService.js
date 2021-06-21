import Vue from "vue";

const baseDomain = process.env.VUE_APP_BACK_END_BASE_URL;

export default {
  async login(email, password) {
    const postData = { email: email, password: password };
    try {
      let response = await Vue.http.post(baseDomain + "/login", postData);
      if (response.ok) {
        return response.body;
      }
      return {
        error: response.body.message
      };
    } catch (error) {
      console.error("BackendService -> login -> " + error.status);
      return {
        error: error.body.message
      };
    }
  }
};
