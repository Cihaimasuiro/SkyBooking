export interface CalendarEvent {
  id: string
  title: string
  roomId: string
  roomName: string
  terminal: string
  date: string
  startTime: string
  endTime: string
  pic: string
  division: string
  status: 'scheduled' | 'ongoing' | 'completed'
  color?: string
}

const today = new Date()
const fmt = (d: Date) => d.toISOString().split('T')[0]
const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r }

export const events: CalendarEvent[] = [
  {
    id: 'E001',
    title: 'Pertunjukan Wayang Kulit',
    roomId: 'R001',
    roomName: 'Kawasan Maliboro',
    terminal: 'Terminal 1',
    date: fmt(today),
    startTime: '19:00',
    endTime: '22:00',
    pic: 'Budi Santoso',
    division: '',
    status: 'scheduled',
    color: 'purple',
  },
  {
    id: 'E002',
    title: 'Pameran Batik Nusantara',
    roomId: 'R002',
    roomName: 'Gedung Penghubung',
    terminal: 'Terminal 2',
    date: fmt(today),
    startTime: '09:00',
    endTime: '17:00',
    pic: 'Siti Rahayu',
    division: '',
    status: 'ongoing',
    color: 'orange',
  },
  {
    id: 'E003',
    title: 'Festival Tari Tradisional',
    roomId: 'R003',
    roomName: 'Area Partywisata',
    terminal: 'Terminal 1',
    date: fmt(today),
    startTime: '14:00',
    endTime: '18:00',
    pic: 'Dewi Kusuma',
    division: '',
    status: 'scheduled',
    color: 'teal',
  },
  {
    id: 'E004',
    title: 'Lomba Fotografi Budaya',
    roomId: 'R001',
    roomName: 'Kawasan Maliboro',
    terminal: 'Terminal 1',
    date: fmt(today),
    startTime: '10:00',
    endTime: '13:00',
    pic: 'Rizki Pratama',
    division: '',
    status: 'ongoing',
    color: 'blue',
  },
  {
    id: 'E005',
    title: 'Pertunjukan Musik Gamelan',
    roomId: 'R003',
    roomName: 'Area Partywisata',
    terminal: 'Terminal 1',
    date: fmt(today),
    startTime: '20:00',
    endTime: '22:00',
    pic: 'Ahmad Fauzi',
    division: '',
    status: 'scheduled',
    color: 'green',
  },
  {
    id: 'E006',
    title: 'Pameran Kerajinan UMKM Jogja',
    roomId: 'R002',
    roomName: 'Gedung Penghubung',
    terminal: 'Terminal 2',
    date: fmt(today),
    startTime: '08:00',
    endTime: '16:00',
    pic: 'Hendra Wijaya',
    division: '',
    status: 'ongoing',
    color: 'red',
  },
  // Besok
  {
    id: 'E007',
    title: 'Pertunjukan Sendratari Ramayana',
    roomId: 'R001',
    roomName: 'Kawasan Maliboro',
    terminal: 'Terminal 1',
    date: fmt(addDays(today, 1)),
    startTime: '19:30',
    endTime: '22:00',
    pic: 'Siti Rahayu',
    division: '',
    status: 'scheduled',
    color: 'purple',
  },
  {
    id: 'E008',
    title: 'Lomba Seni Lukis Anak',
    roomId: 'R003',
    roomName: 'Area Partywisata',
    terminal: 'Terminal 1',
    date: fmt(addDays(today, 1)),
    startTime: '09:00',
    endTime: '14:00',
    pic: 'Dewi Kusuma',
    division: '',
    status: 'scheduled',
    color: 'orange',
  },
  {
    id: 'E009',
    title: 'Pameran Foto Sejarah YIA',
    roomId: 'R002',
    roomName: 'Gedung Penghubung',
    terminal: 'Terminal 2',
    date: fmt(addDays(today, 2)),
    startTime: '10:00',
    endTime: '18:00',
    pic: 'Rizki Pratama',
    division: '',
    status: 'scheduled',
    color: 'blue',
  },
  {
    id: 'E010',
    title: 'Festival Kuliner Nusantara',
    roomId: 'R003',
    roomName: 'Area Partywisata',
    terminal: 'Terminal 1',
    date: fmt(addDays(today, 3)),
    startTime: '11:00',
    endTime: '20:00',
    pic: 'Ahmad Fauzi',
    division: '',
    status: 'scheduled',
    color: 'teal',
  },
]
