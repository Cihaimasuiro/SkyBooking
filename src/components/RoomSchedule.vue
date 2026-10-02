<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from 'lucide-vue-next'
import type { CalendarEvent } from '../data/events'

const props = defineProps<{
  events: CalendarEvent[]
  date: string
  roomId: string
}>()

const router = useRouter()

const colorMap: Record<string, string> = {
  blue:   'bg-blue-50 border-blue-200 text-blue-900',
  green:  'bg-emerald-50 border-emerald-200 text-emerald-900',
  purple: 'bg-violet-50 border-violet-200 text-violet-900',
  orange: 'bg-orange-50 border-orange-200 text-orange-900',
  red:    'bg-red-50 border-red-200 text-red-900',
  teal:   'bg-teal-50 border-teal-200 text-teal-900',
}

const slots = computed(() => {
  const hours = Array.from({ length: 15 }, (_, i) => i + 7)
  const result: Array<{ hour: number; event?: CalendarEvent; available: boolean }> = []

  for (const hour of hours) {
    const event = props.events.find(e => {
      if (e.date !== props.date || e.roomId !== props.roomId) return false
      const start = parseInt(e.startTime.split(':')[0])
      const end = parseInt(e.endTime.split(':')[0])
      return hour >= start && hour < end
    })
    result.push({ hour, event, available: !event })
  }
  return result
})

function goBooking(hour: number) {
  router.push({
    path: '/booking',
    query: {
      roomId: props.roomId,
      date: props.date,
      startTime: `${String(hour).padStart(2, '0')}:00`,
    },
  })
}
</script>

<template>
  <div class="space-y-1.5">
    <div
      v-for="(slot, i) in slots"
      :key="slot.hour"
      class="flex items-center gap-3 animate-slide-up"
      :style="{ animationDelay: `${i * 25}ms` }"
    >
      <!-- Time label -->
      <span class="text-xs text-gray-400 w-10 flex-shrink-0 font-mono text-right">
        {{ String(slot.hour).padStart(2, '0') }}:00
      </span>

      <!-- Booked slot -->
      <div
        v-if="slot.event"
        class="flex-1 rounded-xl px-3.5 py-2.5 border text-sm transition-all duration-200"
        :class="colorMap[slot.event.color ?? 'blue']"
      >
        <p class="font-semibold text-sm leading-tight">{{ slot.event.title }}</p>
        <p class="text-xs opacity-70 mt-0.5">
          {{ slot.event.startTime }} – {{ slot.event.endTime }} · {{ slot.event.division }}
        </p>
      </div>

      <!-- Available slot -->
      <div
        v-else
        class="flex-1 flex items-center justify-between rounded-xl px-3.5 py-2.5 border border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/70 cursor-pointer group"
        style="transition: background-color 0.15s ease, border-color 0.15s ease;"
        @click="goBooking(slot.hour)"
      >
        <span class="text-xs text-gray-400 group-hover:text-blue-600 font-medium transition-colors duration-150">Tersedia</span>
        <span class="flex items-center gap-1 text-xs text-blue-500 opacity-0 group-hover:opacity-100 font-semibold" style="transition: opacity 0.15s ease;">
          <Plus :size="12" />
          Booking
        </span>
      </div>
    </div>
  </div>
</template>
