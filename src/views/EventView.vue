<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, CalendarDays, Filter } from 'lucide-vue-next'
import EventCalendar from '../components/EventCalendar.vue'
import EventDetail from '../components/EventDetail.vue'
import { events, type CalendarEvent } from '../data/events'

const search = ref('')
const filterTerminal = ref('')
const filterStatus = ref('')
const selectedEvent = ref<CalendarEvent | null>(null)

const terminals = ['Terminal 1', 'Terminal 2']

const filtered = computed(() => {
  return events.filter(e => {
    const matchSearch = !search.value || e.title.toLowerCase().includes(search.value.toLowerCase()) || e.division.toLowerCase().includes(search.value.toLowerCase())
    const matchTerminal = !filterTerminal.value || e.terminal === filterTerminal.value
    const matchStatus = !filterStatus.value || e.status === filterStatus.value
    return matchSearch && matchTerminal && matchStatus
  })
})

const totalOngoing = computed(() => events.filter(e => e.status === 'ongoing').length)
const totalToday = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return events.filter(e => e.date === today).length
})
</script>

<template>
  <div>
    <!-- Page header banner -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <div class="w-7 h-7 bg-blue-900 rounded-lg flex items-center justify-center">
                <CalendarDays :size="14" class="text-white" />
              </div>
              <p class="text-xs font-bold text-blue-700 uppercase tracking-widest">Jadwal Kegiatan</p>
            </div>
            <h1 class="text-2xl font-extrabold text-gray-900">Event</h1>
            <p class="text-gray-500 text-sm mt-0.5">Lihat jadwal penggunaan ruang dan kegiatan yang berlangsung.</p>
          </div>
          <div class="flex gap-3">
            <div class="text-center px-4 py-2 bg-green-50 border border-green-100 rounded-xl">
              <p class="text-xl font-bold text-green-700">{{ totalOngoing }}</p>
              <p class="text-xs text-green-600">Berlangsung</p>
            </div>
            <div class="text-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
              <p class="text-xl font-bold text-blue-700">{{ totalToday }}</p>
              <p class="text-xs text-blue-600">Hari Ini</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Filters bar -->
      <div class="bg-white rounded-2xl border border-gray-200 p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div class="flex items-center gap-2 text-gray-400 text-sm">
          <Filter :size="15" />
          <span class="font-medium text-gray-600">Filter:</span>
        </div>
        <div class="relative flex-1 min-w-[180px] max-w-xs">
          <Search :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="search"
            placeholder="Cari event atau divisi..."
            class="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
          />
        </div>
        <select
          v-model="filterTerminal"
          class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
        >
          <option value="">Semua Terminal</option>
          <option v-for="t in terminals" :key="t" :value="t">{{ t }}</option>
        </select>
        <select
          v-model="filterStatus"
          class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
        >
          <option value="">Semua Status</option>
          <option value="scheduled">Terjadwal</option>
          <option value="ongoing">Berlangsung</option>
          <option value="completed">Selesai</option>
        </select>
        <span class="text-xs text-gray-400 ml-auto">{{ filtered.length }} event</span>
      </div>

      <!-- Calendar -->
      <EventCalendar
        :events="filtered"
        @select-event="selectedEvent = $event"
      />
    </div>

    <EventDetail :event="selectedEvent" @close="selectedEvent = null" />
  </div>
</template>
