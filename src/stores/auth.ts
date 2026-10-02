import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'skybook_auth'

const ACCOUNTS: Record<string, { password: string; name: string; role: 'user' | 'admin' }> = {
  budi:   { password: '123',       name: 'Budi',          role: 'user'  },
  admin:  { password: 'admin123',  name: 'Administrator', role: 'admin' },
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ username: string; name: string; role: 'user' | 'admin'; roleLabel: string } | null>(null)

  const isAuthenticated = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function restore() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try { user.value = JSON.parse(raw) } catch { localStorage.removeItem(STORAGE_KEY) }
    }
  }

  async function signIn(username: string, password: string) {
    await new Promise(r => setTimeout(r, 600))
    const account = ACCOUNTS[username.toLowerCase()]
    if (!account || account.password !== password) {
      throw new Error('Username atau password salah.')
    }
    user.value = { username: username.toLowerCase(), name: account.name, role: account.role, roleLabel: '' }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
  }

  function signOut() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return { user, isAuthenticated, isAdmin, restore, signIn, signOut }
})
