<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { CalendarEvent } from '../data/events'

const props = defineProps<{ events: CalendarEvent[] }>()
const emit = defineEmits<{ selectEvent: [event: CalendarEvent] }>()

const currentDate = ref(new Date())

const hours = Array.from({ length: 14 }, (_, i) => i + 7) // 07 to 20

function startOfWeek(d: Date) {
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}

const weekStart = computed(() => {
  const d = new Date(currentDate.value)
  return startOfWeek(d)
})

const weekDays = computed(() => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart.value)
    d.setDate(d.getDate() + i)
    return d
  })
})

function fmtDate(d: Date) {
  return d.toISOString().split('T')[0]
}

function fmtDay(d: Date) {
  return d.toLocaleDateString('id-ID', { weekday: 'short' }).toUpperCase()
}

function fmtDayNum(d: Date) {
  return d.getDate()
}

function isToday(d: Date) {
  return fmtDate(d) === fmtDate(new Date())
}

function eventsForDayHour(date: Date, hour: number) {
  const dateStr = fmtDate(date)
  return props.events.filter(e => {
    if (e.date !== dateStr) return false
    const start = parseInt(e.startTime.split(':')[0])
    return start === hour
  })
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  red: 'bg-red-100 text-red-800 border-red-200',
  teal: 'bg-teal-100 text-teal-800 border-teal-200',
}

function eventClass(color?: string) {
  return colorMap[color ?? 'blue'] ?? colorMap.blue
}

function goToday() {
  currentDate.value = new Date()
}

const displayedDays = computed(() => weekDays.value)

function prevPeriod() {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() - 7)
  currentDate.value = d
}

function nextPeriod() {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() + 7)
  currentDate.value = d
}

const periodLabel = computed(() => {
  const start = weekDays.value[0]
  const end = weekDays.value[6]
  const s = start.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  const e = end.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  return `${s} – ${e}`
})
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <!-- Calendar toolbar -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <div class="flex items-center gap-2">
        <button @click="prevPeriod" class="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
          <ChevronLeft :size="18" />
        </button>
        <button @click="nextPeriod" class="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
          <ChevronRight :size="18" />
        </button>
        <button @click="goToday" class="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 text-gray-600 font-medium hidden sm:block">
          Hari Ini
        </button>
        <span class="text-xs sm:text-sm font-semibold text-gray-700 ml-1 sm:ml-2 truncate max-w-[140px] sm:max-w-none">{{ periodLabel }}</span>
      </div>
    </div>

    <!-- Calendar grid -->
    <div class="overflow-x-auto">
      <div class="min-w-[600px]">
        <!-- Header -->
        <div class="grid border-b border-gray-200" :style="`grid-template-columns: 56px repeat(${displayedDays.length}, 1fr)`">
          <div class="p-2"></div>
          <div
            v-for="day in displayedDays"
            :key="fmtDate(day)"
            class="p-2 text-center border-l border-gray-200"
          >
            <p class="text-xs text-gray-500 font-medium">{{ fmtDay(day) }}</p>
            <p
              class="text-lg font-bold mt-0.5 w-9 h-9 flex items-center justify-center rounded-full mx-auto"
              :class="isToday(day) ? 'bg-blue-900 text-white' : 'text-gray-900'"
            >
              {{ fmtDayNum(day) }}
            </p>
          </div>
        </div>

        <!-- Time rows -->
        <div class="max-h-[480px] overflow-y-auto">
          <div
            v-for="hour in hours"
            :key="hour"
            class="grid border-b border-gray-100"
            :style="`grid-template-columns: 56px repeat(${displayedDays.length}, 1fr)`"
          >
            <div class="py-3 px-2 text-xs text-gray-400 text-right pr-3 leading-none pt-3">
              {{ String(hour).padStart(2, '0') }}:00
            </div>
            <div
              v-for="day in displayedDays"
              :key="fmtDate(day)"
              class="border-l border-gray-100 p-1 min-h-[56px] overflow-hidden"
            >
              <div
                v-for="event in eventsForDayHour(day, hour)"
                :key="event.id"
                class="w-full overflow-hidden rounded-md px-2 py-1 mb-1 cursor-pointer text-xs border transition-all duration-150 hover:-translate-y-px hover:shadow-md hover:brightness-105 active:scale-95"
                :class="eventClass(event.color)"
                @click="emit('selectEvent', event)"
              >
                <p class="font-semibold leading-tight truncate">{{ event.title }}</p>
                <p class="opacity-70 mt-0.5 truncate">{{ event.startTime }}–{{ event.endTime }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
