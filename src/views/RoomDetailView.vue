<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, MapPin, Users, Clock, CheckCircle, CalendarDays } from 'lucide-vue-next'
import StatusBadge from '../components/StatusBadge.vue'
import RoomSchedule from '../components/RoomSchedule.vue'
import { rooms } from '../data/rooms'
import { events } from '../data/events'

const route = useRoute()
const router = useRouter()

const room = computed(() => rooms.find(r => r.id === route.params.id))
const today = new Date().toISOString().split('T')[0]
const selectedDate = ref(today)

const roomEvents = computed(() => events.filter(e => e.roomId === room.value?.id))

function goBooking() {
  router.push({ path: '/booking', query: { roomId: room.value?.id } })
}

const gradients: Record<string, string> = {
  R001: 'from-blue-900 to-blue-700',
  R002: 'from-indigo-900 to-indigo-700',
  R003: 'from-violet-900 to-violet-700',
  R004: 'from-slate-800 to-slate-600',
  R005: 'from-cyan-900 to-cyan-700',
  R006: 'from-teal-900 to-teal-700',
  R007: 'from-blue-950 to-blue-800',
  R008: 'from-gray-900 to-gray-700',
  R009: 'from-sky-900 to-sky-700',
  R010: 'from-navy-900 to-blue-800',
}
</script>

<template>
  <div v-if="room">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <button
          @click="router.back()"
          class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft :size="15" class="group-hover:-translate-x-0.5 transition-transform" />
          Kembali ke Daftar Venue
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid lg:grid-cols-3 gap-5">
        <!-- Left sidebar -->
        <div class="lg:col-span-1 space-y-4">

          <!-- Room hero card -->
          <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="h-44 relative overflow-hidden">
              <img
                v-if="room.image"
                :src="room.image"
                :alt="room.name"
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br"
                :class="gradients[room.id] ?? 'from-blue-900 to-blue-700'"
              />
              <!-- Dark overlay for text readability -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <StatusBadge :status="room.status" class="mb-2" />
                <h1 class="text-xl font-extrabold text-white leading-tight">{{ room.name }}</h1>
                <p class="text-white/70 text-sm mt-0.5">{{ room.terminal }}</p>
              </div>
            </div>
            <div class="px-5 py-4">
              <div class="flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin :size="14" class="text-gray-400" />
                {{ room.location }}
              </div>
            </div>
          </div>

          <!-- Info card -->
          <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Detail Venue</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-2 text-gray-500">
                  <Users :size="15" class="text-gray-400" />
                  Kapasitas
                </span>
                <span class="font-bold text-gray-900">{{ room.capacity }} orang</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-2 text-gray-500">
                  <Clock :size="15" class="text-gray-400" />
                  Jam Operasional
                </span>
                <span class="font-bold text-gray-900">07:00 – 22:00</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-2 text-gray-500">
                  <CalendarDays :size="15" class="text-gray-400" />
                  Total Event
                </span>
                <span class="font-bold text-gray-900">{{ roomEvents.length }} event</span>
              </div>
            </div>
          </div>

          <!-- Facilities -->
          <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Fasilitas</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="f in room.facilities"
                :key="f"
                class="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
              >
                <CheckCircle :size="11" />
                {{ f }}
              </span>
            </div>
          </div>

          <!-- CTA button -->
          <button
            v-if="room.status === 'available'"
            @click="goBooking"
            class="w-full py-3.5 gradient-navy text-white text-sm font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-900/20"
          >
            Booking Venue Ini
          </button>
          <div
            v-else
            class="w-full py-3.5 bg-gray-100 text-gray-400 text-sm font-semibold rounded-2xl text-center border border-gray-200"
          >
            Venue Tidak Tersedia
          </div>
        </div>

        <!-- Right: Schedule -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 class="text-base font-bold text-gray-900">Jadwal Venue</h2>
                <p class="text-xs text-gray-500 mt-0.5">
                  {{ new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
                </p>
              </div>
              <input
                v-model="selectedDate"
                type="date"
                class="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
            <div class="px-6 py-4">
              <RoomSchedule :events="roomEvents" :date="selectedDate" :roomId="room.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="max-w-7xl mx-auto px-4 py-16 text-center">
    <p class="text-gray-500">Venue tidak ditemukan.</p>
    <button @click="router.push('/ruang')" class="mt-4 text-blue-600 text-sm font-medium">← Kembali ke Daftar Venue</button>
  </div>
</template>
