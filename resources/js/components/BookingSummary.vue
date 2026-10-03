<script setup lang="ts">

defineProps<{
  eventName?: string
  roomName?: string
  terminal?: string
  date?: string
  startTime?: string
  endTime?: string
  participants?: number
  pic?: string
}>()

function fmtDate(d?: string) {
  if (!d) return '–'
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="bg-gray-50 rounded-xl border border-gray-200 p-5">
    <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Ringkasan Booking</h3>
    <div class="space-y-3">
      <div>
        <p class="text-xs text-gray-500 mb-0.5">Kegiatan</p>
        <p class="text-sm font-semibold text-gray-900">{{ eventName || '–' }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-500 mb-0.5">Ruang</p>
        <p class="text-sm font-semibold text-gray-900">{{ roomName || '–' }}</p>
        <p v-if="terminal" class="text-xs text-gray-500">{{ terminal }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-500 mb-0.5">Tanggal</p>
        <p class="text-sm font-semibold text-gray-900">{{ fmtDate(date) }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-500 mb-0.5">Waktu</p>
        <p class="text-sm font-semibold text-gray-900">
          {{ startTime || '–' }} – {{ endTime || '–' }}
        </p>
      </div>
      <div v-if="participants">
        <p class="text-xs text-gray-500 mb-0.5">Peserta</p>
        <p class="text-sm font-semibold text-gray-900">{{ participants }} Orang</p>
      </div>
      <div v-if="pic">
        <p class="text-xs text-gray-500 mb-0.5">PIC</p>
        <p class="text-sm font-semibold text-gray-900">{{ pic }}</p>
      </div>
    </div>
    <div class="mt-4 pt-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500">Status</span>
        <span class="px-2.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Pending</span>
      </div>
    </div>
  </div>
</template>
