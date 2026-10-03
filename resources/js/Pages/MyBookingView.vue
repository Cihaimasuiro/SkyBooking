<script setup lang="ts">
import { ref, computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { PlusCircle, X } from 'lucide-vue-next'
import StatusBadge from '../components/StatusBadge.vue'
import EmptyState from '../components/EmptyState.vue'



const props = defineProps<{ bookings: any[] }>();
const mappedBookings = computed(() => {
  return props.bookings.map(b => ({
    ...b,
    eventName: b.purpose,
    roomName: b.room?.name,
    startTime: b.start_time,
    endTime: b.end_time
  }))
})
const bookingList = mappedBookings


const filterStatus = ref('')

const filtered = computed(() => {
  if (!filterStatus.value) return bookingList.value
  return bookingList.value.filter(b => b.status === filterStatus.value)
})

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const selectedBooking = ref<typeof bookingList.value[0] | null>(null)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <p class="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Riwayat</p>
        <h1 class="text-2xl font-bold text-gray-900">Booking Saya</h1>
        <p class="text-gray-500 text-sm mt-1">Lihat dan kelola seluruh pengajuan booking Anda.</p>
      </div>
      <button
        @click="router.visit('/booking')"
        class="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors flex-shrink-0"
      >
        <PlusCircle :size="16" />
        Buat Booking
      </button>
    </div>

    <!-- Filter tabs -->
    <div class="flex gap-2 mb-5 overflow-x-auto pb-1">
      <button
        v-for="f in [
          { value: '', label: 'Semua' },
          { value: 'pending', label: 'Pending' },
          { value: 'approved', label: 'Disetujui' },
          { value: 'rejected', label: 'Ditolak' },
          { value: 'cancelled', label: 'Dibatalkan' },
        ]"
        :key="f.value"
        @click="filterStatus = f.value"
        class="px-4 py-1.5 text-sm font-medium rounded-full border transition-colors flex-shrink-0"
        :class="filterStatus === f.value
          ? 'bg-blue-900 text-white border-blue-900'
          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Mobile cards -->
    <div class="sm:hidden space-y-3">
      <div
        v-for="booking in filtered"
        :key="booking.id"
        class="bg-white rounded-xl border border-gray-200 p-4"
        @click="selectedBooking = booking"
      >
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="min-w-0">
            <p class="text-sm font-semibold text-gray-900 truncate">{{ booking.eventName }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ booking.eventType }}</p>
          </div>
          <StatusBadge :status="booking.status" class="flex-shrink-0" />
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
          <span>{{ booking.roomName }} · {{ booking.terminal }}</span>
          <span>{{ fmtDate(booking.date) }}</span>
          <span>{{ booking.startTime }} – {{ booking.endTime }}</span>
        </div>
        <p class="text-[10px] font-mono text-gray-400 mt-2">{{ booking.id }}</p>
      </div>
      <EmptyState
        v-if="filtered.length === 0"
        title="Belum ada booking"
        description="Anda belum memiliki booking dengan status tersebut."
      />
    </div>

    <!-- Desktop table -->
    <div class="hidden sm:block bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50">
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Event</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ruang</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="booking in filtered"
              :key="booking.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm font-mono text-gray-600">{{ booking.id }}</td>
              <td class="px-6 py-4">
                <p class="text-sm font-medium text-gray-900">{{ booking.eventName }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ booking.eventType }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700">{{ booking.roomName }}</p>
                <p class="text-xs text-gray-500">{{ booking.terminal }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700">{{ fmtDate(booking.date) }}</p>
                <p class="text-xs text-gray-500">{{ booking.startTime }} – {{ booking.endTime }}</p>
              </td>
              <td class="px-6 py-4">
                <StatusBadge :status="booking.status" />
              </td>
              <td class="px-6 py-4 text-right">
                <button
                  @click="selectedBooking = booking"
                  class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <EmptyState
        v-if="filtered.length === 0"
        title="Belum ada booking"
        description="Anda belum memiliki booking dengan status tersebut."
      />
    </div>

    <!-- Booking detail modal -->
    <Teleport to="body">
      <Transition name="modal">
      <div
        v-if="selectedBooking"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        @click.self="selectedBooking = null"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="selectedBooking = null" />
        <Transition name="modal-panel" appear>
        <div v-if="selectedBooking" class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h3 class="font-bold text-gray-900">Detail Booking</h3>
              <p class="text-sm font-mono text-blue-700 mt-0.5">{{ selectedBooking.id }}</p>
            </div>
            <button
              class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
              @click="selectedBooking = null"
            >
              <X :size="20" />
            </button>
          </div>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Status</span>
              <StatusBadge :status="selectedBooking.status" />
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Kegiatan</span>
              <span class="font-medium text-gray-900">{{ selectedBooking.eventName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Jenis</span>
              <span class="text-gray-700">{{ selectedBooking.eventType }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Ruang</span>
              <span class="text-gray-700">{{ selectedBooking.roomName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Tanggal</span>
              <span class="text-gray-700">{{ fmtDate(selectedBooking.date) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Waktu</span>
              <span class="text-gray-700">{{ selectedBooking.startTime }} – {{ selectedBooking.endTime }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Peserta</span>
              <span class="text-gray-700">{{ selectedBooking.participants }} orang</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">PIC</span>
              <span class="text-gray-700">{{ selectedBooking.pic }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Email</span>
              <span class="text-gray-700">{{ selectedBooking.email }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">No. Telepon</span>
              <span class="text-gray-700">{{ selectedBooking.phone }}</span>
            </div>
          </div>

          <!-- Alasan penolakan -->
          <div v-if="selectedBooking.rejectReason" class="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl">
            <p class="text-xs font-bold text-red-600 mb-1">Alasan Penolakan</p>
            <p class="text-sm text-red-700">{{ selectedBooking.rejectReason }}</p>
          </div>

          <!-- Catatan admin -->
          <div v-if="selectedBooking.adminNote" class="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <p class="text-xs font-bold text-blue-600 mb-1">Catatan Admin</p>
            <p class="text-sm text-blue-700">{{ selectedBooking.adminNote }}</p>
          </div>

          <div v-if="selectedBooking.status === 'pending'" class="mt-5 pt-4 border-t border-gray-100">
            <button
              @click="() => { console.log(selectedBooking!.id); selectedBooking = null }"
              class="w-full py-2.5 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
            >
              Batalkan Booking
            </button>
          </div>
        </div>
        </Transition>
      </div>
      </Transition>
    </Teleport>
  </div>
</template>
