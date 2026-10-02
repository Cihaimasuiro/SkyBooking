<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Bell, CheckCheck, CheckCircle, XCircle, Clock } from 'lucide-vue-next'
import { useNotificationStore } from '../stores/notifications'

const store = useNotificationStore()
const open  = ref(false)
const bell  = ref<HTMLElement | null>(null)

function toggle() {
  open.value = !open.value
  if (open.value) store.markAllRead()
}

function onOutside(e: MouseEvent) {
  if (bell.value && !bell.value.contains(e.target as Node)) open.value = false
}

onMounted(()  => document.addEventListener('mousedown', onOutside))
onUnmounted(() => document.removeEventListener('mousedown', onOutside))
</script>

<template>
  <div ref="bell" class="relative">
    <!-- Bell button -->
    <button
      @click="toggle"
      class="relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
      :class="open ? 'bg-[#0EB4BE]/12' : 'hover:bg-gray-100'"
      title="Notifikasi"
    >
      <Bell :size="18" :class="open ? 'text-[#0EB4BE]' : 'text-gray-500'" />
      <span
        v-if="store.unreadCount > 0"
        class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
        style="background:#ef4444;line-height:1"
      >{{ store.unreadCount }}</span>
    </button>

    <!-- Dropdown -->
    <Transition name="notif-drop">
      <div
        v-if="open"
        class="absolute right-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
        style="width:min(320px, calc(100vw - 24px));box-shadow:0 12px 40px rgba(0,0,0,0.14)"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p class="text-sm font-bold text-gray-900">Notifikasi</p>
          <button
            v-if="store.list.length"
            @click="store.markAllRead"
            class="flex items-center gap-1 text-xs text-[#0EB4BE] font-medium hover:underline"
          >
            <CheckCheck :size="13" /> Tandai semua dibaca
          </button>
        </div>

        <!-- List -->
        <div class="max-h-80 overflow-y-auto divide-y divide-gray-50">
          <div
            v-for="n in store.list"
            :key="n.id"
            class="flex items-start gap-3 px-4 py-3 transition-colors"
            :class="!n.read ? 'bg-blue-50/50' : 'hover:bg-gray-50'"
            @click="store.markRead(n.id)"
          >
            <!-- Icon -->
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              :class="n.status === 'approved' ? 'bg-emerald-100' : n.status === 'rejected' ? 'bg-red-100' : 'bg-amber-100'"
            >
              <CheckCircle v-if="n.status === 'approved'" :size="15" class="text-emerald-600" />
              <XCircle     v-else-if="n.status === 'rejected'" :size="15" class="text-red-500" />
              <Clock       v-else                              :size="15" class="text-amber-500" />
            </div>

            <!-- Text -->
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-gray-900 leading-snug">
                Booking
                <span :class="n.status === 'approved' ? 'text-emerald-600' : n.status === 'rejected' ? 'text-red-500' : 'text-amber-500'">
                  {{ n.status === 'approved' ? 'Disetujui' : n.status === 'rejected' ? 'Ditolak' : 'Diajukan' }}
                </span>
              </p>
              <p class="text-xs text-gray-600 truncate mt-0.5">{{ n.eventName }}</p>
              <p class="text-[10px] text-gray-400 mt-1">{{ store.timeAgo(n.createdAt) }} · {{ n.bookingId }}</p>
            </div>

            <!-- Unread dot -->
            <span v-if="!n.read" class="w-2 h-2 rounded-full bg-[#0EB4BE] flex-shrink-0 mt-1.5" />
          </div>

          <div v-if="!store.list.length" class="py-10 text-center">
            <Bell :size="28" class="text-gray-200 mx-auto mb-2" />
            <p class="text-sm text-gray-400">Belum ada notifikasi</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.notif-drop-enter-active { transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.22,1,0.36,1); }
.notif-drop-leave-active { transition: opacity 0.12s ease, transform 0.12s ease; }
.notif-drop-enter-from   { opacity: 0; transform: translateY(-6px) scale(0.97); }
.notif-drop-leave-to     { opacity: 0; transform: translateY(-4px) scale(0.98); }
</style>
