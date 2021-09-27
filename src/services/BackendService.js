import Vue from "vue";
import Router from "../router/index";
import constants from "../constants";

const baseDomain = process.env.VUE_APP_BACK_END_BASE_URL;

export default {
  async login(email, password) {
    const postData = { email: email, password: password };
    try {
      let response = await Vue.http.post(baseDomain + "/login", postData);
      if (response.ok) {
        return response.body;
      }
    } catch (error) {
      console.error("BackendService -> login -> " + error.status);
      return {
        error: error.body.message
      };
    }
  },
  async getTasks(count, offset, status) {
    try {
      let requestUrl = baseDomain + "/tasks";
      if (count && count >= 5) {
        requestUrl += "?limit=" + count;
      }
      if (offset) {
        requestUrl += "&offset=" + offset;
      }
      const stateId = constants.getTaskStateId(status);
      if (stateId) {
        requestUrl += "&state=" + stateId;
      }
      let response = await Vue.http.get(requestUrl);
      if (response.ok) {
        return response.body;
      }
    } catch (error) {
      console.error("BackendService -> getTasks -> " + error.status);
      if (error.status === 401) {
        Router.push("/logout");
      }
      return {
        error: error.body.message
      };
    }
  },
  async getTask(taskId) {
    try {
      let response = await Vue.http.get(baseDomain + "/tasks/" + taskId);
      if (response.ok) {
        return response.body;
      }
    } catch (error) {
      console.error("BackendService -> getTask -> " + taskId + " -> " + error.status);
      if (error.status === 401) {
        Router.push("/logout");
      }
      return {
        error: error.body.message
      };
    }
  },
  async retryTask(taskId) {
    try {
      let response = await Vue.http.put(baseDomain + "/tasks/" + taskId + "/retry");
      if (response.ok) {
        return response.body;
      }
    } catch (error) {
      console.error("BackendService -> retryTask -> " + error.status);
      if (error.status === 401) {
        Router.push("/logout");
      }
      return {
        error: error.body.message
      };
    }
  },
  async getStatisticValue(endpoint) {
    try {
      let response = await Vue.http.get(baseDomain + endpoint);
      if (response.ok) {
        return response.body;
      }
    } catch (error) {
      console.error("BackendService -> getAverageProcessingTime -> " + error.status);
      if (error.status === 401) {
        Router.push("/logout");
      }
      return {
        error: error.body.message
      };
    }
  },
  async getSuccessRate() {
    return this.getStatisticValue("/statistics/rate");
  },
  async getAverageProcessingTime() {
    return this.getStatisticValue("/statistics/time/average");
  },
  async getFastestProcessingTime() {
    return this.getStatisticValue("/statistics/time/fastest");
  },
  async getSlowestProcessingTime() {
    return this.getStatisticValue("/statistics/time/slowest");
  },
  async getQueueStatus() {
    return this.getStatisticValue("/statistics/queue/status");
  },
  async getQueueDesignTaskComposition() {
    return this.getStatisticValue("/statistics/queue/composition");
  }
};
