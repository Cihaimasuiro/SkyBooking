<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Menu, X, User, LayoutDashboard, CalendarDays, DoorOpen, /* Map, */ BookOpen, LogOut, ShieldCheck } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'
import NotificationBell from './NotificationBell.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const mobileOpen = ref(false)
const scrolled = ref(false)

let rafId = 0
function onScroll() {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 8
    rafId = 0
  })
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId) })

function logout() {
  auth.signOut()
  router.push('/')
}

const publicLinks = [
  { to: '/',      label: 'Home',  icon: LayoutDashboard },
  { to: '/event', label: 'Event', icon: CalendarDays    },
  { to: '/ruang', label: 'Venue', icon: DoorOpen        },
  // { to: '/map',   label: 'Peta',  icon: Map             },
]
const authLinks = [
  { to: '/booking-saya', label: 'Booking Saya', icon: BookOpen },
]
const adminLinks = [
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
]
const visibleLinks = computed(() => {
  if (!auth.isAuthenticated) return publicLinks
  if (auth.isAdmin) return [...publicLinks, ...adminLinks]
  return [...publicLinks, ...authLinks]
})

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'shadow-md shadow-blue-100/60' : ''"
    style="background:rgba(255,255,255,0.97);border-bottom:1.5px solid rgba(14,180,190,0.15)"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200"
            style="background:linear-gradient(135deg,#0a8f97,#0EB4BE)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 2-3.5 3.5L7 10.2l-.6 2.4L10 14l-2 2 2 2 2-2 1.4 3.4z" />
            </svg>
          </div>
        </RouterLink>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in visibleLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            :class="isActive(link.to)
              ? 'text-white shadow-sm'
              : 'text-gray-500 hover:text-[#0EB4BE] hover:bg-[#0EB4BE]/08'"
            :style="isActive(link.to) ? 'background:linear-gradient(135deg,#0a8f97,#0EB4BE)' : ''"
          >
            <component :is="link.icon" :size="14" />
            {{ link.label }}
          </RouterLink>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-2">
          <!-- Logged in -->
          <template v-if="auth.isAuthenticated">
            <NotificationBell />
            <div class="hidden sm:flex items-center gap-2 pl-3 border-l ml-1" style="border-color:rgba(14,180,190,0.2)">
              <div class="w-8 h-8 rounded-full flex items-center justify-center ring-2" style="background:linear-gradient(135deg,#0a8f97,#0EB4BE);ring-color:rgba(14,180,190,0.3)">
                <User :size="14" class="text-white" />
              </div>
              <div class="hidden lg:block">
                <p class="text-xs font-semibold leading-tight" style="color:#074f55">{{ auth.user?.name }}</p>
              </div>
            </div>
            <button
              @click="logout"
              class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style="color:#e53e3e"
              onmouseover="this.style.background='rgba(229,62,62,0.08)'"
              onmouseout="this.style.background='transparent'"
              title="Logout"
            >
              <LogOut :size="15" />
              <span class="hidden lg:inline">Logout</span>
            </button>
          </template>

          <!-- Not logged in -->
          <template v-else>
            <RouterLink
              to="/login"
              class="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg text-white shadow-sm transition-all hover:opacity-90"
              style="background:linear-gradient(135deg,#0a8f97,#0EB4BE)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
              </svg>
              Login
            </RouterLink>
          </template>

          <!-- Mobile toggle -->
          <button
            class="md:hidden p-2 rounded-lg transition-colors"
            style="color:#0a8f97"
            @click="mobileOpen = !mobileOpen"
          >
            <X v-if="mobileOpen" :size="20" />
            <Menu v-else :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="md:hidden px-4 py-3 space-y-1" style="background:rgba(255,255,255,0.95);border-top:1px solid rgba(14,180,190,0.12)">
        <RouterLink
          v-for="link in visibleLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          :class="isActive(link.to) ? 'text-white' : 'text-gray-500'"
          :style="isActive(link.to) ? 'background:linear-gradient(135deg,#0a8f97,#0EB4BE)' : ''"
          @click="mobileOpen = false"
        >
          <component :is="link.icon" :size="15" />
          {{ link.label }}
        </RouterLink>

        <template v-if="auth.isAuthenticated">
          <button
            @click="logout"
            class="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium w-full mt-1 pt-3"
            style="color:#e53e3e;border-top:1px solid rgba(14,180,190,0.12)"
          >
            <LogOut :size="15" />
            Logout
          </button>
        </template>
        <template v-else>
          <RouterLink
            to="/login"
            class="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-bold text-white mt-1"
            style="background:linear-gradient(135deg,#0a8f97,#0EB4BE);border-top:1px solid rgba(14,180,190,0.12)"
            @click="mobileOpen = false"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
            </svg>
            Login
          </RouterLink>
        </template>
      </div>
    </Transition>
  </nav>
</template>
