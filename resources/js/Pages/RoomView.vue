<script setup lang="ts">
import { ref, computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { Search, DoorOpen, Filter, ChevronRight } from 'lucide-vue-next'
import RoomRow from '../components/RoomRow.vue'
import EmptyState from '../components/EmptyState.vue'
import StatusBadge from '../components/StatusBadge.vue'
const props = defineProps<{
  rooms: any[]
}>()
const rooms = props.rooms



const search = ref('')
const filterTerminal = ref('')
const filterStatus = ref('')
const filterCapacity = ref('')

const filtered = computed(() => {
  return rooms.filter(r => {
    const matchSearch = !search.value ||
      r.name.toLowerCase().includes(search.value.toLowerCase()) ||
      r.location.toLowerCase().includes(search.value.toLowerCase())
    const matchTerminal = !filterTerminal.value || r.terminal === filterTerminal.value
    const matchStatus = !filterStatus.value || r.status === filterStatus.value
    const matchCap = !filterCapacity.value ||
      (filterCapacity.value === '<=10' && r.capacity <= 10) ||
      (filterCapacity.value === '11-30' && r.capacity > 10 && r.capacity <= 30) ||
      (filterCapacity.value === '>30' && r.capacity > 30)
    return matchSearch && matchTerminal && matchStatus && matchCap
  })
})

const statusCounts = computed(() => ({
  available:   rooms.filter(r => r.status === 'available').length,
  in_use:      rooms.filter(r => r.status === 'in_use').length,
  maintenance: rooms.filter(r => r.status === 'maintenance').length,
  pending:     rooms.filter(r => r.status === 'pending').length,
}))
</script>

<template>
  <div>
    <!-- Header banner -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <div class="w-7 h-7 bg-blue-900 rounded-lg flex items-center justify-center">
                <DoorOpen :size="14" class="text-white" />
              </div>
              <p class="text-xs font-bold text-blue-700 uppercase tracking-widest">Manajemen Venue</p>
            </div>
            <h1 class="text-2xl font-extrabold text-gray-900">Venue</h1>
            <p class="text-gray-500 text-sm mt-0.5">Temukan venue yang sesuai dengan kebutuhan kegiatan Anda.</p>
          </div>

          <!-- Status summary -->
          <div class="flex gap-2 flex-wrap">
            <div class="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-xl">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <div>
                <span class="text-lg font-bold text-green-700 leading-none block">{{ statusCounts.available }}</span>
                <span class="text-xs text-green-600">Tersedia</span>
              </div>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <div>
                <span class="text-lg font-bold text-blue-700 leading-none block">{{ statusCounts.in_use }}</span>
                <span class="text-xs text-blue-600">Booked</span>
              </div>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-xl">
              <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <div>
                <span class="text-lg font-bold text-red-600 leading-none block">{{ statusCounts.maintenance }}</span>
                <span class="text-xs text-red-500">Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Filter bar -->
      <div class="bg-white rounded-2xl border border-gray-200 p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <Filter :size="15" class="text-gray-400" />
          <span class="font-medium">Filter:</span>
        </div>
        <div class="relative flex-1 min-w-[180px] max-w-xs">
          <Search :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="search"
            placeholder="Cari nama atau lokasi..."
            class="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
          />
        </div>
        <select v-model="filterTerminal" class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors">
          <option value="">Semua Terminal</option>
          <option>Terminal 1</option>
          <option>Terminal 2</option>
        </select>
        <select v-model="filterStatus" class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors">
          <option value="">Semua Status</option>
          <option value="available">Tersedia</option>
          <option value="in_use">Booked</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <select v-model="filterCapacity" class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors">
          <option value="">Semua Kapasitas</option>
          <option value="<=10">≤ 10 orang</option>
          <option value="11-30">11–30 orang</option>
          <option value=">30">> 30 orang</option>
        </select>
        <span class="text-xs text-gray-400 ml-auto">{{ filtered.length }} venue</span>
      </div>

      <!-- Mobile cards -->
      <div class="sm:hidden space-y-3">
        <div
          v-for="room in filtered"
          :key="room.id"
          class="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-300 transition-colors"
          @click="router.visit(`/ruang/${room.id}`)"
        >
          <div class="flex items-center gap-0">
            <!-- Thumbnail -->
            <div class="w-24 h-20 flex-shrink-0 bg-gray-100 overflow-hidden">
              <img
                v-if="room.image"
                :src="room.image"
                :alt="room.name"
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700" />
            </div>
            <!-- Info -->
            <div class="flex-1 min-w-0 px-4 py-3 flex items-center justify-between gap-2">
              <div class="min-w-0">
                <p class="text-sm font-semibold text-gray-900 truncate">{{ room.name }}</p>
                <p class="text-xs text-gray-500 mt-0.5 truncate">{{ room.location }}</p>
                <div class="flex items-center gap-3 mt-1.5">
                  <span class="text-xs text-gray-500">{{ room.terminal }}</span>
                  <span class="text-xs text-gray-500">{{ room.capacity }} orang</span>
                </div>
              </div>
              <div class="flex flex-col items-end gap-2 flex-shrink-0">
                <StatusBadge :status="room.status" />
                <ChevronRight :size="16" class="text-gray-300" />
              </div>
            </div>
          </div>
        </div>
        <EmptyState v-if="filtered.length === 0" title="Venue tidak ditemukan" description="Coba ubah filter pencarian Anda." />
      </div>

      <!-- Desktop table -->
      <div class="hidden sm:block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-100 bg-gray-50/80">
                <th class="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Venue</th>
                <th class="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lokasi</th>
                <th class="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kapasitas</th>
                <th class="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Fasilitas</th>
                <th class="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3.5"></th>
              </tr>
            </thead>
            <TransitionGroup name="row" tag="tbody" class="divide-y divide-gray-50">
              <RoomRow v-for="(room, i) in filtered" :key="room.id" :room="room" :index="i" />
            </TransitionGroup>
          </table>
        </div>
        <EmptyState
          v-if="filtered.length === 0"
          title="Venue tidak ditemukan"
          description="Coba ubah filter pencarian Anda."
        />
      </div>
    </div>
  </div>
</template>
