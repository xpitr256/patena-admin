<template>
  <div class="pa-6">
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
          <v-col cols="12" sm="4">
            <v-text-field v-model="task.email" label="Email" readonly></v-text-field>
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
</template>

<script>
import BackendService from "../services/BackendService";

export default {
  name: "Task",
  data: () => ({
    task: { id: "" }
  }),
  async created() {
    const taskFromList = this.$route.params.task;
    if (!taskFromList) {
      this.task = await BackendService.getTask(this.$route.params.id);
    } else {
      this.task = taskFromList;
    }
    if (!this.task.email) {
      this.task.email = "-";
    }
  },
  methods: {
    getTextColor(status) {
      if (status === "In Progress") return "blue--text";
      if (status === "Pending") return "blue-grey--text";
      if (status === "Finished") return "green--text";
      return "red--text";
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
</style>
