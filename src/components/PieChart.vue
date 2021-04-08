<template>
  <div>
    <canvas id="pie-chart"></canvas>
  </div>
</template>

<script>
import pieChartData from './pie-data.js'
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.plugins.register(ChartDataLabels);

export default {
name: "PieChart",
  components: {
    ChartDataLabels,
  },
  data() {
    return {
      pieChartData: pieChartData
    }
  },
  mounted() {
    const ctx = document.getElementById('pie-chart');
    new Chart(ctx, this.pieChartData);
  }
}
</script>

<style scoped>

</style>