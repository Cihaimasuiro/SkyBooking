<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShieldCheck, CheckCircle, XCircle, Clock, X } from 'lucide-vue-next'
import StatusBadge from '../components/StatusBadge.vue'
import EmptyState from '../components/EmptyState.vue'
import { usePage } from '@inertiajs/vue3'



const props = defineProps<{ bookings?: any[] }>();
const store = { bookingList: props.bookings || [] };
const page = usePage();
const notifs = { addNotification: () => {}, notifications: [{title: 'Notification', message: 'Test message', read: false}] };

const filterStatus = ref('')
const selectedBooking = ref<typeof store.bookingList[0] | null>(null)

const filtered = computed(() => {
  if (!filterStatus.value) return store.bookingList
  return store.bookingList.filter(b => b.status === filterStatus.value)
})

const stats = computed(() => ({
  total:    store.bookingList.length,
  pending:  store.bookingList.filter(b => b.status === 'pending').length,
  approved: store.bookingList.filter(b => b.status === 'approved').length,
  rejected: store.bookingList.filter(b => b.status === 'rejected').length,
}))

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function approve(id: string) {
  console.log(id)
  const b = store.bookingList.find(b => b.id === id)
  if (b) console.log("notif")
  if (selectedBooking.value?.id === id) selectedBooking.value = store.bookingList.find(x => x.id === id) ?? null
}

function reject(id: string) {
  console.log(id, 'Ditolak oleh admin')
  const b = store.bookingList.find(b => b.id === id)
  if (b) console.log("notif")
  if (selectedBooking.value?.id === id) selectedBooking.value = store.bookingList.find(x => x.id === id) ?? null
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center" style="background:#0f172a">
                <ShieldCheck :size="14" class="text-white" />
              </div>
              <p class="text-xs font-bold text-blue-700 uppercase tracking-widest">Panel Admin</p>
            </div>
            <h1 class="text-2xl font-extrabold text-gray-900">Manajemen Booking</h1>
            <p class="text-gray-500 text-sm mt-0.5">Tinjau dan kelola semua pengajuan booking venue.</p>
          </div>

          <!-- Stats -->
          <div class="flex gap-2 flex-wrap">
            <div class="stat-card bg-blue-50 border-blue-100">
              <span class="text-lg font-black text-blue-700 leading-none block">{{ stats.total }}</span>
              <span class="text-xs text-blue-600">Total</span>
            </div>
            <div class="stat-card bg-amber-50 border-amber-100">
              <Clock :size="12" class="text-amber-500 mb-0.5" />
              <span class="text-lg font-black text-amber-600 leading-none block">{{ stats.pending }}</span>
              <span class="text-xs text-amber-600">Pending</span>
            </div>
            <div class="stat-card bg-green-50 border-green-100">
              <CheckCircle :size="12" class="text-emerald-500 mb-0.5" />
              <span class="text-lg font-black text-green-700 leading-none block">{{ stats.approved }}</span>
              <span class="text-xs text-green-600">Disetujui</span>
            </div>
            <div class="stat-card bg-red-50 border-red-100">
              <XCircle :size="12" class="text-red-400 mb-0.5" />
              <span class="text-lg font-black text-red-600 leading-none block">{{ stats.rejected }}</span>
              <span class="text-xs text-red-500">Ditolak</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Filter tabs -->
      <div class="flex gap-2 mb-5 overflow-x-auto pb-1">
        <button
          v-for="f in [
            { value: '', label: 'Semua' },
            { value: 'pending',  label: 'Pending' },
            { value: 'approved', label: 'Disetujui' },
            { value: 'rejected', label: 'Ditolak' },
            { value: 'cancelled', label: 'Dibatalkan' },
          ]"
          :key="f.value"
          @click="filterStatus = f.value"
          class="px-4 py-1.5 text-sm font-medium rounded-full border transition-colors flex-shrink-0"
          :class="filterStatus === f.value
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'"
        >
          {{ f.label }}
          <span v-if="f.value === 'pending' && stats.pending > 0" class="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-amber-400 text-white rounded-full">{{ stats.pending }}</span>
        </button>
      </div>

      <!-- Mobile cards -->
      <div class="sm:hidden space-y-3">
        <div
          v-for="b in filtered"
          :key="b.id"
          class="bg-white rounded-xl border border-gray-200 p-4"
          @click="selectedBooking = b"
        >
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate">{{ b.eventName }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ b.eventType }} · {{ b.roomName }}</p>
            </div>
            <StatusBadge :status="b.status" class="flex-shrink-0" />
          </div>
          <div class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
            <span>{{ fmtDate(b.date) }}</span>
            <span>{{ b.startTime }} – {{ b.endTime }}</span>
            <span>{{ b.participants }} orang</span>
          </div>
          <div v-if="b.status === 'pending'" class="flex gap-2">
            <button @click.stop="approve(b.id)" class="flex-1 py-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors">
              Setujui
            </button>
            <button @click.stop="reject(b.id)" class="flex-1 py-2 text-xs font-bold text-red-600 border border-red-300 hover:bg-red-50 rounded-lg transition-colors">
              Tolak
            </button>
          </div>
        </div>
        <EmptyState v-if="filtered.length === 0" title="Tidak ada data" description="Tidak ada booking dengan status tersebut." />
      </div>

      <!-- Desktop table -->
      <div class="hidden sm:block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-100 bg-gray-50/80">
                <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kegiatan</th>
                <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Venue</th>
                <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">PIC</th>
                <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="b in filtered" :key="b.id" class="hover:bg-gray-50/60 transition-colors">
                <td class="px-5 py-4 text-xs font-mono text-gray-500">{{ b.id }}</td>
                <td class="px-5 py-4">
                  <p class="text-sm font-semibold text-gray-900">{{ b.eventName }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ b.eventType }} · {{ b.participants }} orang</p>
                </td>
                <td class="px-5 py-4">
                  <p class="text-sm text-gray-700">{{ b.roomName }}</p>
                  <p class="text-xs text-gray-400">{{ b.terminal }}</p>
                </td>
                <td class="px-5 py-4">
                  <p class="text-sm text-gray-700">{{ fmtDate(b.date) }}</p>
                  <p class="text-xs text-gray-400">{{ b.startTime }} – {{ b.endTime }}</p>
                </td>
                <td class="px-5 py-4">
                  <p class="text-sm text-gray-700">{{ b.pic }}</p>
                  <p class="text-xs text-gray-400">{{ b.email }}</p>
                </td>
                <td class="px-5 py-4"><StatusBadge :status="b.status" /></td>
                <td class="px-5 py-4">
                  <div v-if="b.status === 'pending'" class="flex items-center justify-center gap-2">
                    <button
                      @click="approve(b.id)"
                      class="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
                    >
                      <CheckCircle :size="12" /> Setujui
                    </button>
                    <button
                      @click="reject(b.id)"
                      class="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <XCircle :size="12" /> Tolak
                    </button>
                  </div>
                  <div v-else class="flex justify-center">
                    <button @click="selectedBooking = b" class="text-xs text-blue-600 hover:underline font-medium">Detail</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <EmptyState v-if="filtered.length === 0" title="Tidak ada data" description="Tidak ada booking dengan status tersebut." />
      </div>
    </div>

    <!-- Detail Modal -->
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
                <button class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100" @click="selectedBooking = null">
                  <X :size="20" />
                </button>
              </div>

              <div class="space-y-3 text-sm">
                <div class="flex justify-between"><span class="text-gray-500">Status</span><StatusBadge :status="selectedBooking.status" /></div>
                <div class="flex justify-between"><span class="text-gray-500">Kegiatan</span><span class="font-medium text-gray-900 text-right">{{ selectedBooking.eventName }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Jenis</span><span class="text-gray-700">{{ selectedBooking.eventType }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Venue</span><span class="text-gray-700 text-right">{{ selectedBooking.roomName }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Tanggal</span><span class="text-gray-700">{{ fmtDate(selectedBooking.date) }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Waktu</span><span class="text-gray-700">{{ selectedBooking.startTime }} – {{ selectedBooking.endTime }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Peserta</span><span class="text-gray-700">{{ selectedBooking.participants }} orang</span></div>
                <div class="flex justify-between"><span class="text-gray-500">PIC</span><span class="text-gray-700">{{ selectedBooking.pic }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Email</span><span class="text-gray-700">{{ selectedBooking.email }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">No. Telepon</span><span class="text-gray-700">{{ selectedBooking.phone }}</span></div>
                <div v-if="selectedBooking.notes" class="flex justify-between"><span class="text-gray-500">Catatan</span><span class="text-gray-700 text-right">{{ selectedBooking.notes }}</span></div>
              </div>

              <div v-if="selectedBooking.status === 'pending'" class="mt-5 pt-4 border-t border-gray-100 flex gap-3">
                <button
                  @click="approve(selectedBooking.id); selectedBooking = null"
                  class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  <CheckCircle :size="15" /> Setujui
                </button>
                <button
                  @click="reject(selectedBooking.id); selectedBooking = null"
                  class="flex-1 flex items-center justify-center gap-2 py-2.5 border border-red-300 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors"
                >
                  <XCircle :size="15" /> Tolak
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 8px 14px;
  border: 1px solid;
  border-radius: 12px;
}
</style>
