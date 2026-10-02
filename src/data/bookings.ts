export interface Booking {
  id: string
  eventName: string
  eventType: string
  roomId: string
  roomName: string
  terminal: string
  date: string
  startTime: string
  endTime: string
  participants: number
  pic: string
  email: string
  phone: string
  division: string
  notes?: string
  adminNote?: string
  rejectReason?: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  createdAt: string
}

export const bookings: Booking[] = [
  {
    id: 'BK-2026-00001',
    eventName: 'Pameran Produk Lokal',
    eventType: 'Pameran',
    roomId: 'R001',
    roomName: 'Kawasan Maliboro',
    terminal: 'Terminal 1',
    date: '2026-09-22',
    startTime: '08:00',
    endTime: '17:00',
    participants: 150,
    pic: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '08123456789',
    division: '',
    status: 'approved',
    createdAt: '2026-09-18',
  },
  {
    id: 'BK-2026-00002',
    eventName: 'Lomba Tari Daerah',
    eventType: 'Lomba',
    roomId: 'R003',
    roomName: 'Area Partywisata',
    terminal: 'Terminal 1',
    date: '2026-09-24',
    startTime: '09:00',
    endTime: '17:00',
    participants: 100,
    pic: 'Dewi Kusuma',
    email: 'dewi@example.com',
    phone: '08987654321',
    division: '',
    status: 'pending',
    createdAt: '2026-09-19',
  },
  {
    id: 'BK-2026-00003',
    eventName: 'Pertunjukan Seni Budaya',
    eventType: 'Pertunjukan',
    roomId: 'R001',
    roomName: 'Kawasan Maliboro',
    terminal: 'Terminal 1',
    date: '2026-09-27',
    startTime: '18:00',
    endTime: '21:00',
    participants: 180,
    pic: 'Rizki Pratama',
    email: 'rizki@example.com',
    phone: '08111222333',
    division: '',
    status: 'rejected',
    createdAt: '2026-09-20',
  },
  {
    id: 'BK-2026-00004',
    eventName: 'Pameran UMKM',
    eventType: 'Pameran',
    roomId: 'R002',
    roomName: 'Gedung Penghubung',
    terminal: 'Terminal 2',
    date: '2026-09-30',
    startTime: '10:00',
    endTime: '16:00',
    participants: 60,
    pic: 'Ahmad Fauzi',
    email: 'ahmad@example.com',
    phone: '08222333444',
    division: '',
    status: 'approved',
    createdAt: '2026-09-22',
  },
]
