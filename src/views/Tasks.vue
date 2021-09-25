<template>
  <div class="pa-6">
    <h1>Tasks</h1>
    <v-form ref="form" v-on:submit.prevent="loadTask">
      <v-container>
        <v-row>
          <v-col sm="4" class="pl-0">
            <v-text-field
              outlined
              label="Order number"
              prepend-inner-icon="mdi-magnify"
              v-model="orderNumber"
              :error-messages="orderNumberError"
              @paste="onPaste"
            ></v-text-field>
          </v-col>
          <v-col sm="2">
            <v-select :items="taskStatuses" v-model="taskStatus" label="Task status" @change="taskStatusChanged" outlined></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-data-table
      :headers="headers"
      :items="tasks"
      class="elevation-5 table-cursor"
      @click:row="showDetails"
      @update:options="updateOptions"
      :options.sync="options"
      :server-items-length="totalTasks"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 25]
      }"
      :loading="loading"
    >
      <template v-slot:item.status="{ item }">
        <v-chip :color="getColor(item.status)" dark label class="font-weight-bold">
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.email="{ item }">
        {{ item.taskData.email }}
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
        <v-btn color="primary" @click="loadTasks">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import BackendService from "../services/BackendService";
import constants from "../constants";

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
    tasks: [],
    orderNumberError: [],
    taskStatuses: constants.getTaskStatuses(),
    options: {},
    totalTasks: 0,
    orderNumber: "",
    taskStatus: "All",
    page: 1,
    itemsPerPage: 10,
    loading: true,
    initialLoadIsDone: false
  }),
  watch: {
    orderNumber: function(val) {
      if (val.length === 0) {
        var self = this;
        setTimeout(function() {
          self.cleanOrderNumberErrors();
        }, 1000);
      }
    },
    options: {
      handler() {
        this.loadTasks();
      },
      deep: true
    }
  },
  created() {
    if (localStorage.taskStatus) {
      this.taskStatus = localStorage.taskStatus;
    }
    if (localStorage.itemsPerPage) {
      this.itemsPerPage = Number(localStorage.itemsPerPage);
      this.options.itemsPerPage = Number(localStorage.itemsPerPage);
    }
    if (localStorage.page) {
      this.page = Number(localStorage.page);
      this.options.page = Number(localStorage.page);
    }
  },
  mounted() {
    this.initialLoadIsDone = true;
  },
  methods: {
    async loadTasks() {
      this.loading = true;
      const count = this.itemsPerPage;
      const offset = Number(this.page - 1);
      const response = await BackendService.getTasks(count, offset, this.taskStatus);
      this.tasks = response.tasks;
      this.totalTasks = response.total;
      this.loading = false;
    },
    updateOptions(options) {
      if (this.initialLoadIsDone) {
        if (options.itemsPerPage) {
          localStorage.itemsPerPage = options.itemsPerPage;
          this.itemsPerPage = options.itemsPerPage;
        }
        if (options.page) {
          localStorage.page = options.page;
          this.page = options.page;
        }
      }
    },
    onPaste(e) {
      setTimeout(() => {
        this.loadTask(e);
      }, 100);
    },
    taskStatusChanged(selected) {
      localStorage.taskStatus = selected;
      this.loadTasks();
    },
    cleanOrderNumberErrors() {
      this.orderNumberError = [];
    },
    validOrderNumber() {
      if (!this.orderNumber) {
        return {
          valid: false,
          message: "Order number is required"
        };
      }

      if (this.orderNumber.length !== 36) {
        return {
          valid: false,
          message: "Order number must has 36 characters"
        };
      }
      return {
        valid: true
      };
    },
    async loadTask(e) {
      e.preventDefault();
      this.cleanOrderNumberErrors();
      const orderNumberValidation = this.validOrderNumber();
      if (orderNumberValidation.valid) {
        this.$Progress.start();
        const task = await BackendService.getTask(this.orderNumber);
        this.$Progress.finish();
        if (!task.error) {
          this.showDetails(task);
        } else {
          this.orderNumberError.push(task.error);
        }
      } else {
        this.orderNumberError.push(orderNumberValidation.message);
      }
    },
    showDetails(item) {
      this.$router.push({ name: "Task", params: { id: item.id, task: item } });
    },
    getColor(status) {
      if (status === "In Progress") return "blue";
      if (status === "Pending") return "blue-grey";
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
