<template>
  <div class="pa-6">
    <div v-if="taskError === ''">
      <h1>Task {{ task.id }}</h1>

      <v-card class="my-4" elevation="2" outlined>
        <v-card-title class="grey lighten-4">Details </v-card-title>

        <v-container>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field v-model="task.status" label="Status" readonly :class="getTextColor(task.status)"></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field v-model="task.date" label="Creation Date" readonly></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field v-model="task.type" label="Type" readonly></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4" v-if="task.taskData && task.taskData.email">
              <v-text-field v-model="task.taskData.email" label="Email" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field v-model="task.duration" label="Duration (min)" readonly></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field v-model="task.attempts" label="Attempts" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="task.taskData && task.taskData.distance">
            <v-col cols="12" sm="4">
              <v-text-field v-model="task.taskData.distance" label="Distance (A)" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="10" v-if="task.taskData && task.taskData.initialSequence">
              <v-textarea outlined readonly no-resize label="Initial Sequence" rows="2" v-model="task.taskData.initialSequence.value"></v-textarea>
            </v-col>
            <v-col cols="12" sm="10" v-if="task.taskData && !task.taskData.initialSequence && task.output && task.output.initialSequence">
              <v-textarea outlined readonly no-resize label="Initial Sequence" rows="2" v-model="task.output.initialSequence"></v-textarea>
            </v-col>
            <v-col cols="12" sm="2" v-if="task.output">
              <v-text-field v-model="task.output.initialScore" label="Initial score" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="task.messageError && task.status === 'Cancelled'">
            <v-col cols="12" sm="10">
              <v-textarea
                outlined
                readonly
                no-resize
                label="Failure reason"
                rows="2"
                color="#f44336"
                v-model="task.messageError"
                class="failure"
                background-color="red lighten-5"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row v-if="task.output">
            <v-col cols="12" sm="10">
              <v-textarea
                outlined
                readonly
                no-resize
                label="Result"
                rows="2"
                color="#4CAF50"
                v-model="task.output.finalSequence"
                class="v-input--is-focused result"
                background-color="light-green lighten-5"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field v-model="task.output.finalScore" label="Final score" readonly></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
    <v-alert v-show="taskError !== ''" text prominent type="error" icon="mdi-cloud-alert">
      <h3 class="text-h5 mb-1">
        Ups! There is a problem
      </h3>

      {{ taskError }}
    </v-alert>

    <v-btn color="primary" outlined class="mt-8" @click="goBackToList"> <v-icon left> mdi-arrow-left </v-icon>Back to list </v-btn>
  </div>
</template>

<script>
import BackendService from "../services/BackendService";

export default {
  name: "Task",
  data: () => ({
    task: { id: "" },
    taskError: ""
  }),
  async created() {
    const taskFromList = this.$route.params.task;
    if (!taskFromList) {
      this.$Progress.start();
      const task = await BackendService.getTask(this.$route.params.id);
      this.$Progress.finish();
      if (!task.error) {
        this.task = task;
        this.fillEmptyTaskFields();
      } else {
        this.taskError = task.error;
      }
    } else {
      this.task = taskFromList;
      this.fillEmptyTaskFields();
    }
  },
  methods: {
    getTextColor(status) {
      if (status === "In Progress") return "blue--text";
      if (status === "Pending") return "blue-grey--text";
      if (status === "Finished") return "green--text";
      return "red--text";
    },
    fillEmptyTaskFields() {
      if (!this.task.taskData.email || this.task.taskData.email === "") {
        this.task.taskData.email = "-";
      }
    },
    goBackToList() {
      this.$router.push({ name: "Tasks" });
    }
  }
};
</script>

<style scoped>
>>> .v-input__slot::before {
  border-style: none !important;
}
.blue--text >>> .v-text-field__slot input {
  color: #2196f3;
  font-weight: bold;
}
.blue-grey--text >>> .v-text-field__slot input {
  color: #607d8b;
  font-weight: bold;
}
.green--text >>> .v-text-field__slot input {
  color: #4caf50;
  font-weight: bold;
}
.red--text >>> .v-text-field__slot input {
  color: #f44336;
  font-weight: bold;
}

.result >>> .v-text-field__slot label {
  color: #4caf50 !important;
  caret-color: #4caf50 !important;
}

.theme--light.v-input {
  color: #4caf50 !important;
  caret-color: #4caf50 !important;
}

.failure >>> .v-text-field__slot label {
  color: #f44336 !important;
  caret-color: #f44336 !important;
  font-weight: bold;
  font-size: 1.2em;
}
</style>
