<script setup lang="ts">
import { ref, computed } from 'vue'
import { CheckCircle, XCircle, Eye, X, CalendarDays, MapPin, Users, User, Mail, Phone, FileText, AlertTriangle, MessageSquare } from 'lucide-vue-next'
import StatusBadge from '../../components/StatusBadge.vue'
import EmptyState from '../../components/EmptyState.vue'
import { usePage } from '@inertiajs/vue3'



const props = defineProps<{ bookings?: any[] }>();
const store = { bookingList: props.bookings || [] };
const page = usePage();
const notifs = { addNotification: () => {}, notifications: [{title: 'Notification', message: 'Test message', read: false}] };

const filterStatus    = ref('')
const selectedBooking = ref<typeof store.bookingList[0] | null>(null)

// 'idle' | 'confirm-approve' | 'confirm-reject'
const actionStep  = ref<'idle' | 'confirm-approve' | 'confirm-reject'>('idle')
const adminNote   = ref('')
const rejectReason = ref('')
const rejectError  = ref(false)

const filtered = computed(() => {
  if (!filterStatus.value) return store.bookingList
  return store.bookingList.filter(b => b.status === filterStatus.value)
})

const pendingCount = computed(() => store.bookingList.filter(b => b.status === 'pending').length)

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}
function fmtDateShort(d: string) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function openDetail(b: typeof store.bookingList[0]) {
  selectedBooking.value = b
  actionStep.value = 'idle'
  adminNote.value = ''
  rejectReason.value = ''
  rejectError.value = false
}

function closeModal() {
  selectedBooking.value = null
  actionStep.value = 'idle'
}

function startApprove() {
  actionStep.value = 'confirm-approve'
  rejectReason.value = ''
  rejectError.value = false
}

function startReject() {
  actionStep.value = 'confirm-reject'
  rejectError.value = false
}

function confirmApprove() {
  if (!selectedBooking.value) return
  const id = selectedBooking.value.id
  console.log(id, adminNote.value || undefined)
  console.log("notif")
  selectedBooking.value = store.bookingList.find(x => x.id === id) ?? null
  actionStep.value = 'idle'
  adminNote.value = ''
}

function confirmReject() {
  if (!rejectReason.value.trim()) { rejectError.value = true; return }
  if (!selectedBooking.value) return
  const id = selectedBooking.value.id
  console.log(id, rejectReason.value.trim(), adminNote.value || undefined)
  console.log("notif")
  selectedBooking.value = store.bookingList.find(x => x.id === id) ?? null
  actionStep.value = 'idle'
  rejectReason.value = ''
  adminNote.value = ''
}
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8">

    <!-- Filter tabs -->
    <div class="flex gap-2 mb-5 overflow-x-auto pb-1">
      <button
        v-for="f in [
          { value: '', label: 'Semua' },
          { value: 'pending',   label: 'Pending' },
          { value: 'approved',  label: 'Disetujui' },
          { value: 'rejected',  label: 'Ditolak' },
          { value: 'cancelled', label: 'Dibatalkan' },
        ]"
        :key="f.value"
        @click="filterStatus = f.value"
        class="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full border transition-colors flex-shrink-0"
        :class="filterStatus === f.value
          ? 'bg-[#0f172a] text-white border-[#0f172a]'
          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'"
      >
        {{ f.label }}
        <span v-if="f.value === 'pending' && pendingCount > 0" class="px-1.5 py-0.5 text-[10px] font-black bg-amber-400 text-white rounded-full">{{ pendingCount }}</span>
      </button>
    </div>

    <!-- Mobile cards -->
    <div class="sm:hidden space-y-3">
      <div
        v-for="b in filtered"
        :key="b.id"
        class="bg-white rounded-xl border border-gray-200 overflow-hidden"
        :class="b.status === 'pending' ? 'border-amber-200' : ''"
      >
        <div class="p-4" @click="openDetail(b)">
          <div class="flex items-start justify-between gap-2 mb-1.5">
            <p class="text-sm font-semibold text-gray-900 truncate">{{ b.eventName }}</p>
            <StatusBadge :status="b.status" class="flex-shrink-0" />
          </div>
          <p class="text-xs text-gray-500">{{ b.eventType }} · {{ b.roomName }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ fmtDateShort(b.date) }} · {{ b.startTime }}–{{ b.endTime }} · {{ b.participants }} orang</p>
        </div>
        <div class="border-t" :class="b.status === 'pending' ? 'border-amber-100' : 'border-gray-100'">
          <button @click="openDetail(b)" class="w-full py-2.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5">
            <Eye :size="12" /> Tinjau
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
              <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kegiatan</th>
              <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Venue</th>
              <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">PIC</th>
              <th class="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-5 py-3.5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="b in filtered"
              :key="b.id"
              class="hover:bg-blue-50/30 transition-colors cursor-pointer"
              @click="openDetail(b)"
            >
              <td class="px-5 py-4 text-xs font-mono text-gray-400">{{ b.id }}</td>
              <td class="px-5 py-4">
                <p class="text-sm font-semibold text-gray-900">{{ b.eventName }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ b.eventType }} · {{ b.participants }} orang</p>
              </td>
              <td class="px-5 py-4">
                <p class="text-sm text-gray-700">{{ b.roomName }}</p>
                <p class="text-xs text-gray-400">{{ b.terminal }}</p>
              </td>
              <td class="px-5 py-4">
                <p class="text-sm text-gray-700">{{ fmtDateShort(b.date) }}</p>
                <p class="text-xs text-gray-400">{{ b.startTime }} – {{ b.endTime }}</p>
              </td>
              <td class="px-5 py-4">
                <p class="text-sm text-gray-700">{{ b.pic }}</p>
                <p class="text-xs text-gray-400">{{ b.email }}</p>
              </td>
              <td class="px-5 py-4"><StatusBadge :status="b.status" /></td>
              <td class="px-5 py-4 text-center" @click.stop>
                <button @click="openDetail(b)" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors mx-auto">
                  <Eye :size="11" /> Tinjau
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <EmptyState v-if="filtered.length === 0" title="Tidak ada data" description="Tidak ada booking dengan status tersebut." />
    </div>

    <!-- Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedBooking" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" @click.self="closeModal">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal" />
          <Transition name="modal-panel" appear>
            <div v-if="selectedBooking" class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden">

              <!-- Header -->
              <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background:rgba(14,180,190,0.12)">
                    <FileText :size="16" style="color:#0EB4BE" />
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 text-sm">Tinjau Booking</h3>
                    <p class="text-xs font-mono text-blue-600 mt-0.5">{{ selectedBooking.id }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <StatusBadge :status="selectedBooking.status" />
                  <button class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 ml-1" @click="closeModal">
                    <X :size="18" />
                  </button>
                </div>
              </div>

              <!-- Body: detail info -->
              <div class="px-6 py-5 space-y-5 max-h-[55vh] overflow-y-auto">

                <!-- Kegiatan -->
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Informasi Kegiatan</p>
                  <div class="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div class="flex items-start gap-3">
                      <div class="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText :size="13" class="text-gray-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-400">Nama Kegiatan</p>
                        <p class="text-sm font-semibold text-gray-900 mt-0.5">{{ selectedBooking.eventName }}</p>
                        <p class="text-xs text-gray-500">{{ selectedBooking.eventType }}</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <div class="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin :size="13" class="text-gray-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-400">Venue</p>
                        <p class="text-sm font-semibold text-gray-900 mt-0.5">{{ selectedBooking.roomName }}</p>
                        <p class="text-xs text-gray-500">{{ selectedBooking.terminal }}</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <div class="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CalendarDays :size="13" class="text-gray-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-400">Tanggal & Waktu</p>
                        <p class="text-sm font-semibold text-gray-900 mt-0.5">{{ fmtDate(selectedBooking.date) }}</p>
                        <p class="text-xs text-gray-500">{{ selectedBooking.startTime }} – {{ selectedBooking.endTime }}</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <div class="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Users :size="13" class="text-gray-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-400">Jumlah Peserta</p>
                        <p class="text-sm font-semibold text-gray-900 mt-0.5">{{ selectedBooking.participants }} orang</p>
                      </div>
                    </div>
                    <div v-if="selectedBooking.notes" class="flex items-start gap-3">
                      <div class="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MessageSquare :size="13" class="text-gray-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-400">Catatan Pemohon</p>
                        <p class="text-sm text-gray-700 mt-0.5">{{ selectedBooking.notes }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- PIC -->
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Penanggung Jawab</p>
                  <div class="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div class="flex items-center gap-3">
                      <div class="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <User :size="13" class="text-gray-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-400">Nama PIC</p>
                        <p class="text-sm font-semibold text-gray-900 mt-0.5">{{ selectedBooking.pic }}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <Mail :size="13" class="text-gray-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-400">Email</p>
                        <p class="text-sm text-gray-700 mt-0.5">{{ selectedBooking.email }}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <Phone :size="13" class="text-gray-400" />
                      </div>
                      <div>
                        <p class="text-xs text-gray-400">No. Telepon</p>
                        <p class="text-sm text-gray-700 mt-0.5">{{ selectedBooking.phone }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Hasil keputusan (sudah diproses) -->
                <div v-if="selectedBooking.status === 'rejected' && selectedBooking.rejectReason">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Alasan Penolakan</p>
                  <div class="bg-red-50 border border-red-100 rounded-xl p-4">
                    <p class="text-sm text-red-700">{{ selectedBooking.rejectReason }}</p>
                  </div>
                </div>
                <div v-if="selectedBooking.adminNote">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Catatan Admin</p>
                  <div class="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p class="text-sm text-blue-700">{{ selectedBooking.adminNote }}</p>
                  </div>
                </div>
              </div>

              <!-- Footer: idle (pending) -->
              <div v-if="selectedBooking.status === 'pending' && actionStep === 'idle'" class="px-6 py-4 border-t border-gray-100 bg-amber-50/50">
                <p class="text-xs text-amber-700 font-medium mb-3">Pilih keputusan untuk booking ini:</p>
                <div class="flex gap-3">
                  <button @click="startApprove" class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-colors">
                    <CheckCircle :size="15" /> Setujui
                  </button>
                  <button @click="startReject" class="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-red-300 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors">
                    <XCircle :size="15" /> Tolak
                  </button>
                </div>
              </div>

              <!-- Footer: konfirmasi setujui -->
              <div v-else-if="actionStep === 'confirm-approve'" class="px-6 py-4 border-t border-emerald-100 bg-emerald-50/50 space-y-3">
                <p class="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle :size="13" /> Konfirmasi Persetujuan
                </p>
                <p class="text-xs text-gray-500">Yakin menyetujui booking <strong class="text-gray-800">{{ selectedBooking?.eventName }}</strong>?</p>
                <div>
                  <label class="text-xs font-semibold text-gray-500 block mb-1.5">Catatan Admin <span class="font-normal text-gray-400">(opsional)</span></label>
                  <textarea
                    v-model="adminNote"
                    rows="2"
                    placeholder="Tambahkan catatan untuk pemohon..."
                    class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white resize-none"
                  />
                </div>
                <div class="flex gap-2">
                  <button @click="actionStep = 'idle'" class="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Batal
                  </button>
                  <button @click="confirmApprove" class="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors">
                    <CheckCircle :size="13" /> Ya, Setujui Sekarang
                  </button>
                </div>
              </div>

              <!-- Footer: konfirmasi tolak -->
              <div v-else-if="actionStep === 'confirm-reject'" class="px-6 py-4 border-t border-red-100 bg-red-50/50 space-y-3">
                <p class="text-xs font-bold text-red-600 flex items-center gap-1.5">
                  <AlertTriangle :size="13" /> Konfirmasi Penolakan
                </p>
                <div>
                  <label class="text-xs font-semibold text-gray-600 block mb-1.5">
                    Alasan Penolakan <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="rejectReason"
                    rows="2"
                    placeholder="Jelaskan alasan penolakan booking ini..."
                    class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 resize-none transition-colors"
                    :class="rejectError && !rejectReason.trim()
                      ? 'border-red-400 ring-red-100 bg-red-50'
                      : 'border-gray-200 focus:ring-red-200 bg-white'"
                    @input="rejectError = false"
                  />
                  <p v-if="rejectError && !rejectReason.trim()" class="text-xs text-red-500 mt-1">Alasan penolakan wajib diisi.</p>
                </div>
                <div>
                  <label class="text-xs font-semibold text-gray-500 block mb-1.5">Catatan Tambahan <span class="font-normal text-gray-400">(opsional)</span></label>
                  <textarea
                    v-model="adminNote"
                    rows="1"
                    placeholder="Informasi lain untuk pemohon..."
                    class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 bg-white resize-none"
                  />
                </div>
                <div class="flex gap-2">
                  <button @click="actionStep = 'idle'" class="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Batal
                  </button>
                  <button @click="confirmReject" class="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors">
                    <XCircle :size="13" /> Ya, Tolak Booking
                  </button>
                </div>
              </div>

              <!-- Footer: sudah diproses -->
              <div v-else-if="selectedBooking.status !== 'pending'" class="px-6 py-4 border-t border-gray-100">
                <button @click="closeModal" class="w-full py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  Tutup
                </button>
              </div>

            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
