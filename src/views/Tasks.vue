<template>
  <div class="pa-6">
    <h1>Tasks</h1>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field outlined label="Order number" prepend-inner-icon="mdi-magnify"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-data-table :headers="headers" :items="tasks" class="elevation-5 table-cursor" @click:row="showDetails">
      <template v-slot:item.status="{ item }">
        <v-chip :color="getColor(item.status)" dark label class="font-weight-bold">
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.email="{ item }">
        {{ item.email }}
        <v-icon left small color="green" v-if="item.emailSent">
          mdi-check-bold
        </v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn :to="{ name: 'Task', params: { id: item.id, task: item } }" fab x-small color="info" class="ma-2">
          <v-icon>
            mdi-file-find
          </v-icon>
        </v-btn>
        <v-btn
          v-if="item.status === 'Cancelled'"
          :to="{ name: 'Task', params: { id: item.id, task: item } }"
          class="mx-2 white--text"
          fab
          x-small
          color="amber darken-3"
        >
          <v-icon>
            mdi-reload
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import BackendService from "../services/BackendService";

export default {
  name: "Tasks",
  data: () => ({
    headers: [
      { text: "Order Number", value: "id", sortable: false },
      { text: "Status", value: "status" },
      { text: "Creation Date", value: "date" },
      { text: "Email", value: "email" },
      { text: "Type", value: "type" },
      { text: "Duration (min)", value: "duration" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    tasks: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.tasks = await BackendService.getTasks();
    },
    showDetails(item) {
      this.$router.push({ name: "Task", params: { id: item.id, task: item } });
    },
    getColor(status) {
      if (status === "In Progress") return "blue";
      if (status === "Waiting") return "blue-grey";
      if (status === "Finished") return "green";
      return "red";
    }
  }
};
</script>
<style>
.table-cursor tbody tr:hover {
  cursor: pointer;
}
</style>
