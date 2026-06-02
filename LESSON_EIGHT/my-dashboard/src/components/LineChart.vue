<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

const props = defineProps<{ data: any; options: any }>()
</script>

<template>
  <div class="chart-wrapper">
    <Line :data="props.data" :options="props.options" />
  </div>
</template>

<style scoped>
.chart-wrapper {
  min-height: 320px;
}
</style>
