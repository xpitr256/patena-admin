<template>
  <div class="about pa-6">
    <h1>Statistics</h1>
    <v-container fluid v-resize="onResize">
      <v-row dense>
        <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="cardWithCols"
            class="d-flex flex-column"
        >
          <v-card elevation="5" class="ma-2">
              <v-card-title>
                <span v-text="card.title"></span>
                <v-tooltip top v-if="card.subtitle">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        color="secondary"
                        dark
                        class="pl-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                      mdi-information
                    </v-icon>
                  </template>
                  <span v-text="card.subtitle"></span>
                </v-tooltip>
              </v-card-title>
              <v-card-text fill-height v-if="card.value" class="pt-6 text-center align-center text-h1 font-weight-bold" v-text="card.value" v-bind:class="card.style"></v-card-text>
              <PieChart v-if="card.type==='pie'"/>
              <v-simple-table v-if="card.type==='table'" class="text-center">
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
                  <tr
                      v-for="item in card.data"
                      :key="item.name"
                      class="font-weight-bold"
                      v-bind:class="item.style"
                  >
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
export default {
  components: {
    PieChart
  },
  data: () => ({
    cards: [
      { title: 'Success Rate', subtitle:'Calculated as amount of completed tasks / total tasks', value: '99,5%', style:'green lighten-1 white--text'},
      { title: 'AVG Task Completion Time', subtitle:'It is the average completion time of all completed tasks up to the current date', value: '45 min', style: 'grey lighten-3' },
      { title: 'Faster task completion Time', value: '3 min' , style:'green lighten-1 white--text'},
      { title: 'Slower task completion Time', value: '240 min', style:'red lighten-2 white--text'},
      { title: 'Task Queue status', type:'table', data: [{name:'In Progress', value: 2, style: 'blue--text'},{name:'Waiting', value: 5, style: 'blue-grey--text'},{name:'Finished', value: 245, style: 'green--text'},{name:'Cancelled', value: 4, style: 'red--text'}]},
      { title: 'Task Queue composition', type:'pie' },
    ],
    cardWithCols: 4,
  }),
  methods: {
    onResize () {
      if (window.innerWidth < 720) {
        this.cardWithCols = 12
      } else {
        this.cardWithCols = 6
      }
    }
  },
  mounted () {
    this.onResize()
  },
}
</script>