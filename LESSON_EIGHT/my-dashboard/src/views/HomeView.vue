<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import LineChart from '@/components/LineChart.vue'

const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'dark')

function toggleTheme() {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-card elevation="10" rounded="lg" class="pa-6">
            <v-row align="center" justify="space-between" class="mb-4">
              <div>
                <h1 class="text-h4 mb-2">My Dashboard</h1>
                <p class="text-subtitle-1">A data-driven dashboard built with Vue, Vuetify, and Chart.js.</p>
              </div>
              <v-btn variant="tonal" @click="toggleTheme">
                <v-icon left>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
                {{ isDark ? 'Light' : 'Dark' }} Theme
              </v-btn>
            </v-row>

            <v-row class="gap-4">
              <v-col cols="12" md="6">
                <v-sheet rounded="lg" class="pa-4">
                  <div class="text-subtitle-1 mb-2">Monthly Revenue</div>
                  <div class="text-h5 font-weight-bold">$42,300</div>
                  <div class="text-body-2 text-muted">Up 12% from last month</div>
                </v-sheet>
              </v-col>
              <v-col cols="12" md="6">
                <v-sheet rounded="lg" class="pa-4">
                  <div class="text-subtitle-1 mb-2">Active Users</div>
                  <div class="text-h5 font-weight-bold">8,420</div>
                  <div class="text-body-2 text-muted">Stable engagement</div>
                </v-sheet>
              </v-col>
            </v-row>

            <v-card class="mt-6 pa-4" elevation="2" rounded="lg">
              <div class="text-subtitle-1 mb-4 font-weight-medium">Visitor Trend</div>
              <LineChart />
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
