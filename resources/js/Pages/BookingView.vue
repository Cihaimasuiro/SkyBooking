<script setup lang="ts">
import { ref, computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'



const props = defineProps<{ rooms: any[] }>()
const rooms = props.rooms
import { CalendarDays, Clock, MapPin, Users, User, FileText, ChevronRight, ChevronLeft, CheckCircle, Building2, Mail, Phone } from 'lucide-vue-next'

const page = usePage();
const route = page;



const auth = { get isAuthenticated() { return !!(page.props as any).auth?.user }, get user() { return (page.props as any).auth?.user }, get isAdmin() { return (page.props as any).auth?.user?.role === 'admin' } };
const notifs = { addNotification: () => {}, notifications: [{title: 'Notification', message: 'Test message', read: false}] };

const step = ref(1)
const submitting = ref(false)

const form = ref({
  eventName:    '',
  eventType:    '',
  date:         ((new URLSearchParams(window.location.search).get('date')) as string) || new Date().toISOString().split('T')[0],
  startTime:    ((new URLSearchParams(window.location.search).get('startTime')) as string) || '09:00',
  endTime:      '11:00',
  participants: '',
  pic:          auth.user?.name ?? '',
  email:        '',
  phone:        '',
  notes:        '',
  roomId:       ((new URLSearchParams(window.location.search).get('roomId')) as string) || '',
})

const errors = ref<Record<string, string>>({})

const selectedRoom  = computed(() => rooms.find(r => r.id === form.value.roomId))
const availableRooms = computed(() => rooms.filter(r => r.status === 'available' || r.id === form.value.roomId))

function fmtDate(d: string) {
  if (!d) return '–'
  return new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

const steps = [
  { n: 1, label: 'Informasi Kegiatan', icon: FileText },
  { n: 2, label: 'Pilih Venue',        icon: Building2 },
  { n: 3, label: 'Konfirmasi',         icon: CheckCircle },
]

function validateStep1() {
  errors.value = {}
  if (!form.value.eventName)    errors.value.eventName    = 'Nama kegiatan wajib diisi'
  if (!form.value.eventType)    errors.value.eventType    = 'Jenis kegiatan wajib dipilih'
  if (!form.value.date)         errors.value.date         = 'Tanggal wajib diisi'
  if (!form.value.startTime)    errors.value.startTime    = 'Waktu mulai wajib diisi'
  if (!form.value.endTime)      errors.value.endTime      = 'Waktu selesai wajib diisi'
  if (!form.value.participants) errors.value.participants = 'Jumlah peserta wajib diisi'
  if (!form.value.pic)          errors.value.pic          = 'PIC wajib diisi'
  if (!form.value.email)        errors.value.email        = 'Email wajib diisi'
  if (!form.value.phone)        errors.value.phone        = 'Nomor telepon wajib diisi'
  return Object.keys(errors.value).length === 0
}

function validateStep2() {
  errors.value = {}
  if (!form.value.roomId) errors.value.roomId = 'Pilih venue terlebih dahulu'
  return Object.keys(errors.value).length === 0
}

function nextStep() {
  if (step.value === 1 && !validateStep1()) return
  if (step.value === 2 && !validateStep2()) return
  step.value++
}

function prevStep() {
  if (step.value > 1) step.value--
}

async function submit() {
  submitting.value = true
  await new Promise(r => setTimeout(r, 1400))
  
  
  router.visit('/booking/success')
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

    <!-- Header -->
    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-widest mb-1" style="color:#0EB4BE">Pengajuan Booking</p>
      <h1 class="text-2xl font-extrabold text-gray-900">Booking Venue</h1>
      <p class="text-gray-500 text-sm mt-1">Isi formulir berikut untuk mengajukan permohonan penggunaan venue.</p>
    </div>

    <!-- Stepper -->
    <div class="flex items-center mb-8">
      <template v-for="(s, i) in steps" :key="s.n">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
            :class="step > s.n
              ? 'bg-emerald-500 text-white'
              : step === s.n
                ? 'text-white shadow-md'
                : 'bg-gray-100 text-gray-400'"
            :style="step === s.n ? 'background:linear-gradient(135deg,#0a8f97,#0EB4BE)' : ''"
          >
            <CheckCircle v-if="step > s.n" :size="16" />
            <span v-else>{{ s.n }}</span>
          </div>
          <span
            class="text-xs font-semibold hidden sm:inline transition-colors duration-300"
            :class="step === s.n ? 'text-gray-900' : step > s.n ? 'text-emerald-600' : 'text-gray-400'"
          >{{ s.label }}</span>
        </div>
        <div
          v-if="i < steps.length - 1"
          class="flex-1 h-0.5 mx-3 transition-colors duration-500"
          :class="step > s.n ? 'bg-emerald-400' : 'bg-gray-200'"
        />
      </template>
    </div>

    <!-- Step 1: Informasi Kegiatan -->
    <Transition name="step" mode="out-in">
      <div v-if="step === 1" key="step1" class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:rgba(14,180,190,0.12)">
            <FileText :size="15" style="color:#0EB4BE" />
          </div>
          <h2 class="text-sm font-bold text-gray-900">Informasi Kegiatan</h2>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">

          <div class="sm:col-span-2">
            <label class="field-label">Nama Kegiatan <span class="text-red-500">*</span></label>
            <input v-model="form.eventName" placeholder="Contoh: Rapat Koordinasi Q4" class="field-input" :class="errors.eventName ? 'border-red-400 ring-red-100' : ''" />
            <p v-if="errors.eventName" class="field-error">{{ errors.eventName }}</p>
          </div>

          <div>
            <label class="field-label">Jenis Kegiatan <span class="text-red-500">*</span></label>
            <select v-model="form.eventType" class="field-input field-select" :class="errors.eventType ? 'border-red-400' : ''">
              <option value="">Pilih jenis</option>
              <option>Pertunjukan</option>
              <option>Lomba</option>
              <option>Pameran</option>
              <option>Lainnya</option>
            </select>
            <p v-if="errors.eventType" class="field-error">{{ errors.eventType }}</p>
          </div>

          <div>
            <label class="field-label">Jumlah Peserta <span class="text-red-500">*</span></label>
            <div class="relative input-wrap">
              <Users :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="form.participants" type="number" min="1" placeholder="0" class="field-input" :class="errors.participants ? 'border-red-400' : ''" />
            </div>
            <p v-if="errors.participants" class="field-error">{{ errors.participants }}</p>
          </div>

          <div>
            <label class="field-label">Tanggal <span class="text-red-500">*</span></label>
            <div class="relative input-wrap">
              <CalendarDays :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="form.date" type="date" class="field-input" :class="errors.date ? 'border-red-400' : ''" />
            </div>
            <p v-if="errors.date" class="field-error">{{ errors.date }}</p>
          </div>

          <div>
            <label class="field-label">Waktu Mulai <span class="text-red-500">*</span></label>
            <div class="relative input-wrap">
              <Clock :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="form.startTime" type="time" class="field-input" :class="errors.startTime ? 'border-red-400' : ''" />
            </div>
            <p v-if="errors.startTime" class="field-error">{{ errors.startTime }}</p>
          </div>

          <div>
            <label class="field-label">Waktu Selesai <span class="text-red-500">*</span></label>
            <div class="relative input-wrap">
              <Clock :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="form.endTime" type="time" class="field-input" :class="errors.endTime ? 'border-red-400' : ''" />
            </div>
            <p v-if="errors.endTime" class="field-error">{{ errors.endTime }}</p>
          </div>

          <div>
            <label class="field-label">PIC <span class="text-red-500">*</span></label>
            <div class="relative input-wrap">
              <User :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="form.pic" placeholder="Nama penanggung jawab" class="field-input" :class="errors.pic ? 'border-red-400' : ''" />
            </div>
            <p v-if="errors.pic" class="field-error">{{ errors.pic }}</p>
          </div>

          <div>
            <label class="field-label">Email <span class="text-red-500">*</span></label>
            <div class="relative input-wrap">
              <Mail :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="form.email" type="email" placeholder="email@contoh.com" class="field-input" :class="errors.email ? 'border-red-400' : ''" />
            </div>
            <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
          </div>

          <div>
            <label class="field-label">Nomor Telepon <span class="text-red-500">*</span></label>
            <div class="relative input-wrap">
              <Phone :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="form.phone" type="tel" placeholder="08xxxxxxxxxx" class="field-input" :class="errors.phone ? 'border-red-400' : ''" />
            </div>
            <p v-if="errors.phone" class="field-error">{{ errors.phone }}</p>
          </div>

          <div class="sm:col-span-2">
            <label class="field-label">Keterangan <span class="text-gray-400 font-normal">(opsional)</span></label>
            <textarea v-model="form.notes" rows="3" placeholder="Informasi tambahan..." class="field-input resize-none" />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Step 2: Pilih Venue -->
    <Transition name="step" mode="out-in">
      <div v-if="step === 2" key="step2" class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:rgba(14,180,190,0.12)">
            <Building2 :size="15" style="color:#0EB4BE" />
          </div>
          <h2 class="text-sm font-bold text-gray-900">Pilih Venue</h2>
        </div>

        <p v-if="errors.roomId" class="text-xs text-red-500 mb-4 flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
          {{ errors.roomId }}
        </p>

        <div class="grid sm:grid-cols-2 gap-3">
          <label
            v-for="room in availableRooms"
            :key="room.id"
            class="room-card"
            :class="form.roomId === room.id ? 'room-card-active' : ''"
          >
            <input
              type="radio"
              name="roomId"
              :value="room.id"
              v-model="form.roomId"
              class="sr-only"
            />
            <div class="flex items-start gap-3">
              <div
                class="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors"
                :class="form.roomId === room.id ? 'border-[#0EB4BE]' : 'border-gray-300'"
              >
                <div v-if="form.roomId === room.id" class="w-2.5 h-2.5 rounded-full" style="background:#0EB4BE"></div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900">{{ room.name }}</p>
                <div class="flex items-center gap-3 mt-1">
                  <span class="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin :size="11" />{{ room.terminal }}
                  </span>
                  <span class="flex items-center gap-1 text-xs text-gray-500">
                    <Users :size="11" />{{ room.capacity }} orang
                  </span>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </Transition>

    <!-- Step 3: Konfirmasi -->
    <Transition name="step" mode="out-in">
      <div v-if="step === 3" key="step3" class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:rgba(14,180,190,0.12)">
            <CheckCircle :size="15" style="color:#0EB4BE" />
          </div>
          <h2 class="text-sm font-bold text-gray-900">Konfirmasi Pemesanan</h2>
        </div>

        <div class="rounded-xl border border-gray-100 overflow-hidden mb-2">
          <div class="px-5 py-3 text-xs font-bold uppercase tracking-widest text-gray-400" style="background:#f8fafc">Detail Kegiatan</div>
          <div class="divide-y divide-gray-100">
            <div class="confirm-row"><span class="confirm-label">Nama Kegiatan</span><span class="confirm-value">{{ form.eventName }}</span></div>
            <div class="confirm-row"><span class="confirm-label">Jenis</span><span class="confirm-value">{{ form.eventType }}</span></div>
            <div class="confirm-row"><span class="confirm-label">Tanggal</span><span class="confirm-value">{{ fmtDate(form.date) }}</span></div>
            <div class="confirm-row"><span class="confirm-label">Waktu</span><span class="confirm-value">{{ form.startTime }} – {{ form.endTime }}</span></div>
            <div class="confirm-row"><span class="confirm-label">Peserta</span><span class="confirm-value">{{ form.participants }} orang</span></div>
          </div>
          <div class="px-5 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 border-t border-gray-100" style="background:#f8fafc">Venue & PIC</div>
          <div class="divide-y divide-gray-100">
            <div class="confirm-row"><span class="confirm-label">Venue</span><span class="confirm-value">{{ selectedRoom?.name }}</span></div>
            <div class="confirm-row"><span class="confirm-label">Terminal</span><span class="confirm-value">{{ selectedRoom?.terminal }}</span></div>
            <div class="confirm-row"><span class="confirm-label">PIC</span><span class="confirm-value">{{ form.pic }}</span></div>
            <div class="confirm-row"><span class="confirm-label">Email</span><span class="confirm-value">{{ form.email }}</span></div>
            <div class="confirm-row"><span class="confirm-label">No. Telepon</span><span class="confirm-value">{{ form.phone }}</span></div>
            <div v-if="form.notes" class="confirm-row"><span class="confirm-label">Keterangan</span><span class="confirm-value">{{ form.notes }}</span></div>
          </div>
        </div>

        <p class="text-xs text-gray-400 mt-4 text-center">Pastikan semua data sudah benar sebelum mengajukan booking.</p>
      </div>
    </Transition>

    <!-- Navigation Buttons -->
    <div class="flex items-center justify-between mt-6">
      <button
        v-if="step > 1"
        @click="prevStep"
        class="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft :size="16" /> Kembali
      </button>
      <div v-else />

      <button
        v-if="step < 3"
        @click="nextStep"
        class="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm transition-all hover:opacity-90 hover:-translate-y-px active:scale-95"
        style="background:linear-gradient(135deg,#0a8f97,#0EB4BE)"
      >
        Lanjut <ChevronRight :size="16" />
      </button>

      <button
        v-else
        @click="submit"
        :disabled="submitting"
        class="flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        style="background:linear-gradient(135deg,#0a8f97,#0EB4BE)"
      >
        <span v-if="submitting" class="btn-spinner" />
        <CheckCircle v-else :size="16" />
        {{ submitting ? 'Mengajukan...' : 'Ajukan Booking' }}
      </button>
    </div>

  </div>
</template>

<style scoped>
.field-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}
.field-input {
  width: 100%;
  padding: 9px 12px;
  font-size: 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  color: #111827;
  background: #f9fafb;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  outline: none;
}
.input-wrap .field-input {
  padding-left: 36px;
}
.field-input:focus {
  border-color: #0EB4BE;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(14,180,190,0.15);
}
.field-select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  cursor: pointer;
}

@media (max-width: 639px) {
  .field-input,
  .field-select {
    font-size: 16px;
    padding: 12px 14px;
    min-height: 48px;
  }
  .input-wrap .field-input {
    padding-left: 38px;
  }
  .field-select {
    padding-right: 38px;
  }
}
.field-error {
  font-size: 11px;
  color: #ef4444;
  margin-top: 4px;
}

.room-card {
  display: block;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  cursor: pointer;
  min-height: 64px;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
}
.room-card:hover { border-color: #0EB4BE; background: rgba(14,180,190,0.03); }
.room-card:active { transform: scale(0.98); }
.room-card-active { border-color: #0EB4BE; background: rgba(14,180,190,0.06); box-shadow: 0 0 0 3px rgba(14,180,190,0.12); }

@media (max-width: 639px) {
  .room-card { padding: 14px 16px; min-height: 72px; }
}

.confirm-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px 16px;
  padding: 10px 16px;
  flex-wrap: wrap;
}
.confirm-label { font-size: 12px; color: #6b7280; flex-shrink: 0; min-width: 90px; }
.confirm-value { font-size: 13px; font-weight: 600; color: #111827; text-align: right; word-break: break-word; }

.btn-spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

.step-enter-active, .step-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.step-enter-from { opacity: 0; transform: translateX(20px); }
.step-leave-to   { opacity: 0; transform: translateX(-20px); }
</style>
