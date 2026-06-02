<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import LineChart from '@/components/LineChart.vue'
import rawMetrics from '@/data/metrics.json'

type Metric = {
  month: string
  year: number
  revenue: number
  visitors: number
  conversions: number
  orders: number
}

const metrics = rawMetrics as Metric[]

const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'dark')

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

const selectedMonth = ref('ALL')
const monthOptions = ['ALL', ...metrics.map((item) => item.month)]

const selectedMetric = computed(() =>
  selectedMonth.value === 'ALL'
    ? null
    : metrics.find((item) => item.month === selectedMonth.value) ?? null
)

const totals = computed(() => {
  const revenue = metrics.reduce((sum, item) => sum + item.revenue, 0)
  const visitors = metrics.reduce((sum, item) => sum + item.visitors, 0)
  const conversions = metrics.reduce((sum, item) => sum + item.conversions, 0) / metrics.length
  const orders = metrics.reduce((sum, item) => sum + item.orders, 0)
  return { revenue, visitors, conversions, orders }
})

const summary = computed(() => {
  if (selectedMonth.value === 'ALL') {
    return {
      revenue: totals.value.revenue,
      visitors: totals.value.visitors,
      conversions: totals.value.conversions,
      orders: totals.value.orders,
    }
  }

  return {
    revenue: selectedMetric.value?.revenue ?? 0,
    visitors: selectedMetric.value?.visitors ?? 0,
    conversions: selectedMetric.value?.conversions ?? 0,
    orders: selectedMetric.value?.orders ?? 0,
  }
})

const previousMetric = computed(() => {
  if (selectedMonth.value === 'ALL') {
    return metrics[metrics.length - 2]
  }
  const index = metrics.findIndex((item) => item.month === selectedMonth.value)
  return index > 0 ? metrics[index - 1] : null
})

const changeData = computed(() => {
  const base = selectedMonth.value === 'ALL' ? metrics[metrics.length - 1] : selectedMetric.value
  const previous = previousMetric.value
  if (!base || !previous) {
    return {
      revenue: null,
      visitors: null,
      conversions: null,
      orders: null,
    }
  }

  const percentChange = (current: number, prior: number) =>
    prior === 0 ? 0 : ((current - prior) / prior) * 100

  return {
    revenue: percentChange(base.revenue, previous.revenue),
    visitors: percentChange(base.visitors, previous.visitors),
    conversions: percentChange(base.conversions, previous.conversions),
    orders: percentChange(base.orders, previous.orders),
  }
})

const summaryCards = computed(() => [
  {
    title: 'Revenue',
    value: summary.value.revenue,
    suffix: '',
    format: 'currency' as const,
    change: changeData.value.revenue,
  },
  {
    title: 'Visitors',
    value: summary.value.visitors,
    suffix: '',
    format: 'number' as const,
    change: changeData.value.visitors,
  },
  {
    title: 'Conversion Rate',
    value: summary.value.conversions,
    suffix: '%',
    format: 'percent' as const,
    change: changeData.value.conversions,
  },
  {
    title: 'Orders',
    value: summary.value.orders,
    suffix: '',
    format: 'number' as const,
    change: changeData.value.orders,
  },
])

const revenueChartData = computed(() => ({
  labels: metrics.map((item) => item.month),
  datasets: [
    {
      label: 'Revenue',
      data: metrics.map((item) => item.revenue),
      backgroundColor: metrics.map((item) =>
        selectedMonth.value === item.month ? 'rgba(100, 181, 246, 0.95)' : 'rgba(66, 133, 244, 0.35)'
      ),
      borderColor: 'rgba(100, 181, 246, 0.95)',
      borderWidth: 2,
      borderRadius: 10,
      barThickness: 28,
    },
  ],
}))

const visitorsChartData = computed(() => ({
  labels: metrics.map((item) => item.month),
  datasets: [
    {
      label: 'Visitors',
      data: metrics.map((item) => item.visitors),
      borderColor: 'rgba(38, 198, 218, 0.95)',
      backgroundColor: 'rgba(38, 198, 218, 0.12)',
      tension: 0.35,
      pointBackgroundColor: metrics.map((item) =>
        selectedMonth.value === item.month ? '#26c6da' : 'rgba(255,255,255,0.5)'
      ),
      pointBorderColor: '#26c6da',
      pointRadius: 5,
      fill: false,
      borderWidth: 3,
    },
  ],
}))

const conversionsChartData = computed(() => ({
  labels: metrics.map((item) => item.month),
  datasets: [
    {
      label: 'Conversion Rate',
      data: metrics.map((item) => item.conversions),
      borderColor: 'rgba(102, 187, 106, 0.95)',
      backgroundColor: 'rgba(102, 187, 106, 0.18)',
      tension: 0.35,
      fill: true,
      pointBackgroundColor: metrics.map((item) =>
        selectedMonth.value === item.month ? '#66bb6a' : 'rgba(255,255,255,0.4)'
      ),
      pointBorderColor: '#66bb6a',
      pointRadius: 5,
      borderWidth: 3,
    },
  ],
}))

const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: '#212121',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#ffffff',
      },
    },
    y: {
      grid: {
        color: 'rgba(255,255,255,0.08)',
      },
      ticks: {
        color: '#ffffff',
      },
    },
  },
}

const revenueOptions = {
  ...commonChartOptions,
  plugins: {
    ...commonChartOptions.plugins,
    tooltip: {
      ...commonChartOptions.plugins.tooltip,
      callbacks: {
        label: (context: any) => `$${context.parsed.y.toLocaleString()}`,
      },
    },
  },
}

const visitorsOptions = {
  ...commonChartOptions,
  plugins: {
    ...commonChartOptions.plugins,
    tooltip: {
      ...commonChartOptions.plugins.tooltip,
      callbacks: {
        label: (context: any) => `${context.parsed.y.toLocaleString()} visitors`,
      },
    },
  },
}

const conversionsOptions = {
  ...commonChartOptions,
  plugins: {
    ...commonChartOptions.plugins,
    tooltip: {
      ...commonChartOptions.plugins.tooltip,
      callbacks: {
        label: (context: any) => `${context.parsed.y.toFixed(1)}%`,
      },
    },
  },
}

const formatValue = (value: number, type: 'currency' | 'number' | 'percent') => {
  if (type === 'currency') {
    return `$${value.toLocaleString()}`
  }
  if (type === 'percent') {
    return `${value.toFixed(1)}%`
  }
  return value.toLocaleString()
}

const formatChange = (raw: number | null) => {
  if (raw === null) return '—'
  const sign = raw >= 0 ? '+' : ''
  return `${sign}${raw.toFixed(1)}%`
}
</script>

<template>
  <v-main>
    <v-app-bar elevated>
      <v-toolbar-title>My Dashboard</v-toolbar-title>
      <v-spacer />
      <v-select
        v-model="selectedMonth"
        :items="monthOptions"
        label="Month"
        variant="filled"
        density="comfortable"
        style="max-width: 200px"
      />
      <v-btn variant="tonal" class="ms-4" @click="toggleTheme">
        <v-icon left>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
        {{ isDark ? 'Light' : 'Dark' }}
      </v-btn>
    </v-app-bar>

    <v-container fluid class="py-6">
      <v-row class="mb-4" align="stretch" dense>
        <v-col cols="12" sm="6" md="3" v-for="card in summaryCards" :key="card.title">
          <v-card elevation="4" rounded="lg" class="pa-4 summary-card">
            <div class="d-flex justify-space-between align-center mb-4">
              <div>
                <div class="text-subtitle-2 text-uppercase text-opacity-70">{{ card.title }}</div>
                <div class="summary-value">{{ formatValue(card.value, card.format) }}{{ card.suffix }}</div>
              </div>
              <div :class="['change-pill', card.change !== null ? (card.change >= 0 ? 'positive' : 'negative') : 'neutral']">
                <v-icon size="18">{{ card.change === null ? 'mdi-minus' : card.change >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                <span>{{ formatChange(card.change) }}</span>
              </div>
            </div>
            <div class="text-body-2 text-opacity-70">
              {{ selectedMonth === 'ALL' ? 'Year total / average' : 'Compared to last month' }}
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12" md="6">
          <v-card elevation="4" rounded="lg" class="pa-4 chart-card">
            <div class="text-subtitle-1 mb-3">Monthly Revenue</div>
            <LineChart :data="revenueChartData" :options="revenueOptions" />
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="4" rounded="lg" class="pa-4 chart-card">
            <div class="text-subtitle-1 mb-3">Visitors Trend</div>
            <LineChart :data="visitorsChartData" :options="visitorsOptions" />
          </v-card>
        </v-col>
      </v-row>

      <v-row dense class="mt-4">
        <v-col cols="12">
          <v-card elevation="4" rounded="lg" class="pa-4 chart-card">
            <div class="text-subtitle-1 mb-3">Conversion Rate</div>
            <LineChart :data="conversionsChartData" :options="conversionsOptions" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.summary-card {
  min-height: 170px;
}
.summary-value {
  font-size: 1.65rem;
  font-weight: 700;
  margin-top: 0.5rem;
}
.change-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}
.change-pill.positive {
  background: rgba(76, 175, 80, 0.16);
  color: #a5d6a7;
}
.change-pill.negative {
  background: rgba(244, 67, 54, 0.16);
  color: #ef9a9a;
}
.change-pill.neutral {
  background: rgba(189, 189, 189, 0.14);
  color: #e0e0e0;
}
.chart-card {
  min-height: 380px;
}
</style>
