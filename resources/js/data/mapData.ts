export const SVG_W = 860
export const SVG_H = 440

export type PhantomType = 'corridor' | 'office' | 'lobby' | 'service'

export interface PhantomArea {
  label: string
  x: number; y: number; w: number; h: number
  type: PhantomType
}

export interface RoomCoord {
  roomId: string
  x: number; y: number; w: number; h: number
}

export interface FloorPlan {
  terminal: string
  floor: number
  label: string
  rooms: RoomCoord[]
  phantoms: PhantomArea[]
}

export const phantomColors: Record<PhantomType, { fill: string; stroke: string; text: string }> = {
  corridor: { fill: '#e2e8f0', stroke: '#cbd5e1', text: '#94a3b8' },
  office:   { fill: '#eff6ff', stroke: '#bfdbfe', text: '#93c5fd' },
  lobby:    { fill: '#ecfdf5', stroke: '#a7f3d0', text: '#6ee7b7' },
  service:  { fill: '#faf5ff', stroke: '#e9d5ff', text: '#c4b5fd' },
}

export const floorPlans: FloorPlan[] = [
  // ── Terminal 1 ─────────────────────────────────────────
  {
    terminal: 'Terminal 1', floor: 1, label: 'Lantai 1',
    rooms: [
      { roomId: 'R004', x: 200, y: 30, w: 460, h: 220 },
    ],
    phantoms: [
      { label: 'Lobby',       x: 20,  y: 30,  w: 150, h: 220, type: 'lobby'    },
      { label: 'Koridor',     x: 0,   y: 268, w: 860, h: 44,  type: 'corridor' },
      { label: 'Area Servis', x: 690, y: 30,  w: 150, h: 220, type: 'service'  },
      { label: 'Backstage',   x: 200, y: 312, w: 460, h: 108, type: 'service'  },
      { label: 'Storage',     x: 20,  y: 312, w: 150, h: 108, type: 'service'  },
      { label: 'Storage',     x: 690, y: 312, w: 150, h: 108, type: 'service'  },
    ],
  },
  {
    terminal: 'Terminal 1', floor: 2, label: 'Lantai 2',
    rooms: [
      { roomId: 'R001', x: 20, y: 30, w: 200, h: 165 },
      { roomId: 'R002', x: 260, y: 30, w: 240, h: 165 },
      { roomId: 'R008', x: 560, y: 30, w: 280, h: 165 },
    ],
    phantoms: [
      { label: 'Koridor', x: 0, y: 213, w: 860, h: 44, type: 'corridor' },
      { label: 'Open Office', x: 20, y: 275, w: 580, h: 145, type: 'office' },
      { label: 'Area Servis', x: 640, y: 275, w: 200, h: 145, type: 'service' },
    ],
  },
  {
    terminal: 'Terminal 1', floor: 3, label: 'Lantai 3',
    rooms: [
      { roomId: 'R006', x: 20, y: 30, w: 260, h: 165 },
      { roomId: 'R010', x: 320, y: 30, w: 520, h: 360 },
    ],
    phantoms: [
      { label: 'Koridor', x: 0, y: 213, w: 260, h: 44, type: 'corridor' },
      { label: 'Area Servis', x: 20, y: 275, w: 260, h: 145, type: 'service' },
    ],
  },

  // ── Terminal 2 ─────────────────────────────────────────
  {
    terminal: 'Terminal 2', floor: 1, label: 'Lantai 1',
    rooms: [
      { roomId: 'R005', x: 20, y: 30, w: 280, h: 200 },
    ],
    phantoms: [
      { label: 'Koridor', x: 0, y: 248, w: 860, h: 44, type: 'corridor' },
      { label: 'Open Office', x: 320, y: 30, w: 280, h: 200, type: 'office' },
      { label: 'Area Servis', x: 640, y: 30, w: 200, h: 200, type: 'service' },
      { label: '', x: 20, y: 310, w: 820, h: 110, type: 'office' },
    ],
  },
  {
    terminal: 'Terminal 2', floor: 2, label: 'Lantai 2',
    rooms: [
      { roomId: 'R009', x: 20, y: 30, w: 230, h: 180 },
    ],
    phantoms: [
      { label: 'Koridor', x: 0, y: 228, w: 860, h: 44, type: 'corridor' },
      { label: 'Open Office', x: 280, y: 30, w: 360, h: 180, type: 'office' },
      { label: 'Area Servis', x: 680, y: 30, w: 160, h: 180, type: 'service' },
      { label: '', x: 20, y: 290, w: 820, h: 130, type: 'office' },
    ],
  },
  {
    terminal: 'Terminal 2', floor: 3, label: 'Lantai 3',
    rooms: [
      { roomId: 'R003', x: 220, y: 30, w: 400, h: 240 },
    ],
    phantoms: [
      { label: 'Resepsi', x: 20, y: 30, w: 180, h: 170, type: 'lobby' },
      { label: 'Koridor', x: 0, y: 218, w: 860, h: 44, type: 'corridor' },
      { label: 'Pantry', x: 650, y: 30, w: 190, h: 170, type: 'service' },
      { label: 'Open Office', x: 20, y: 280, w: 820, h: 140, type: 'office' },
    ],
  },
  {
    terminal: 'Terminal 2', floor: 4, label: 'Lantai 4',
    rooms: [
      { roomId: 'R007', x: 530, y: 30, w: 310, h: 220 },
    ],
    phantoms: [
      { label: 'Executive Lounge', x: 20, y: 30, w: 340, h: 220, type: 'lobby' },
      { label: 'Koridor', x: 0, y: 268, w: 860, h: 44, type: 'corridor' },
      { label: 'Ruang Direksi', x: 380, y: 30, w: 130, h: 130, type: 'office' },
      { label: 'Area Servis', x: 380, y: 178, w: 130, h: 72, type: 'service' },
      { label: '', x: 20, y: 330, w: 820, h: 90, type: 'office' },
    ],
  },
]
