<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import {
  VApp,
  VMain,
  VContainer,
  VRow,
  VCol,
  VCard,
  VCardTitle,
  VCardText,
  VAvatar,
  VBtn,
  VIcon,
} from 'vuetify/components'

const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'dark')

function toggleTheme() {
  const nextTheme = isDark.value ? 'light' : 'dark'
  theme.global.name.value = nextTheme
  localStorage.setItem('lesson6-theme', nextTheme)
}

onMounted(() => {
  const saved = localStorage.getItem('lesson6-theme') as 'dark' | 'light' | null
  if (saved) {
    theme.global.name.value = saved
  }
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" lg="5">
            <v-card class="mx-auto" elevation="10" rounded="lg">
              <v-row align="center" justify="space-between" class="pa-6">
                <v-avatar size="96" class="elevation-3">
                  <span class="text-h6 font-weight-bold">KM</span>
                </v-avatar>

                <v-btn variant="tonal" size="small" @click="toggleTheme">
                  <v-icon left>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
                  {{ isDark ? 'Light mode' : 'Dark mode' }}
                </v-btn>
              </v-row>

              <v-card-title class="text-h5 pt-0">Krissy Morency</v-card-title>
              <v-card-text class="pb-6">
                Designer building elegant digital experiences for brands and businesses.
              </v-card-text>

              <v-row class="px-6 pb-6" dense>
                <v-col cols="12">
                  <v-btn block variant="tonal" class="mb-3" href="https://krissymorency.myportfolio.com" target="_blank" rel="noopener noreferrer">
                    <v-icon left>mdi-palette</v-icon>
                    Portfolio
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-btn block variant="tonal" class="mb-3" href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">
                    <v-icon left>mdi-basketball</v-icon>
                    Dribbble
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-btn block variant="tonal" class="mb-3" href="https://linkedin.com/in/krissy-morency" target="_blank" rel="noopener noreferrer">
                    <v-icon left>mdi-linkedin</v-icon>
                    LinkedIn
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-btn block variant="tonal" href="mailto:kfmorency@yahoo.com">
                    <v-icon left>mdi-email</v-icon>
                    Email
                  </v-btn>
                </v-col>
              </v-row>

              <v-card-text class="text-center pb-6">Made with coffee & Copilot</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-card {
  min-height: 100%;
}
</style>
