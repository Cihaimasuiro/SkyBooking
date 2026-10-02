<script setup lang="ts">
import { X, Clock, MapPin, User, Building2 } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'
import type { CalendarEvent } from '../data/events'

defineProps<{ event: CalendarEvent | null }>()
const emit = defineEmits<{ close: [] }>()

const colorAccent: Record<string, string> = {
  blue:   'bg-blue-500',
  green:  'bg-emerald-500',
  purple: 'bg-violet-500',
  orange: 'bg-orange-500',
  red:    'bg-red-500',
  teal:   'bg-teal-500',
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="event"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        @click.self="emit('close')"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="emit('close')"
        />

        <!-- Panel -->
        <Transition name="modal-panel" appear>
          <div
            v-if="event"
            class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden"
          >
            <!-- Colored top strip -->
            <div
              class="h-1.5 w-full"
              :class="colorAccent[event.color ?? 'blue']"
            />

            <div class="p-6">
              <!-- Header -->
              <div class="flex items-start justify-between mb-5">
                <div class="flex-1 min-w-0 pr-3">
                  <h3 class="text-lg font-extrabold text-gray-900 leading-tight">{{ event.title }}</h3>
                  <div class="mt-1.5">
                    <StatusBadge :status="event.status" />
                  </div>
                </div>
                <button
                  class="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors flex-shrink-0"
                  @click="emit('close')"
                >
                  <X :size="18" />
                </button>
              </div>

              <!-- Info rows -->
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock :size="15" class="text-blue-600" />
                  </div>
                  <div>
                    <p class="text-xs text-gray-400">Waktu</p>
                    <p class="font-semibold text-gray-900">{{ event.startTime }} – {{ event.endTime }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin :size="15" class="text-blue-600" />
                  </div>
                  <div>
                    <p class="text-xs text-gray-400">Lokasi</p>
                    <p class="font-semibold text-gray-900">{{ event.roomName }}</p>
                    <p class="text-xs text-gray-500">{{ event.terminal }}</p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl text-sm">
                    <div class="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User :size="13" class="text-blue-600" />
                    </div>
                    <div>
                      <p class="text-xs text-gray-400">PIC</p>
                      <p class="font-semibold text-gray-900 text-xs leading-tight">{{ event.pic }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl text-sm">
                    <div class="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 :size="13" class="text-blue-600" />
                    </div>
                    <div>
                      <p class="text-xs text-gray-400">Divisi</p>
                      <p class="font-semibold text-gray-900 text-xs leading-tight">{{ event.division }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                <span>ID: {{ event.id }}</span>
                <button
                  @click="emit('close')"
                  class="text-xs text-blue-600 font-semibold hover:text-blue-700"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
