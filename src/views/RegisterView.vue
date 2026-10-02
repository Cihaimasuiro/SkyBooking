<template>
  <div class="login-page">
    <div class="bg-blob bg-blob-1" aria-hidden="true" />
    <div class="bg-blob bg-blob-2" aria-hidden="true" />
    <div class="bg-blob bg-blob-3" aria-hidden="true" />
    <div class="bg-blob bg-blob-4" aria-hidden="true" />

    <svg class="bg-flower bg-flower-1" viewBox="0 0 24 24" aria-hidden="true">
      <g>
        <ellipse cx="12" cy="6" rx="3" ry="5" />
        <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(120 12 12)" />
        <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(180 12 12)" />
        <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(240 12 12)" />
        <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(300 12 12)" />
        <circle cx="12" cy="12" r="2.4" />
      </g>
    </svg>
    <svg class="bg-flower bg-flower-2" viewBox="0 0 24 24" aria-hidden="true">
      <g>
        <ellipse cx="12" cy="6" rx="3" ry="5" />
        <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(120 12 12)" />
        <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(180 12 12)" />
        <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(240 12 12)" />
        <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(300 12 12)" />
        <circle cx="12" cy="12" r="2.4" />
      </g>
    </svg>

    <main class="main-content">
      <form class="card" :class="{ shake: shakeError }" @submit.prevent="handleSubmit">
        <div class="card-accent" aria-hidden="true" />

        <div class="card-heading">
          <div class="brand-mark">
            <div class="brand-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
              </svg>
            </div>
          </div>
          <h1 class="card-title">Buat Akun</h1>
          <p class="card-subtitle">Daftarkan diri untuk mengakses SkyBook YIA.</p>
        </div>

        <div class="field field-1">
          <label class="field-label" for="username">Username</label>
          <div class="input-wrap">
            <svg class="input-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.5" stroke="currentColor" stroke-width="1.5" />
              <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input
              id="username"
              v-model.trim="username"
              type="text"
              class="input"
              placeholder="johndoe"
              autocomplete="username"
              required
            />
          </div>
        </div>

        <div class="field field-2">
          <label class="field-label" for="email">Email</label>
          <div class="input-wrap">
            <svg class="input-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="5" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.5" />
              <path d="M2 7l8 5 8-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input
              id="email"
              v-model.trim="email"
              type="email"
              class="input"
              placeholder="john@example.com"
              autocomplete="email"
              required
            />
          </div>
        </div>

        <div class="field field-3">
          <label class="field-label" for="password">Password</label>
          <div class="input-wrap">
            <svg class="input-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
              <rect x="4" y="9" width="12" height="8" rx="1.8" stroke="currentColor" stroke-width="1.5" />
              <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input
              id="password"
              v-model="password"
              type="password"
              class="input"
              placeholder="••••••••"
              autocomplete="new-password"
              required
            />
          </div>
        </div>

        <p v-if="errorMsg" class="error-msg field-3b">{{ errorMsg }}</p>

        <button type="submit" class="submit-button field-4" :disabled="loading">
          <span v-if="loading" class="spinner" aria-hidden="true" />
          {{ loading ? 'Mendaftar...' : 'Daftar' }}
          <svg v-if="!loading" class="submit-arrow" width="15" height="15" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <p class="login-link field-5">
          Sudah punya akun?
          <RouterLink to="/login" class="login-link-anchor">Masuk di sini</RouterLink>
        </p>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const shakeError = ref(false)

async function handleSubmit() {
  errorMsg.value = ''
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  loading.value = false
  router.push('/login')
}
</script>

<style scoped>
.login-page {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #c8d9ed 0%, #e8f6fb 50%, #9ef0f5 100%);
}

.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
}

.bg-blob {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(72px);
  opacity: 0.28;
}
.bg-blob-1 { width: 520px; height: 520px; background: #8ab4d4; opacity: 0.35; top: -160px; left: -160px; }
.bg-blob-2 { width: 420px; height: 420px; background: #4dd8e0; opacity: 0.30; bottom: -100px; right: -120px; }
.bg-blob-3 { width: 280px; height: 280px; background: #9ef0f5; opacity: 0.22; top: 40%; left: 60%; }
.bg-blob-4 { width: 200px; height: 200px; background: #a8cfe8; opacity: 0.20; top: 20%; right: 25%; }

.bg-flower {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  will-change: transform, opacity;
}
.bg-flower-1 { top: 20%; left: -8%; width: 88px; height: 88px; fill: #8ab4d4; animation: flower-drift-1 24s linear infinite; }
.bg-flower-2 { top: 64%; left: -8%; width: 60px; height: 60px; fill: #4dd8e0; animation: flower-drift-2 32s linear infinite; }

@keyframes flower-drift-1 {
  0%   { transform: translate(0, 0) rotate(0deg);           opacity: 0;   }
  8%   {                                                     opacity: 0.4; }
  92%  {                                                     opacity: 0.4; }
  100% { transform: translate(125vw, -18vh) rotate(1080deg); opacity: 0;   }
}
@keyframes flower-drift-2 {
  0%   { transform: translate(0, 0) rotate(0deg);            opacity: 0;    }
  8%   {                                                      opacity: 0.45; }
  92%  {                                                      opacity: 0.45; }
  100% { transform: translate(120vw, 16vh) rotate(-1080deg); opacity: 0;    }
}
@media (prefers-reduced-motion: reduce) {
  .bg-flower { animation: none !important; display: none; }
}

.card {
  position: relative;
  width: 100%;
  max-width: 400px;
  padding: 36px 32px 32px;
  border-radius: 22px;
  background-color: var(--glass-bg-strong);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  box-shadow: 0 24px 60px -12px rgba(15, 23, 42, 0.22), var(--glass-shadow);
  display: flex;
  flex-direction: column;
  gap: 22px;
  overflow: hidden;
  animation: card-enter 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.card-accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-light) 45%, var(--color-accent-cyan) 100%);
}

.card.shake { animation: shake 0.42s ease-in-out; }

.card-heading, .field-1, .field-2, .field-3, .field-3b, .field-4, .field-5 {
  animation: field-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.card-heading { animation-delay: 0.05s; }
.field-1      { animation-delay: 0.12s; }
.field-2      { animation-delay: 0.17s; }
.field-3      { animation-delay: 0.22s; }
.field-3b     { animation-delay: 0.25s; }
.field-4      { animation-delay: 0.28s; }
.field-5      { animation-delay: 0.33s; }

@keyframes card-enter {
  from { opacity: 0; transform: translateY(24px) scale(0.98); }
  to   { opacity: 1; }
}
@keyframes field-enter {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; }
}
@keyframes shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(3px); }
  30%, 50%, 70% { transform: translateX(-6px); }
  40%, 60% { transform: translateX(6px); }
}
@media (prefers-reduced-motion: reduce) {
  .card, .card-heading, .field-1, .field-2, .field-3, .field-3b, .field-4, .field-5, .card.shake {
    animation: none !important;
  }
}

.card-heading { display: flex; flex-direction: column; gap: 6px; text-align: center; }
.brand-mark { display: flex; align-items: center; justify-content: center; margin: 0 auto 4px; }
.brand-icon {
  width: 56px; height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 20px rgba(0, 93, 172, 0.35);
}
.card-title { color: var(--color-text); font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
.card-subtitle { color: var(--color-text-muted); font-size: 13px; line-height: 1.5; }

.field { display: flex; flex-direction: column; gap: 4px; }
.field-label { color: var(--color-text-secondary); font-size: 12px; font-weight: 600; letter-spacing: 0.01em; }

.input-wrap { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 14px; color: var(--color-text-muted); pointer-events: none; transition: color 0.2s ease; }
.input-wrap:has(.input:focus) .input-icon { color: var(--color-primary); }
.input {
  width: 100%; height: 44px; padding: 0 14px 0 40px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-family: var(--font-sans); font-size: 14px; color: var(--color-text);
  background-color: var(--color-bg);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}
.input:focus {
  outline: none;
  border-color: var(--color-primary);
  background-color: var(--color-surface);
  box-shadow: 0 0 0 3px rgba(14, 180, 190, 0.18);
}

.error-msg { font-size: 13px; color: var(--color-danger); margin-top: -8px; text-align: center; }

.submit-button {
  height: 44px; margin-top: 4px; border: none; border-radius: 12px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: #ffffff; font-family: var(--font-sans); font-size: 14px; font-weight: 700; letter-spacing: 0.01em;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
  box-shadow: 0 4px 14px rgba(0, 93, 172, 0.28);
  transition: box-shadow 0.2s ease, transform 0.15s ease, filter 0.15s ease;
}
.submit-arrow { transition: transform 0.2s ease; }
.submit-button:hover:not(:disabled) { filter: brightness(1.06); box-shadow: 0 8px 20px rgba(0, 93, 172, 0.38); transform: translateY(-1px); }
.submit-button:hover:not(:disabled) .submit-arrow { transform: translateX(3px); }
.submit-button:active:not(:disabled) { transform: scale(0.97); }
.submit-button:disabled { background: var(--color-border-strong); box-shadow: none; cursor: not-allowed; transform: none; }

.spinner { width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #ffffff; border-radius: 50%; animation: spin 0.6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.login-link { text-align: center; font-size: 13px; color: var(--color-text-muted); margin-top: -6px; }
.login-link-anchor { color: var(--color-primary); font-weight: 600; text-decoration: none; }
.login-link-anchor:hover { text-decoration: underline; }
</style>
