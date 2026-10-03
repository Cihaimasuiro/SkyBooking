<script setup lang="ts">
import { useCountUp } from '../composables/useCountUp'

const props = defineProps<{
  label: string
  value: number
  icon: any
  color: 'blue' | 'green' | 'orange' | 'red'
  trend?: string
  index?: number
}>()

const displayed = useCountUp(props.value, 900)

const colorMap = {
  blue:   { bg: 'bg-blue-50',   icon: 'bg-blue-600',   border: 'border-blue-100/80' },
  green:  { bg: 'bg-green-50',  icon: 'bg-emerald-600', border: 'border-emerald-100/80' },
  orange: { bg: 'bg-orange-50', icon: 'bg-orange-500', border: 'border-orange-100/80' },
  red:    { bg: 'bg-red-50',    icon: 'bg-red-500',    border: 'border-red-100/80' },
}
</script>

<template>
  <div
    class="bg-white rounded-2xl border p-5 card-lift cursor-default animate-slide-up"
    :class="colorMap[color].border"
    :style="{ animationDelay: `${(index ?? 0) * 80 + 60}ms` }"
  >
    <div class="flex items-start justify-between mb-4">
      <div
        class="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm card-icon"
        :class="colorMap[color].icon"
      >
        <component :is="icon" :size="20" class="text-white" />
      </div>
    </div>
    <p class="text-4xl font-black text-gray-900 leading-none tabular-nums">{{ displayed }}</p>
    <p class="text-sm font-semibold text-gray-700 mt-1.5">{{ label }}</p>
    <p v-if="trend" class="text-xs text-gray-400 mt-0.5">{{ trend }}</p>
  </div>
</template>
