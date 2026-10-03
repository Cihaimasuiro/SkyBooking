<script setup lang="ts">
import { ref } from 'vue'
import { Bell } from 'lucide-vue-next'

const open = ref(false)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="relative">
    <button @click="toggle" class="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
      <Bell class="w-5 h-5" />
    </button>
  </div>
</template>
