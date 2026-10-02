import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { bookings as initialBookings, type Booking } from '../data/bookings'

const STORAGE_KEY = 'skybook_bookings'
const LAST_KEY    = 'skybook_last_booking'

function loadList(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return [...initialBookings]
}

function loadLast(): Booking | null {
  try {
    const raw = localStorage.getItem(LAST_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

export const useBookingStore = defineStore('booking', () => {
  const bookingList = ref<Booking[]>(loadList())
  const lastBooking = ref<Booking | null>(loadLast())

  watch(bookingList, val => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)), { deep: true })
  watch(lastBooking, val => localStorage.setItem(LAST_KEY, JSON.stringify(val)))

  function submitBooking(data: Omit<Booking, 'id' | 'status' | 'createdAt'>) {
    const id = `BK-2026-${String(bookingList.value.length + 1).padStart(5, '0')}`
    const booking: Booking = {
      ...data,
      id,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    }
    bookingList.value.unshift(booking)
    lastBooking.value = booking
    return booking
  }

  function cancelBooking(id: string) {
    const b = bookingList.value.find(b => b.id === id)
    if (b && b.status === 'pending') b.status = 'cancelled'
  }

  function approveBooking(id: string, adminNote?: string) {
    const b = bookingList.value.find(b => b.id === id)
    if (b && b.status === 'pending') {
      b.status = 'approved'
      if (adminNote) b.adminNote = adminNote
    }
  }

  function rejectBooking(id: string, rejectReason: string, adminNote?: string) {
    const b = bookingList.value.find(b => b.id === id)
    if (b && b.status === 'pending') {
      b.status = 'rejected'
      b.rejectReason = rejectReason
      if (adminNote) b.adminNote = adminNote
    }
  }

  return { bookingList, lastBooking, submitBooking, cancelBooking, approveBooking, rejectBooking }
})
