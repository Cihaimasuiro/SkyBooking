<script setup lang="ts">
import { MapPin, Clock } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'
import EmptyState from './EmptyState.vue'
import type { CalendarEvent } from '../data/events'

const props = defineProps<{ events: CalendarEvent[] }>()

const colorLeft: Record<string, string> = {
  blue:   'bg-blue-500',
  green:  'bg-emerald-500',
  purple: 'bg-violet-500',
  orange: 'bg-orange-500',
  red:    'bg-red-500',
  teal:   'bg-teal-500',
}

function delay(i: number) {
  return `${i * 60}ms`
}
</script>

<template>
  <div v-if="props.events.length === 0">
    <EmptyState title="Tidak ada event hari ini" />
  </div>
  <TransitionGroup
    v-else
    tag="div"
    name="list-item"
    class="space-y-3 relative"
  >
    <div
      v-for="(event, i) in props.events"
      :key="event.id"
      class="flex gap-3 group cursor-default animate-slide-up"
      :style="{ animationDelay: delay(i) }"
    >
      <!-- Color strip + time -->
      <div class="flex flex-col items-center gap-1 pt-1 w-14 flex-shrink-0">
        <span class="text-xs font-bold text-gray-700 leading-none">{{ event.startTime }}</span>
        <div class="w-0.5 flex-1 min-h-6 rounded-full" :class="colorLeft[event.color ?? 'blue']"></div>
      </div>

      <!-- Card -->
      <div
        class="flex-1 rounded-xl border border-gray-100 bg-gray-50 group-hover:bg-white group-hover:border-gray-200 group-hover:shadow-sm p-3 mb-1"
        style="transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="text-sm font-semibold text-gray-900 leading-tight truncate">{{ event.title }}</p>
            <div class="flex flex-wrap items-center gap-2 mt-1.5">
              <span class="flex items-center gap-1 text-xs text-gray-500">
                <Clock :size="11" />
                {{ event.startTime }} – {{ event.endTime }}
              </span>
              <span class="flex items-center gap-1 text-xs text-gray-500">
                <MapPin :size="11" />
                {{ event.roomName }}
              </span>
            </div>
            <p class="text-xs text-gray-400 mt-1">{{ event.division }}</p>
          </div>
          <StatusBadge :status="event.status" class="flex-shrink-0 mt-0.5" />
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>
