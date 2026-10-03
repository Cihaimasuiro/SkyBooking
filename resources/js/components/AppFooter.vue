<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div class="footer-grid">

          <!-- Brand -->
          <div class="footer-brand">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,#0a8f97,#0EB4BE)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 2-3.5 3.5L7 10.2l-.6 2.4L10 14l-2 2 2 2 2-2 1.4 3.4z" />
                </svg>
              </div>
              <div>
                <p class="font-bold text-base leading-tight" style="color:#074f55">SkyBook YIA</p>
                <p class="text-[10px] leading-tight" style="color:#0EB4BE">Yogyakarta International Airport</p>
              </div>
            </div>
            <p class="footer-desc">
              Platform reservasi venue resmi Yogyakarta International Airport untuk kebutuhan pertunjukan, pameran, lomba, dan acara korporat.
            </p>
            <!-- Social -->
            <div class="flex gap-2.5 mt-5">
              <a href="#" class="social-btn" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" class="social-btn" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="3"/>
                  <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>
                </svg>
              </a>
              <a href="#" class="social-btn" aria-label="Email">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 7 10-7"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Navigasi -->
          <div>
            <p class="footer-col-title">Navigasi</p>
            <ul class="footer-links">
              <li><RouterLink to="/">Beranda</RouterLink></li>
              <li><RouterLink to="/ruang">Daftar Venue</RouterLink></li>
              <li><RouterLink to="/event">Jadwal Event</RouterLink></li>
              <li><RouterLink to="/map">Peta Venue</RouterLink></li>
              <li><RouterLink to="/booking">Ajukan Booking</RouterLink></li>
            </ul>
          </div>

          <!-- Layanan -->
          <div>
            <p class="footer-col-title">Layanan</p>
            <ul class="footer-links">
              <li><a href="#">Ruang Rapat</a></li>
              <li><a href="#">Aula & Event Hall</a></li>
              <li><a href="#">Ruang Konferensi</a></li>
              <li><a href="#">Ruang Pelatihan</a></li>
              <li><a href="#">Ruang Briefing</a></li>
            </ul>
          </div>

          <!-- Kontak -->
          <div>
            <p class="footer-col-title">Kontak & Lokasi</p>
            <ul class="footer-contact">
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                <span>Yogyakarta International Airport<br/>Jl. Yogya-Wates KM 37, Kulon Progo</span>
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.61 19a19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.91-8.18A2 2 0 0 1 3.68 2.72h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>(021) 550-5079</span>
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                <span>venue@injourneyairports.id</span>
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>Senin – Jumat, 08.00 – 17.00 WIB</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-xs text-gray-400">
          © {{ year }} SkyBook YIA · Yogyakarta International Airport · PT Angkasa Pura Indonesia (InJourney Airports).
        </p>
        <div class="flex items-center gap-4">
          <a href="#" class="footer-bottom-link">Kebijakan Privasi</a>
          <a href="#" class="footer-bottom-link">Syarat & Ketentuan</a>
          <a href="#" class="footer-bottom-link">Bantuan</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Link as RouterLink } from '@inertiajs/vue3'
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #ffffff;
  border-top: 2px solid #0EB4BE;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.4fr;
  gap: 48px;
}
@media (max-width: 1023px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
}
@media (max-width: 639px) {
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
}

/* Brand */
.footer-desc {
  font-size: 13px;
  line-height: 1.7;
  color: #64748b;
  max-width: 280px;
}

/* Social buttons */
.social-btn {
  width: 34px; height: 34px;
  border-radius: 8px;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  display: flex; align-items: center; justify-content: center;
  color: #94a3b8;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.social-btn:hover {
  background: #0EB4BE;
  color: #ffffff;
  border-color: #0EB4BE;
}

/* Column title */
.footer-col-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #0EB4BE;
  margin-bottom: 16px;
}

/* Nav links */
.footer-links {
  list-style: none;
  padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 10px;
}
.footer-links a {
  font-size: 13.5px;
  color: #475569;
  text-decoration: none;
  transition: color 0.15s ease;
}
.footer-links a:hover { color: #0EB4BE; }

/* Contact list */
.footer-contact {
  list-style: none;
  padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 12px;
}
.footer-contact li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
}
.footer-contact li svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: #0EB4BE;
}

/* Bottom bar */
.footer-bottom {
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}
.footer-bottom-link {
  font-size: 12px;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.15s ease;
}
.footer-bottom-link:hover { color: #0EB4BE; }
</style>
