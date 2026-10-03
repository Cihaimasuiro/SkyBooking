<script setup lang="ts">
import { ref, computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { Map, X, Users, MapPin, ChevronRight } from 'lucide-vue-next'
import FloorMap from '../components/FloorMap.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { rooms } from '../data/rooms'
import { floorPlans } from '../data/mapData'



const terminals = ['Terminal 1', 'Terminal 2']
const selectedTerminal = ref('Terminal 1')
const selectedFloor = ref(1)
const selectedRoomId = ref<string | null>(null)

const floorsForTerminal = computed(() =>
  floorPlans
    .filter(p => p.terminal === selectedTerminal.value)
    .map(p => ({ floor: p.floor, label: p.label }))
    .sort((a, b) => a.floor - b.floor)
)

const selectedRoom = computed(() =>
  selectedRoomId.value ? rooms.find(r => r.id === selectedRoomId.value) ?? null : null
)

function selectTerminal(t: string) {
  selectedTerminal.value = t
  selectedFloor.value = floorsForTerminal.value[0]?.floor ?? 1
  selectedRoomId.value = null
}

function selectFloor(f: number) {
  selectedFloor.value = f
  selectedRoomId.value = null
}

function onRoomSelect(roomId: string) {
  selectedRoomId.value = selectedRoomId.value === roomId ? null : roomId
}

function closePanel() {
  selectedRoomId.value = null
}

const legendItems = [
  { color: 'bg-emerald-500', border: 'border-emerald-600', label: 'Tersedia',  fill: 'bg-green-50'   },
  { color: 'bg-blue-500',    border: 'border-blue-600',    label: 'Booked',    fill: 'bg-blue-50'    },
  { color: 'bg-amber-400',   border: 'border-amber-500',   label: 'Pending',   fill: 'bg-amber-50'   },
  { color: 'bg-red-500',     border: 'border-red-600',     label: 'Maintenance', fill: 'bg-red-50'   },
]
</script>

<template>
  <div>
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center gap-3 mb-1 animate-fade-in">
          <div class="w-7 h-7 bg-blue-900 rounded-lg flex items-center justify-center">
            <Map :size="14" class="text-white" />
          </div>
          <p class="text-xs font-bold text-blue-700 uppercase tracking-widest">Denah Lantai</p>
        </div>
        <h1 class="text-2xl font-extrabold text-gray-900 animate-float-up delay-50">Peta Ruangan</h1>
        <p class="text-gray-500 text-sm mt-0.5 animate-float-up delay-100">
          Visualisasi posisi venue per terminal dan lantai.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Terminal tabs -->
      <div class="flex gap-2 mb-4 animate-slide-up delay-100">
        <button
          v-for="t in terminals"
          :key="t"
          @click="selectTerminal(t)"
          class="px-5 py-2 rounded-xl text-sm font-semibold border transition-all"
          :class="selectedTerminal === t
            ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700'"
        >
          {{ t }}
        </button>
      </div>

      <!-- Floor tabs -->
      <div class="flex gap-2 mb-5 animate-slide-up delay-150">
        <button
          v-for="f in floorsForTerminal"
          :key="f.floor"
          @click="selectFloor(f.floor)"
          class="px-4 py-1.5 rounded-lg text-sm font-medium border transition-all"
          :class="selectedFloor === f.floor
            ? 'bg-blue-100 text-blue-800 border-blue-200'
            : 'bg-white text-gray-500 border-gray-200 hover:border-blue-200 hover:text-blue-600'"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Map + panel layout -->
      <div class="flex flex-col lg:flex-row gap-4 animate-slide-up delay-200">
        <!-- Floor map -->
        <div class="flex-1 min-w-0">
          <FloorMap
            :terminal="selectedTerminal"
            :floor="selectedFloor"
            :selected-room-id="selectedRoomId"
            @select="onRoomSelect"
          />

          <!-- Legend -->
          <div class="mt-3 flex flex-wrap gap-3 items-center px-1">
            <span class="text-xs text-gray-400 font-semibold uppercase tracking-wider">Keterangan:</span>
            <div v-for="item in legendItems" :key="item.label" class="flex items-center gap-1.5">
              <span
                class="w-3 h-3 rounded-sm border"
                :class="[item.fill, item.border]"
              />
              <span class="text-xs text-gray-600">{{ item.label }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-sm bg-green-50 border border-emerald-600 opacity-50" />
              <span class="text-xs text-gray-400">Area non-booking</span>
            </div>
          </div>
        </div>

        <!-- Room detail panel -->
        <Transition name="panel">
          <div
            v-if="selectedRoom"
            class="lg:w-80 w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0"
          >
            <!-- Panel header -->
            <div class="gradient-navy px-5 py-4 flex items-start justify-between">
              <div>
                <p class="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1">Detail Ruangan</p>
                <h3 class="text-base font-bold text-white">{{ selectedRoom.name }}</h3>
                <p class="text-xs text-blue-300 mt-0.5">{{ selectedRoom.terminal }}</p>
              </div>
              <button
                @click="closePanel"
                class="p-1.5 text-blue-300 hover:text-white hover:bg-white/15 rounded-lg transition-colors mt-0.5"
              >
                <X :size="16" />
              </button>
            </div>

            <!-- Status -->
            <div class="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <span class="text-xs font-semibold text-gray-500">Status</span>
              <StatusBadge :status="selectedRoom.status" />
            </div>

            <!-- Info rows -->
            <div class="px-5 py-4 space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin :size="14" class="text-blue-600" />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Lokasi</p>
                  <p class="text-sm font-semibold text-gray-800">{{ selectedRoom.location }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users :size="14" class="text-blue-600" />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Kapasitas</p>
                  <p class="text-sm font-semibold text-gray-800">{{ selectedRoom.capacity }} orang</p>
                </div>
              </div>

              <!-- Facilities -->
              <div>
                <p class="text-xs text-gray-500 mb-2">Fasilitas</p>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="f in selectedRoom.facilities"
                    :key="f"
                    class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                  >{{ f }}</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="px-5 pb-5 space-y-2">
              <button
                v-if="selectedRoom.status === 'available'"
                @click="router.visit(`/booking?roomId=${selectedRoom.id}`)"
                class="w-full flex items-center justify-center gap-2 py-3 gradient-navy text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity shadow-sm"
              >
                Booking Ruang Ini
                <ChevronRight :size="15" />
              </button>
              <button
                @click="router.visit(`/ruang/${selectedRoom.id}`)"
                class="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 text-gray-700 text-sm font-medium rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                Lihat Jadwal
              </button>
            </div>
          </div>
        </Transition>

        <!-- Empty state panel placeholder when no room selected -->
        <div
          v-if="!selectedRoom"
          class="lg:w-80 w-full bg-white/60 rounded-2xl border border-dashed border-gray-300 flex-shrink-0 hidden lg:flex items-center justify-center py-16"
        >
          <div class="text-center px-6">
            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Map :size="20" class="text-gray-400" />
            </div>
            <p class="text-sm font-semibold text-gray-500">Pilih Ruangan</p>
            <p class="text-xs text-gray-400 mt-1">Klik venue di peta untuk melihat detail</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-enter-active {
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.panel-leave-active {
  transition: opacity 0.18s ease, transform 0.2s ease;
}
.panel-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.panel-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

@media (max-width: 1023px) {
  .panel-enter-from {
    transform: translateY(16px);
  }
  .panel-leave-to {
    transform: translateY(8px);
  }
}
</style>
