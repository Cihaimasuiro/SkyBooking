<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  CalendarDays, Search, PlusCircle, ArrowRight,
  DoorOpen, Activity, FileCheck, Users, LogIn, MapPin
} from 'lucide-vue-next'
import StatCard from '../components/StatCard.vue'
import EventList from '../components/EventList.vue'
import { useAuthStore } from '../stores/auth'
import { rooms } from '../data/rooms'
import { events } from '../data/events'
import coHero from '../assets/copernico-yfmU1uL_mp8-unsplash.webp'

const router = useRouter()
const auth = useAuthStore()

const statusDotColor: Record<string, string> = {
  available:   'bg-emerald-500',
  in_use:      'bg-blue-500',
  pending:     'bg-amber-400',
  maintenance: 'bg-red-400',
}
const statusLabel: Record<string, string> = {
  available:   'Tersedia',
  in_use:      'Booked',
  pending:     'Pending',
  maintenance: 'Maintenance',
}

const today = new Date().toISOString().split('T')[0]
const todayEvents = computed(() =>
  events.filter(e => e.date === today).sort((a, b) => a.startTime.localeCompare(b.startTime))
)

const stats = computed(() => [
  { label: 'Venue Tersedia',   value: rooms.filter(r => r.status === 'available').length, icon: DoorOpen,    color: 'green'  as const, trend: 'dari 10 venue' },
  { label: 'Booked', value: rooms.filter(r => r.status === 'in_use').length,    icon: Activity,    color: 'blue'   as const, trend: 'aktif sekarang' },
  { label: 'Event Hari Ini',   value: todayEvents.value.length,                           icon: CalendarDays, color: 'orange' as const, trend: 'terjadwal hari ini' },
  { label: 'Booking Pending',  value: 3,                                                  icon: FileCheck,   color: 'red'    as const, trend: 'menunggu approval' },
])


const todayFormatted = new Date().toLocaleDateString('id-ID', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
})

const availableCount = computed(() => rooms.filter(r => r.status === 'available').length)
</script>

<template>
  <div>
    <!-- ── Hero ── -->
    <div class="hero-wrap">
      <img :src="coHero" alt="Workspace" class="hero-img" />
      <div class="hero-overlay" />

      <div class="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-xl animate-float-up">
          <!-- Pill badge -->
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 pill-badge">
            <MapPin :size="11" />
            SkyBook · Yogyakarta International Airport
          </span>

          <h1 class="hero-title">
            Reservasi Venue<br />
            <span class="hero-accent">YIA dengan Mudah</span>
          </h1>
          <p class="hero-sub animate-float-up delay-100">
            Pesan venue di Yogyakarta International Airport secara mudah — ruang pertunjukan, area pameran, hingga gedung penghubung, semua dalam satu platform.
          </p>

          <!-- CTA buttons -->
          <div class="flex flex-wrap gap-3 mt-8 animate-float-up delay-200">
            <button
              @click="router.push('/ruang')"
              class="cta-primary"
            >
              <Search :size="15" />
              Jelajahi Venue
            </button>
            <button
              v-if="auth.isAuthenticated"
              @click="router.push('/booking')"
              class="cta-ghost"
            >
              <PlusCircle :size="15" />
              Buat Booking
            </button>
            <button
              v-else
              @click="router.push('/login')"
              class="cta-ghost"
            >
              <LogIn :size="15" />
              Login untuk Booking
            </button>
          </div>
        </div>

        <!-- Stats strip (guest) -->
        <div class="hero-stats animate-float-up delay-300">
          <div class="hero-stat">
            <span class="hero-stat-num">{{ availableCount }}</span>
            <span class="hero-stat-label">Venue Tersedia</span>
          </div>
          <div class="hero-divider" />
          <div class="hero-stat">
            <span class="hero-stat-num">2</span>
            <span class="hero-stat-label">Terminal</span>
          </div>
          <div class="hero-divider" />
          <div class="hero-stat">
            <span class="hero-stat-num">{{ rooms.length }}</span>
            <span class="hero-stat-label">Total Venue</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Venue Gallery — dark full-bleed (guest only) ── -->
    <div v-if="!auth.isAuthenticated" class="venue-dark-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- Section heading -->
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color:#0EB4BE">Fasilitas Kami</p>
            <h2 class="text-2xl sm:text-3xl font-extrabold leading-tight" style="color:#074f55">
              Venue yang Siap<br />untuk Digunakan
            </h2>
          </div>
          <button
            @click="router.push('/ruang')"
            class="venue-see-all self-start sm:self-auto"
          >
            Semua Venue <ArrowRight :size="14" />
          </button>
        </div>

        <!-- Cards grid -->
        <div class="venue-grid">
          <div
            v-for="(room, idx) in rooms.slice(0, 6)"
            :key="room.id"
            class="venue-card group"
            :class="idx === 0 ? 'venue-card-featured' : ''"
            @click="router.push(`/ruang/${room.id}`)"
          >
            <!-- Photo -->
            <img
              v-if="room.image"
              :src="room.image"
              :alt="room.name"
              class="venue-card-img"
              loading="lazy"
              decoding="async"
            />
            <div v-else class="venue-card-img venue-card-placeholder">
              <DoorOpen :size="36" class="text-white/30" />
            </div>

            <!-- Gradient overlay -->
            <div class="venue-card-overlay" />

            <!-- Status pill -->
            <span class="venue-status-pill">
              <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="statusDotColor[room.status]" />
              {{ statusLabel[room.status] }}
            </span>

            <!-- Bottom text -->
            <div class="venue-card-body">
              <p class="text-xs font-medium mb-1" style="color:rgba(255,255,255,0.55)">
                {{ room.terminal }}
              </p>
              <h3 class="venue-card-title">{{ room.name }}</h3>
              <div class="flex items-center justify-between mt-3">
                <span class="flex items-center gap-1.5 text-xs" style="color:rgba(255,255,255,0.55)">
                  <Users :size="12" />
                  {{ room.capacity }} orang
                </span>
                <span class="venue-card-cta">
                  Lihat <ChevronRight :size="13" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA login strip -->
        <div class="venue-login-strip mt-10">
          <div>
            <p class="font-bold text-base" style="color:#074f55">Tertarik booking venue ini?</p>
            <p class="text-sm mt-0.5 text-gray-500">Login untuk mengajukan permohonan penggunaan venue.</p>
          </div>
          <button @click="router.push('/login')" class="venue-login-btn flex-shrink-0">
            <LogIn :size="15" />
            Login Sekarang
          </button>
        </div>
      </div>
    </div>

    <!-- ── Content ── -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-6 relative z-10" style="content-visibility:auto;contain-intrinsic-size:0 600px">

      <!-- Stat cards — logged in only -->
      <div v-if="auth.isAuthenticated" class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          v-for="(stat, i) in stats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :icon="stat.icon"
          :color="stat.color"
          :trend="stat.trend"
          :index="i"
        />
      </div>

      <!-- Venue gallery — guest only (pulled out of container, full-bleed dark section) -->


      <!-- Event Hari Ini -->
      <div class="pb-10">
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden" style="border:1.5px solid rgba(14,180,190,0.18)">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100" style="background:rgba(14,180,190,0.06)">
            <div>
              <h2 class="text-base font-bold" style="color:#074f55">Event Hari Ini</h2>
              <p class="text-xs mt-0.5 text-gray-400">{{ todayEvents.length }} kegiatan terjadwal</p>
            </div>
            <button
              @click="router.push('/event')"
              class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style="background:rgba(14,180,190,0.10);color:#0a8f97"
              onmouseover="this.style.background='rgba(14,180,190,0.18)'"
              onmouseout="this.style.background='rgba(14,180,190,0.10)'"
            >
              Lihat Semua <ArrowRight :size="13" />
            </button>
          </div>
          <div class="px-6 py-5">
            <EventList :events="todayEvents" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Hero ── */
.hero-wrap {
  position: relative;
  height: 88vh;
  min-height: 520px;
  max-height: 780px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
}

/* Overlay: dark charcoal fading right so photo shows through */
.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(105deg,
      rgba(14, 18, 26, 0.88) 0%,
      rgba(14, 18, 26, 0.60) 45%,
      rgba(14, 18, 26, 0.20) 100%
    ),
    linear-gradient(to top,
      rgba(10, 14, 22, 0.70) 0%,
      transparent 40%
    );
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding-bottom: 64px;
}

/* Pill badge */
.pill-badge {
  background: rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.28);
  color: rgba(255,255,255,0.90);
}

/* Title */
.hero-title {
  font-size: clamp(1.6rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 1.1;
  color: #ffffff;
  letter-spacing: -0.03em;
}

.hero-accent {
  color: #ccf9fb;
}

.hero-sub {
  color: rgba(255,255,255,0.68);
  font-size: 0.95rem;
  line-height: 1.65;
  margin-top: 16px;
  max-width: 440px;
}

/* CTA buttons */
.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ffffff;
  color: #0e1a2e;
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}
.cta-primary:hover {
  background: #f0fdf4;
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.3);
}
.cta-primary:active { transform: scale(0.97); }

.cta-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  background: rgba(255,255,255,0.10);
  color: rgba(255,255,255,0.90);
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.22);
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}
.cta-ghost:hover {
  background: rgba(255,255,255,0.18);
  transform: translateY(-1px);
}
.cta-ghost:active { transform: scale(0.97); }

/* Stats strip */
.hero-stats {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 28px;
  margin-top: 40px;
}
.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hero-stat-num {
  font-size: 1.6rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -0.03em;
}
.hero-stat-label {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.55);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.hero-divider {
  width: 1px;
  height: 32px;
  background: rgba(255,255,255,0.18);
}

/* ── Bright venue section ── */
.venue-dark-section {
  background: linear-gradient(180deg, #e8fafb 0%, #f5feff 60%, #ffffff 100%);
  position: relative;
  z-index: 5;
}

/* "See all" button */
.venue-see-all {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border: 1.5px solid #0EB4BE;
  border-radius: 10px;
  background: rgba(14, 180, 190, 0.07);
  color: #0a8f97;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.venue-see-all:hover {
  background: #0EB4BE;
  color: #ffffff;
}

/* Grid — first card spans 2 rows on desktop */
.venue-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 16px;
}

@media (max-width: 1023px) {
  .venue-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 639px) {
  .venue-grid {
    grid-template-columns: 1fr;
  }
}

/* Card */
.venue-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  height: 240px;
  background: #1a1f28;
  contain: layout paint;
}
.venue-card-featured {
  grid-row: span 2;
  height: 100%;
  min-height: 496px;
}
@media (max-width: 639px) {
  .venue-card-featured { min-height: 300px; }
  .venue-card { height: 220px; }
}

.venue-card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.85);
}
.venue-card:hover .venue-card-img {
  filter: brightness(1);
}

/* Bottom gradient overlay */
.venue-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5, 8, 14, 0.90) 0%,
    rgba(5, 8, 14, 0.40) 45%,
    rgba(5, 8, 14, 0.05) 100%
  );
}

/* Status pill */
.venue-status-pill {
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(10, 14, 22, 0.82);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.85);
  font-size: 11px;
  font-weight: 600;
}

/* Card body (bottom) */
.venue-card-body {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 18px 18px;
}
.venue-card-title {
  font-size: 1rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.venue-card-featured .venue-card-title {
  font-size: 1.25rem;
}
.venue-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: 600;
  color: #0EB4BE;
  transition: gap 0.15s ease;
}
.venue-card:hover .venue-card-cta {
  gap: 6px;
}

/* Login strip */
.venue-login-strip {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 28px;
  border-radius: 18px;
  border: 1.5px solid rgba(14, 180, 190, 0.25);
  background: linear-gradient(135deg, rgba(14,180,190,0.08) 0%, rgba(45,204,214,0.04) 100%);
}
@media (min-width: 640px) {
  .venue-login-strip {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.venue-login-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  background: linear-gradient(135deg, #0EB4BE, #2dccd6);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(14, 180, 190, 0.35);
  transition: filter 0.15s ease, transform 0.15s ease;
}
.venue-login-btn:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}
.venue-login-btn:active { transform: scale(0.97); }

/* Venue card placeholder (light bg) */
.venue-card-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d0f4f6;
}
</style>
