import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface Notification {
  id: string
  bookingId: string
  eventName: string
  status: 'approved' | 'rejected' | 'pending'
  rejectReason?: string
  adminNote?: string
  createdAt: string
  read: boolean
}

const STORAGE_KEY = 'skybook_notifications'

const defaultNotifs: Notification[] = [
  {
    id: 'N001',
    bookingId: 'BK-2026-00001',
    eventName: 'Pameran Produk Lokal',
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: false,
  },
  {
    id: 'N002',
    bookingId: 'BK-2026-00003',
    eventName: 'Pertunjukan Seni Budaya',
    status: 'rejected',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
  },
]

function loadList(): Notification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return defaultNotifs
}

export const useNotificationStore = defineStore('notifications', () => {
  const list = ref<Notification[]>(loadList())

  watch(list, val => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)), { deep: true })

  const unreadCount = computed(() => list.value.filter(n => !n.read).length)

  function addNotification(n: Omit<Notification, 'id' | 'createdAt' | 'read'>) {
    list.value.unshift({
      ...n,
      id: `N${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    })
  }

  function markAllRead() {
    list.value.forEach(n => { n.read = true })
  }

  function markRead(id: string) {
    const n = list.value.find(n => n.id === id)
    if (n) n.read = true
  }

  function timeAgo(iso: string) {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
    if (diff < 60)   return 'Baru saja'
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
    return `${Math.floor(diff / 86400)} hari lalu`
  }

  return { list, unreadCount, addNotification, markAllRead, markRead, timeAgo }
})
