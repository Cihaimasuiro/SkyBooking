<script setup lang="ts">
import { Inbox } from 'lucide-vue-next'
defineProps<{ title?: string; description?: string }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Inbox :size="28" class="text-gray-400" />
    </div>
    <p class="text-base font-medium text-gray-700">{{ title ?? 'Tidak ada data' }}</p>
    <p v-if="description" class="text-sm text-gray-500 mt-1 max-w-xs">{{ description }}</p>
  </div>
</template>
