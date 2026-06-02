<template>
  <div class="profile-card">
    <v-row align="center" class="pa-0" no-gutters>
      <v-avatar size="96" class="elevation-3 mr-4">
        <span class="text-h6 font-weight-bold">{{ initials }}</span>
      </v-avatar>

      <div>
        <div class="text-h6 font-weight-medium">{{ name }}</div>
        <div class="text-body-2 text--secondary">{{ bio }}</div>
      </div>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  bio?: string
  initials?: string
}>()

const initials = props.initials ?? props.name.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase()
</script>

<style scoped>
.profile-card {
  display: flex;
  align-items: center;
}
</style>
