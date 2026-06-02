<template>
  <v-btn
    block
    height="56"
    variant="tonal"
    :href="url"
    :target="openInNewTab ? '_blank' : undefined"
    rel="noopener noreferrer"
  >
    <v-icon left v-if="icon" class="icon">{{ icon }}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VBtn, VIcon } from 'vuetify/components'

const props = defineProps<{
  label: string
  url: string
  icon?: string
  openInNewTab?: boolean
}>()

const openInNewTab = computed(() => props.openInNewTab ?? true)
</script>

<style scoped>
.icon {
  margin-right: 12px;
}
</style>
