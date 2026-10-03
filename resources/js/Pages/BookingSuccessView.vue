<script setup lang="ts">
import { computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { CheckCircle, ArrowRight, CalendarDays, Clock, MapPin, User } from 'lucide-vue-next'



const props = defineProps<{ booking?: any }>();
const booking = computed(() => props.booking?.lastBooking)

function fmtDate(d?: string) {
  if (!d) return '–'
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Success icon -->
      <div class="text-center mb-8 animate-fade-in">
        <div class="relative inline-flex animate-pop">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle :size="40" class="text-green-600" />
          </div>
          <div class="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pop delay-200">
            <CheckCircle :size="14" class="text-white" />
          </div>
        </div>
        <h1 class="text-2xl font-extrabold text-gray-900 mt-5 mb-1 animate-float-up delay-200">Booking Berhasil Diajukan</h1>
        <p class="text-gray-500 text-sm animate-float-up delay-300">Permohonan Anda telah diterima dan menunggu persetujuan.</p>
      </div>

      <!-- Booking card -->
      <div v-if="booking" class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-5 animate-slide-up delay-300">
        <!-- ID header -->
        <div class="gradient-navy px-6 py-5 text-center">
          <p class="text-xs text-blue-300 font-semibold uppercase tracking-widest mb-1">Booking ID</p>
          <p class="text-2xl font-black text-white font-mono tracking-wide">{{ booking.id }}</p>
          <div class="mt-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-400/20 text-orange-200 text-xs font-semibold rounded-full border border-orange-400/30">
              <span class="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
              Waiting for Approval
            </span>
          </div>
        </div>

        <!-- Details -->
        <div class="px-6 py-5 space-y-3">
          <div class="flex items-center gap-3 text-sm">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <CalendarDays :size="15" class="text-blue-600" />
            </div>
            <div>
              <p class="text-xs text-gray-500">Kegiatan</p>
              <p class="font-semibold text-gray-900">{{ booking.eventName }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin :size="15" class="text-blue-600" />
            </div>
            <div>
              <p class="text-xs text-gray-500">Ruang</p>
              <p class="font-semibold text-gray-900">{{ booking.roomName }} · {{ booking.terminal }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock :size="15" class="text-blue-600" />
            </div>
            <div>
              <p class="text-xs text-gray-500">Jadwal</p>
              <p class="font-semibold text-gray-900">{{ fmtDate(booking.date) }}, {{ booking.startTime }} – {{ booking.endTime }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <User :size="15" class="text-blue-600" />
            </div>
            <div>
              <p class="text-xs text-gray-500">PIC</p>
              <p class="font-semibold text-gray-900">{{ booking.pic }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col gap-3 animate-slide-up delay-400">
        <button
          @click="router.visit('/booking-saya')"
          class="flex items-center justify-center gap-2 w-full py-3.5 gradient-navy text-white text-sm font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-900/20"
        >
          Lihat Booking Saya <ArrowRight :size="16" />
        </button>
        <button
          @click="router.visit('/')"
          class="w-full py-3.5 bg-white text-gray-700 text-sm font-medium rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
</template>
