export type FurnitureType =
  | 'chair'
  | 'stage'
  | 'podium'
  | 'speaker'
  | 'desk'
  | 'sofa'
  | 'reception'
  | 'storage'
  | 'ac'
  | 'door'
  | 'light'
  | 'plant'
  | 'screen'

export interface FurnitureItem {
  type: FurnitureType
  x: number
  y: number
  w: number
  h: number
  label?: string
  // door
  openDir?: 'up' | 'down' | 'left' | 'right'
  // repeat chairs in a row
  repeatX?: number
  stepX?: number
}

export interface FurnitureLayout {
  terminal: string
  floor: number
  items: FurnitureItem[]
}

// ─── Helper: compute SVG path strings for door symbol ──────
export function getDoorPaths(x: number, y: number, w: number, openDir: string) {
  // Pivot at (x, y). Door leaf shown open at 90°.
  // Arc sweeps from open tip back to closed tip (clockwise into room).
  switch (openDir) {
    case 'up':    // door in south wall, opens upward
      return {
        panel: `M ${x},${y} L ${x},${y - w}`,
        arc:   `M ${x},${y - w} A ${w},${w} 0 0,1 ${x + w},${y}`,
      }
    case 'down':  // door in north wall, opens downward
      return {
        panel: `M ${x},${y} L ${x},${y + w}`,
        arc:   `M ${x},${y + w} A ${w},${w} 0 0,0 ${x + w},${y}`,
      }
    case 'right': // door in west wall, opens rightward
      return {
        panel: `M ${x},${y} L ${x},${y - w}`,
        arc:   `M ${x},${y - w} A ${w},${w} 0 0,1 ${x + w},${y}`,
      }
    case 'left':  // door in east wall, opens leftward
      return {
        panel: `M ${x},${y} L ${x},${y + w}`,
        arc:   `M ${x},${y + w} A ${w},${w} 0 0,0 ${x - w},${y}`,
      }
    default:
      return { panel: '', arc: '' }
  }
}

// ─── Floor plan furniture layouts ──────────────────────────
export const furnitureLayouts: FurnitureLayout[] = [
  {
    terminal: 'Terminal 1',
    floor: 1,
    items: [
      // ── Event Hall R004 (x=200–660, y=30–250) ─────────────

      // Stage platform
      { type: 'stage',    x: 210, y: 38,  w: 440, h: 55 },
      // Projection screen (line at back of stage)
      { type: 'screen',   x: 320, y: 38,  w: 180, h: 4  },
      // Podium / lectern (center stage)
      { type: 'podium',   x: 420, y: 50,  w: 20,  h: 32 },
      // Stage speakers (left & right)
      { type: 'speaker',  x: 214, y: 42,  w: 13,  h: 17 },
      { type: 'speaker',  x: 633, y: 42,  w: 13,  h: 17 },
      // Ceiling lights — row above stage
      { type: 'light', x: 258, y: 62, w: 8, h: 6, repeatX: 8, stepX: 50 },
      // Ceiling lights — row above seating
      { type: 'light', x: 232, y: 155, w: 8, h: 6, repeatX: 9, stepX: 46 },
      // AC units on side walls
      { type: 'ac',       x: 202, y: 150, w: 5,   h: 18 },
      { type: 'ac',       x: 653, y: 150, w: 5,   h: 18 },
      // Chairs — 5 rows × 2 blocks × 9 chairs = 90 seats
      // Row 1
      { type: 'chair', x: 225, y: 108, w: 13, h: 13, repeatX: 9, stepX: 22 },
      { type: 'chair', x: 461, y: 108, w: 13, h: 13, repeatX: 9, stepX: 22 },
      // Row 2
      { type: 'chair', x: 225, y: 132, w: 13, h: 13, repeatX: 9, stepX: 22 },
      { type: 'chair', x: 461, y: 132, w: 13, h: 13, repeatX: 9, stepX: 22 },
      // Row 3
      { type: 'chair', x: 225, y: 156, w: 13, h: 13, repeatX: 9, stepX: 22 },
      { type: 'chair', x: 461, y: 156, w: 13, h: 13, repeatX: 9, stepX: 22 },
      // Row 4
      { type: 'chair', x: 225, y: 180, w: 13, h: 13, repeatX: 9, stepX: 22 },
      { type: 'chair', x: 461, y: 180, w: 13, h: 13, repeatX: 9, stepX: 22 },
      // Row 5
      { type: 'chair', x: 225, y: 204, w: 13, h: 13, repeatX: 9, stepX: 22 },
      { type: 'chair', x: 461, y: 204, w: 13, h: 13, repeatX: 9, stepX: 22 },
      // Door — main entrance from corridor (pivot left side)
      { type: 'door', x: 370, y: 250, w: 34, h: 0, openDir: 'up' },

      // ── Lobby (x=20–170, y=30–250) ──────────────────────

      // Reception desk (L-shape: two rects)
      { type: 'reception', x: 30,  y: 42,  w: 90, h: 18 },
      { type: 'reception', x: 30,  y: 60,  w: 18, h: 28 },
      // Waiting sofas
      { type: 'sofa',      x: 28,  y: 112, w: 55, h: 18 },
      { type: 'sofa',      x: 28,  y: 142, w: 55, h: 18 },
      // Corner plants
      { type: 'plant',     x: 22,  y: 32,  w: 10, h: 10 },
      { type: 'plant',     x: 148, y: 32,  w: 10, h: 10 },
      { type: 'plant',     x: 22,  y: 228, w: 10, h: 10 },
      // Door — lobby main entrance from corridor
      { type: 'door', x: 75,  y: 250, w: 28, h: 0, openDir: 'up'   },
      // Door — lobby to event hall (right wall of lobby)
      { type: 'door', x: 170, y: 148, w: 28, h: 0, openDir: 'right' },

      // ── Backstage (x=200–660, y=312–420) ──────────────

      // Equipment / prop storage boxes
      { type: 'storage', x: 215, y: 325, w: 36, h: 28 },
      { type: 'storage', x: 261, y: 325, w: 36, h: 28 },
      { type: 'storage', x: 307, y: 325, w: 36, h: 28 },
      { type: 'storage', x: 353, y: 325, w: 36, h: 28 },
      // Sound system rack
      { type: 'desk',    x: 495, y: 320, w: 70, h: 42, label: 'Sound Rack' },
    ],
  },
]
