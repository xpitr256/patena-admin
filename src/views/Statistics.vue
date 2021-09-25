<template>
  <div class="pa-6">
    <h1>Statistics</h1>
    <v-container fluid v-resize="onResize">
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="cardWithCols" class="d-flex flex-column">
          <v-card elevation="5" class="ma-2" :loading="card.loading">
            <template slot="progress">
              <v-progress-linear color="primary" height="5" indeterminate></v-progress-linear>
            </template>
            <v-card-title>
              <span v-text="card.title"></span>
              <v-tooltip top v-if="card.subtitle && !card.error">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="secondary" dark class="pl-2" v-bind="attrs" v-on="on">
                    mdi-information
                  </v-icon>
                </template>
                <span v-text="card.subtitle"></span>
              </v-tooltip>
              <v-tooltip top v-if="card.error">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="red darken-2" dark class="pl-2" v-bind="attrs" v-on="on">
                    mdi-alert
                  </v-icon>
                </template>
                <span v-text="card.error"></span>
              </v-tooltip>
            </v-card-title>
            <v-card-text
              fill-height
              v-if="card.value"
              v-html="card.value"
              class="pt-6 text-center align-center text-h1 font-weight-bold"
              v-bind:class="card.style"
            ></v-card-text>
            <PieChart v-if="card.type === 'pie'" v-show="!card.loading" v-bind:chart-data="card.data" />
            <v-simple-table v-if="card.type === 'table'" class="text-center" v-show="!card.loading">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center font-weight-bold text-lg-subtitle-1">
                      Status
                    </th>
                    <th class="text-center font-weight-bold text-lg-subtitle-1">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in card.data" :key="item.name" class="font-weight-bold" v-bind:class="item.style">
                    <td>{{ item.name }}</td>
                    <td>{{ item.value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PieChart from "@/components/PieChart";
import BackendService from "../services/BackendService";

export default {
  components: {
    PieChart
  },
  data: () => ({
    cards: [
      {
        title: "Success Rate",
        subtitle: "Calculated as amount of completed tasks / total tasks",
        style: "green lighten-1 white--text",
        value: "&nbsp;",
        loading: true,
        loadingColor: "white"
      },
      {
        title: "AVG Task Completion Time",
        subtitle: "It is the average completion time of all completed tasks up to the current date",
        value: "&nbsp;",
        style: "grey lighten-3",
        loading: true,
        loadingColor: "primary"
      },
      { title: "Faster task completion Time", value: "&nbsp;", style: "green lighten-1 white--text", loading: true, loadingColor: "white" },
      { title: "Slower task completion Time", value: "&nbsp;", style: "red lighten-2 white--text", loading: true, loadingColor: "white" },
      {
        title: "Task Queue status",
        loading: true,
        type: "table",
        data: [{ style: "blue--text" }, { style: "blue-grey--text" }, { style: "green--text" }, { style: "red--text" }]
      },
      {
        title: "Task Queue composition",
        loading: true,
        type: "pie"
      }
    ],
    cardWithCols: 4
  }),
  methods: {
    onResize() {
      if (window.innerWidth < 720) {
        this.cardWithCols = 12;
      } else {
        this.cardWithCols = 6;
      }
    },
    async getSuccessRate() {
      const response = await BackendService.getSuccessRate();
      if (!response.error) {
        this.cards[0].value = response.success_rate + "%";
      } else {
        this.cards[0].error = response.error;
        this.cards[0].value = "-";
      }
      this.cards[0].loading = false;
    },
    async getAverageProcessingTime() {
      const response = await BackendService.getAverageProcessingTime();
      if (!response.error) {
        this.cards[1].value = response.avg_minutes + " min";
      } else {
        this.cards[1].error = response.error;
        this.cards[1].value = "-";
      }
      this.cards[1].loading = false;
    },
    async getFastestProcessingTime() {
      const response = await BackendService.getFastestProcessingTime();
      if (!response.error) {
        this.cards[2].value = response.time_minutes + " min";
      } else {
        this.cards[2].error = response.error;
        this.cards[2].value = "-";
      }
      this.cards[2].loading = false;
    },
    async getSlowestProcessingTime() {
      const response = await BackendService.getSlowestProcessingTime();
      if (!response.error) {
        this.cards[3].value = response.time_minutes + " min";
      } else {
        this.cards[3].error = response.error;
        this.cards[4].value = "-";
      }
      this.cards[3].loading = false;
    },
    async getQueueStatus() {
      const response = await BackendService.getQueueStatus();
      if (!response.error) {
        this.cards[4].data = response.map((element, index) => {
          return {
            name: element.name,
            value: element.value,
            style: this.cards[4].data[index].style
          };
        });
      } else {
        this.cards[4].error = response.error;
      }
      this.cards[4].loading = false;
    },
    async getQueueDesignTaskComposition() {
      const response = await BackendService.getQueueDesignTaskComposition();
      if (!response.error) {
        this.cards[5].data = response;
      } else {
        this.cards[5].error = response.error;
      }
      this.cards[5].loading = false;
    }
  },
  mounted() {
    this.onResize();
    this.getSuccessRate();
    this.getAverageProcessingTime();
    this.getFastestProcessingTime();
    this.getSlowestProcessingTime();
    this.getQueueStatus();
    this.getQueueDesignTaskComposition();
  }
};
</script>
