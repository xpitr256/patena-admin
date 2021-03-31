<template>
  <div class="about pa-6">
    <h1>Statistics</h1>
    <ul>
      <li>Tasa de exito (completadas/totales)</li>
      <li>Tiempo promedio de todas las tareas completadas hasta la fecha</li>
      <li>Tiempo de la tarea más rapida</li>
      <li>Tiempo de la tarea más lenta</li>
      <li>Composición de la cola de tareas de diseño(grafico de torta: cantidad de only sequence, nothing, only flanking, all)</li>
      <li>Estado actual de la cola (cuantas en curso y cuantas esperando)</li>
    </ul>

    <v-container fluid v-resize="onResize">
      <v-row dense>
        <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="cardWithCols"
            class="d-flex flex-column"
        >
          <v-card elevation="10" class="flex d-flex flex-column">
              <v-card-title v-text="card.title"></v-card-title>
              <v-card-subtitle v-text="card.subtitle" class="flex"></v-card-subtitle>
              <v-card-text class="pt-6 text-center text-h1 font-weight-bold" v-text="card.value" v-bind:class="card.style"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  data: () => ({
    cards: [
      { title: 'Success Rate', subtitle:'Calculated as amount of completed tasks / total tasks', value: '99,5%', style:'green lighten-1 white--text'},
      { title: 'AVG Task Completion Time', subtitle:'It is the average completion time of all completed tasks up to the current date', value: '45 min', style: 'grey lighten-3' },
      { title: 'Faster task completion time', value: '3 min' , style:'green lighten-1 white--text'},
      { title: 'Slower task completion Time', value: '240 min', style:'red lighten-2 white--text'},
    ],
    cardWithCols: 4,
  }),
  methods: {
    onResize () {
      if (window.innerWidth < 720) {
        this.cardWithCols = 12
      } else if (window.innerWidth > 720 && window.innerWidth < 1210) {
        this.cardWithCols = 6
      } else {
        this.cardWithCols = 4
      }
    }
  },
  mounted () {
    this.onResize()
  },
}
</script>