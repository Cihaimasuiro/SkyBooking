<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router'
import { LayoutDashboard, BookOpen, ChevronRight, LogOut, Menu, X, ShieldCheck } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const route  = useRoute()
const router = useRouter()
const auth   = useAuthStore()
const sidebarOpen = ref(false)

const navItems = [
  { to: '/admin',         label: 'Dashboard',       icon: LayoutDashboard, exact: true },
  { to: '/admin/booking', label: 'Kelola Booking',  icon: BookOpen },
]

function isActive(item: typeof navItems[0]) {
  return item.exact ? route.path === item.to : route.path.startsWith(item.to)
}

function logout() {
  auth.signOut()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex bg-slate-100">

    <!-- Sidebar overlay (mobile) -->
    <Transition name="overlay">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/50 z-30 lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 h-full z-40 flex flex-col w-64 bg-[#0f172a] transition-transform duration-300"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Brand -->
      <div class="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,#0a8f97,#0EB4BE)">
          <ShieldCheck :size="16" class="text-white" />
        </div>
        <div>
          <p class="text-white font-black text-sm tracking-wide">SkyBook</p>
          <p class="text-slate-400 text-[10px] font-medium uppercase tracking-widest">Admin Panel</p>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          @click="sidebarOpen = false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
          :class="isActive(item)
            ? 'bg-[#0EB4BE]/20 text-[#0EB4BE]'
            : 'text-slate-400 hover:bg-white/5 hover:text-white'"
        >
          <component :is="item.icon" :size="17" />
          <span class="flex-1">{{ item.label }}</span>
          <ChevronRight :size="14" class="opacity-0 group-hover:opacity-60 transition-opacity" :class="isActive(item) ? 'opacity-60' : ''" />
        </RouterLink>
      </nav>

      <!-- User info + logout -->
      <div class="px-3 py-4 border-t border-white/10">
        <div class="flex items-center gap-3 px-3 py-2.5 mb-1">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white" style="background:linear-gradient(135deg,#0a8f97,#0EB4BE)">
            {{ auth.user?.name.charAt(0) }}
          </div>
          <div class="min-w-0">
            <p class="text-white text-sm font-semibold truncate">{{ auth.user?.name }}</p>
            <p class="text-slate-500 text-xs">Administrator</p>
          </div>
        </div>
        <button
          @click="logout"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors"
        >
          <LogOut :size="16" />
          Keluar
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0 lg:pl-64">

      <!-- Top bar -->
      <header class="sticky top-0 z-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 h-14">
        <div class="flex items-center gap-3">
          <button
            class="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            @click="sidebarOpen = !sidebarOpen"
          >
            <Menu v-if="!sidebarOpen" :size="20" />
            <X v-else :size="20" />
          </button>
          <h2 class="font-bold text-gray-900 text-sm sm:text-base">
            {{ navItems.find(i => isActive(i))?.label ?? 'Admin' }}
          </h2>
        </div>
        <div class="flex items-center gap-2">
          <span class="hidden sm:inline text-xs text-slate-400 font-medium">{{ auth.user?.name }}</span>
          <div class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white" style="background:linear-gradient(135deg,#0a8f97,#0EB4BE)">
            {{ auth.user?.name.charAt(0) }}
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.overlay-enter-active, .overlay-leave-active { transition: opacity 0.2s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }
</style>
