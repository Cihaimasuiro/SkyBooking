<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, Clock, CheckCircle, XCircle, CalendarDays, MapPin, Users } from 'lucide-vue-next'
import StatusBadge from '../../components/StatusBadge.vue'
import { useBookingStore } from '../../stores/booking'

const store = useBookingStore()

const stats = computed(() => ({
  total:    store.bookingList.length,
  pending:  store.bookingList.filter(b => b.status === 'pending').length,
  approved: store.bookingList.filter(b => b.status === 'approved').length,
  rejected: store.bookingList.filter(b => b.status === 'rejected').length,
}))

const recent = computed(() => store.bookingList.slice(0, 5))

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8">

    <!-- Welcome -->
    <div class="mb-6">
      <h1 class="text-xl font-extrabold text-gray-900">Selamat Datang 👋</h1>
      <p class="text-gray-500 text-sm mt-0.5">Berikut ringkasan aktivitas booking saat ini.</p>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</p>
          <div class="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <TrendingUp :size="15" class="text-blue-600" />
          </div>
        </div>
        <p class="text-3xl font-black text-gray-900">{{ stats.total }}</p>
        <p class="text-xs text-gray-400 mt-1">Semua pengajuan</p>
      </div>

      <div class="bg-white rounded-2xl border border-amber-100 p-4 sm:p-5 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending</p>
          <div class="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
            <Clock :size="15" class="text-amber-500" />
          </div>
        </div>
        <p class="text-3xl font-black text-amber-600">{{ stats.pending }}</p>
        <p class="text-xs text-amber-400 mt-1">Menunggu review</p>
      </div>

      <div class="bg-white rounded-2xl border border-emerald-100 p-4 sm:p-5 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Disetujui</p>
          <div class="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
            <CheckCircle :size="15" class="text-emerald-500" />
          </div>
        </div>
        <p class="text-3xl font-black text-emerald-600">{{ stats.approved }}</p>
        <p class="text-xs text-emerald-400 mt-1">Booking aktif</p>
      </div>

      <div class="bg-white rounded-2xl border border-red-100 p-4 sm:p-5 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs font-semibold text-red-500 uppercase tracking-wider">Ditolak</p>
          <div class="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
            <XCircle :size="15" class="text-red-400" />
          </div>
        </div>
        <p class="text-3xl font-black text-red-500">{{ stats.rejected }}</p>
        <p class="text-xs text-red-300 mt-1">Tidak disetujui</p>
      </div>
    </div>

    <!-- Recent bookings -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 class="font-bold text-gray-900 text-sm">Pengajuan Terbaru</h2>
        <RouterLink to="/admin/booking" class="text-xs text-[#0EB4BE] font-semibold hover:underline">Lihat semua →</RouterLink>
      </div>

      <!-- Desktop -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-50 bg-gray-50/60">
              <th class="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Kegiatan</th>
              <th class="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Venue</th>
              <th class="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Tanggal</th>
              <th class="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">PIC</th>
              <th class="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="b in recent" :key="b.id" class="hover:bg-gray-50/40 transition-colors">
              <td class="px-5 py-3.5">
                <p class="text-sm font-semibold text-gray-900">{{ b.eventName }}</p>
                <p class="text-xs text-gray-400">{{ b.eventType }}</p>
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPin :size="12" class="text-gray-400 flex-shrink-0" />
                  {{ b.roomName }}
                </div>
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-1.5 text-sm text-gray-600">
                  <CalendarDays :size="12" class="text-gray-400 flex-shrink-0" />
                  {{ fmtDate(b.date) }}
                </div>
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-1.5 text-sm text-gray-600">
                  <Users :size="12" class="text-gray-400 flex-shrink-0" />
                  {{ b.pic }}
                </div>
              </td>
              <td class="px-5 py-3.5"><StatusBadge :status="b.status" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile -->
      <div class="sm:hidden divide-y divide-gray-100">
        <div v-for="b in recent" :key="b.id" class="px-4 py-3 flex items-center justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-semibold text-gray-900 truncate">{{ b.eventName }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ b.roomName }} · {{ fmtDate(b.date) }}</p>
          </div>
          <StatusBadge :status="b.status" class="flex-shrink-0" />
        </div>
      </div>

      <div v-if="!recent.length" class="py-12 text-center text-sm text-gray-400">Belum ada data booking.</div>
    </div>
  </div>
</template>
