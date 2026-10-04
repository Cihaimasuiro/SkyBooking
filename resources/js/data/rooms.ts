export interface Room {
  id: string
  name: string
  terminal: string
  location: string
  capacity: number
  facilities: string[]
  status: 'available' | 'in_use' | 'pending' | 'maintenance'
  image?: string
}

export const rooms: Room[] = [
  {
    id: 'R001',
    name: 'Kawasan Maliboro',
    terminal: 'Terminal 1',
    location: 'Area Publik, Lantai 1',
    capacity: 200,
    facilities: ['Panggung', 'Sound System', 'AC', 'WiFi', 'Lighting', 'Proyektor'],
    status: 'available',
    image: '/images/kawasan-maliboro.webp',
  },
  {
    id: 'R002',
    name: 'Gedung Penghubung',
    terminal: 'Terminal 2',
    location: 'Area Penghubung, Lantai 2',
    capacity: 80,
    facilities: ['Proyektor', 'WiFi', 'AC', 'Sound System', 'Whiteboard'],
    status: 'in_use',
    image: '/images/gedung-penghubung.webp',
  },
  {
    id: 'R003',
    name: 'Area Partywisata',
    terminal: 'Terminal 1',
    location: 'Area Wisata, Lantai 1',
    capacity: 150,
    facilities: ['Panggung', 'Sound System', 'AC', 'WiFi', 'Lighting', 'Dekorasi'],
    status: 'available',
    image: '/images/area-partywisata.webp',
  },
]
