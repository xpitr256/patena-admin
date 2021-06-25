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
  },
  /*async getMockedTasks() {
    return [
      {
        id: "7da10fc2-ad51-451c-b491-09a653de8fe0",
        date: "11-02-2021 18:44 hs",
        status: "In Progress",
        duration: "-",
        type: "Initial Sequence",
        email: "test@patena.com.ar",
        attempts: 1,
        emailSent: false
      },
      {
        id: "f8e8033e-f04f-4dc0-b5eb-4117a8e6974d",
        date: "11-02-2021 19:44 hs",
        status: "In Progress",
        duration: "-",
        type: "Only flanking",
        email: "test2@patena.com.ar",
        attempts: 1,
        emailSent: false
      },
      {
        id: "5a11baea-ba3e-422a-92cc-a167c71496e8",
        date: "14-02-2021 04:44 hs",
        status: "Waiting",
        duration: "-",
        type: "No initial data",
        email: "test3@patena.com.ar",
        attempts: 0,
        emailSent: false
      },
      {
        id: "5a11baea-ba3e-422a-92cc-a167c71496e7",
        date: "15-02-2021 12:00 hs",
        status: "Waiting",
        duration: "-",
        type: "Flanking + initial sequence",
        email: "test3@patena.com.ar",
        attempts: 0,
        emailSent: false
      },
      {
        id: "5a11baea-ba3e-422a-92cc-a167c71496e6",
        date: "18-02-2021 19:45 hs",
        status: "Waiting",
        duration: "-",
        type: "Initial sequence",
        email: "test3@patena.com.ar",
        attempts: 0,
        emailSent: false
      },
      {
        id: "5a11baea-ba3e-422a-92cc-a167c71496e5",
        date: "28-02-2021 19:45 hs",
        status: "Finished",
        duration: "18",
        type: "Initial sequence",
        data: {
          initialSequence:
              ">sp|P60844|AQPZ_ECOLI Aquaporin Z OS=Escherichia coli (strain K12) OX=83333 GN=aqpZ PE=1 SV=1\n" +
              "AMAIYLTAGVSGAHLNPAVTIALWLFACFDKRKVIPFIVSQVAGAFCAAALVYGLYYNL",
          initialScore: 348,
          result: "NNLGEEKGECVGVGTKGRQKAMGRCPVLGEALDEYPINHPCKIGHHLGHLALGPIPLGL",
          finalScore: 0
        },
        email: "test_finished@patena.com.ar",
        attempts: 1,
        emailSent: true
      },
      {
        id: "5a11baea-ba3e-422a-92cc-a167c71496e4",
        date: "24-02-2021 19:45 hs",
        status: "Finished",
        duration: "220",
        type: "Initial sequence",
        email: "help@patena.com.ar",
        attempts: 2,
        emailSent: true
      },
      {
        id: "5a11baea-ba3e-422a-92cc-a167c71496e3",
        date: "16-02-2021 19:45 hs",
        status: "Finished",
        duration: "96",
        type: "Initial sequence",
        email: "support@patena.com.ar",
        attempts: 3,
        emailSent: true
      },
      {
        id: "5a11baea-ba3e-422a-92cc-a167c71496e2",
        date: "13-02-2021 19:45 hs",
        status: "Finished",
        duration: "18",
        type: "Initial sequence",
        email: "test_finished@patena.com.ar",
        emailSent: true
      },
      {
        id: "5a11baea-ba3e-422a-92cc-a167c71496e1",
        date: "01-02-2021 10:00 hs",
        status: "Cancelled",
        duration: "-",
        type: "Initial sequence",
        email: "cancelled@patena.com.ar",
        attempts: 3,
        emailSent: true
      }
    ];
  },
   */
  async getTasks() {
    try {
      let response = await Vue.http.get(baseDomain + "/tasks", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user-token")
        }
      });
      if (response.ok) {
        return response.body;
      }
      return {
        error: response.body
      };
    } catch (error) {
      console.error("BackendService -> getTasks -> " + error.status);
      return {
        error: error.body
      };
    }
  }
};
