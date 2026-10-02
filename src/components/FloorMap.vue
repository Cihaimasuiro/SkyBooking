<script setup lang="ts">
import { computed, ref } from 'vue'
import { rooms } from '../data/rooms'
import { floorPlans, phantomColors } from '../data/mapData'
import { furnitureLayouts, getDoorPaths } from '../data/furnitureData'
import type { FurnitureItem } from '../data/furnitureData'

const props = defineProps<{
  terminal: string
  floor: number
  selectedRoomId: string | null
}>()

const emit = defineEmits<{
  (e: 'select', roomId: string): void
}>()

const hoveredId = ref<string | null>(null)

const plan = computed(() =>
  floorPlans.find(p => p.terminal === props.terminal && p.floor === props.floor)
)

const roomMap = computed(() =>
  Object.fromEntries(rooms.map(r => [r.id, r]))
)

const statusStyle = {
  available:   { fill: '#dcfce7', stroke: '#16a34a', text: '#15803d', dot: '#22c55e' },
  in_use:      { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8', dot: '#3b82f6' },
  pending:     { fill: '#fef3c7', stroke: '#d97706', text: '#92400e', dot: '#f59e0b' },
  maintenance: { fill: '#fee2e2', stroke: '#dc2626', text: '#991b1b', dot: '#ef4444' },
}

// Expand repeated furniture items (chair rows, ceiling lights)
const expandedFurniture = computed((): FurnitureItem[] => {
  const layout = furnitureLayouts.find(
    l => l.terminal === props.terminal && l.floor === props.floor
  )
  if (!layout) return []

  const result: FurnitureItem[] = []
  for (const item of layout.items) {
    if (item.repeatX && item.repeatX > 1 && item.stepX) {
      for (let i = 0; i < item.repeatX; i++) {
        result.push({ ...item, x: item.x + i * item.stepX })
      }
    } else {
      result.push(item)
    }
  }
  return result
})

const furnitureDoors = computed(() =>
  expandedFurniture.value.filter(i => i.type === 'door')
)
const furnitureItems = computed(() =>
  expandedFurniture.value.filter(i => i.type !== 'door')
)
</script>

<template>
  <div class="w-full rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
    <svg
      v-if="plan"
      viewBox="0 0 860 440"
      class="w-full h-auto select-none"
      style="max-height: 500px;"
    >
      <defs>
        <pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#e2e8f0" />
        </pattern>
        <filter id="room-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#3b82f6" flood-opacity="0.4" />
        </filter>
      </defs>

      <!-- Building background -->
      <rect width="860" height="440" fill="url(#dot-grid)" />
      <rect width="860" height="440" fill="none" stroke="#cbd5e1" stroke-width="2" />

      <!-- Phantom areas -->
      <g v-for="(ph, i) in plan.phantoms" :key="`ph-${i}`">
        <rect
          :x="ph.x" :y="ph.y" :width="ph.w" :height="ph.h"
          :fill="phantomColors[ph.type].fill"
          :stroke="phantomColors[ph.type].stroke"
          stroke-width="1" rx="3"
        />
        <text
          v-if="ph.label"
          :x="ph.x + ph.w / 2" :y="ph.y + ph.h / 2"
          text-anchor="middle" dominant-baseline="middle"
          font-size="10" :fill="phantomColors[ph.type].text"
          font-family="Inter, system-ui, sans-serif" font-weight="500"
        >{{ ph.label }}</text>
      </g>

      <!-- Bookable rooms -->
      <g
        v-for="coord in plan.rooms"
        :key="coord.roomId"
        class="cursor-pointer"
        @click="emit('select', coord.roomId)"
        @mouseenter="hoveredId = coord.roomId"
        @mouseleave="hoveredId = null"
      >
        <title>{{ roomMap[coord.roomId]?.name }}</title>

        <rect
          v-if="selectedRoomId === coord.roomId"
          :x="coord.x - 4" :y="coord.y - 4"
          :width="coord.w + 8" :height="coord.h + 8"
          fill="none" stroke="#3b82f6" stroke-width="2.5" rx="10"
          opacity="0.6" filter="url(#room-glow)"
        />

        <rect
          :x="coord.x" :y="coord.y" :width="coord.w" :height="coord.h"
          :fill="roomMap[coord.roomId] ? statusStyle[roomMap[coord.roomId].status].fill : '#f1f5f9'"
          :stroke="roomMap[coord.roomId] ? statusStyle[roomMap[coord.roomId].status].stroke : '#e2e8f0'"
          :stroke-width="selectedRoomId === coord.roomId || hoveredId === coord.roomId ? 2.5 : 1.5"
          rx="6"
          :opacity="hoveredId === coord.roomId && selectedRoomId !== coord.roomId ? 0.88 : 1"
        />

        <circle
          v-if="roomMap[coord.roomId]"
          :cx="coord.x + 12" :cy="coord.y + 12" r="4"
          :fill="statusStyle[roomMap[coord.roomId].status].dot"
        />

        <!-- Room label only shown when no furniture covers it -->
        <text
          v-if="roomMap[coord.roomId] && expandedFurniture.length === 0"
          :x="coord.x + coord.w / 2" :y="coord.y + coord.h / 2 - 8"
          text-anchor="middle" dominant-baseline="middle"
          font-size="12" font-weight="700"
          :fill="statusStyle[roomMap[coord.roomId].status].text"
          font-family="Inter, system-ui, sans-serif"
        >{{ roomMap[coord.roomId].name }}</text>
        <text
          v-if="roomMap[coord.roomId] && expandedFurniture.length === 0 && coord.h > 80"
          :x="coord.x + coord.w / 2" :y="coord.y + coord.h / 2 + 10"
          text-anchor="middle" dominant-baseline="middle"
          font-size="10" opacity="0.7"
          :fill="statusStyle[roomMap[coord.roomId].status].text"
          font-family="Inter, system-ui, sans-serif"
        >{{ roomMap[coord.roomId].capacity }} pax</text>
      </g>

      <!-- ─── Furniture layer ───────────────────────────────── -->
      <g v-for="(item, idx) in furnitureItems" :key="`furn-${idx}`"
         :transform="`translate(${item.x},${item.y})`">

        <!-- Chair (top-down: seat rect + backrest line at top) -->
        <g v-if="item.type === 'chair'">
          <rect :width="item.w" :height="item.h - 3" rx="1.5"
            fill="#dde8fa" stroke="#4b6cb7" stroke-width="0.8"/>
          <rect y="0" :width="item.w" height="2.5" rx="0.8"
            fill="#4b6cb7"/>
        </g>

        <!-- Stage / Panggung -->
        <g v-else-if="item.type === 'stage'">
          <rect :width="item.w" :height="item.h" rx="3"
            fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
          <!-- Stage edge line at front (bottom of stage) -->
          <line x1="8" :y1="item.h" :x2="item.w - 8" :y2="item.h"
            stroke="#4338ca" stroke-width="3" stroke-linecap="round"/>
          <text :x="item.w / 2" :y="item.h / 2 + 1"
            text-anchor="middle" dominant-baseline="middle"
            font-size="11" fill="#4338ca" font-weight="700"
            font-family="Inter, system-ui, sans-serif">Panggung</text>
        </g>

        <!-- Projection screen (thin bar) -->
        <g v-else-if="item.type === 'screen'">
          <rect :width="item.w" :height="item.h"
            fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
        </g>

        <!-- Podium / Lectern -->
        <g v-else-if="item.type === 'podium'">
          <rect :width="item.w" :height="item.h" rx="2"
            fill="#6366f1" stroke="#4338ca" stroke-width="1.5"/>
          <text :x="item.w / 2" :y="item.h / 2 + 1"
            text-anchor="middle" dominant-baseline="middle"
            font-size="7" fill="white" font-weight="600"
            font-family="Inter, system-ui, sans-serif">POD</text>
        </g>

        <!-- Speaker -->
        <g v-else-if="item.type === 'speaker'">
          <rect :width="item.w" :height="item.h" rx="2"
            fill="#1e293b" stroke="#0f172a" stroke-width="1"/>
          <circle :cx="item.w / 2" :cy="item.h / 2" r="4"
            fill="none" stroke="#64748b" stroke-width="0.8"/>
          <circle :cx="item.w / 2" :cy="item.h / 2" r="1.5" fill="#64748b"/>
        </g>

        <!-- Ceiling light (circle with crosshair) -->
        <g v-else-if="item.type === 'light'">
          <circle :cx="item.w / 2" :cy="item.h / 2" :r="item.w / 2"
            fill="#fef08a" stroke="#ca8a04" stroke-width="0.8"/>
          <line :x1="item.w / 2" y1="0" :x2="item.w / 2" :y2="item.h"
            stroke="#ca8a04" stroke-width="0.5"/>
          <line x1="0" :y1="item.h / 2" :x2="item.w" :y2="item.h / 2"
            stroke="#ca8a04" stroke-width="0.5"/>
        </g>

        <!-- AC unit -->
        <g v-else-if="item.type === 'ac'">
          <rect :width="item.w" :height="item.h" rx="1"
            fill="#bfdbfe" stroke="#2563eb" stroke-width="1"/>
          <line :x1="item.w / 2" y1="2" :x2="item.w / 2" :y2="item.h - 2"
            stroke="#2563eb" stroke-width="0.6"/>
        </g>

        <!-- Reception desk -->
        <g v-else-if="item.type === 'reception'">
          <rect :width="item.w" :height="item.h" rx="2"
            fill="#fef9c3" stroke="#ca8a04" stroke-width="1.2"/>
        </g>

        <!-- Sofa (with armrests) -->
        <g v-else-if="item.type === 'sofa'">
          <rect :width="item.w" :height="item.h" rx="4"
            fill="#e0f2fe" stroke="#0369a1" stroke-width="1"/>
          <rect x="0" y="0" width="5" :height="item.h" rx="2.5"
            fill="#bae6fd" stroke="#0369a1" stroke-width="0.8"/>
          <rect :x="item.w - 5" y="0" width="5" :height="item.h" rx="2.5"
            fill="#bae6fd" stroke="#0369a1" stroke-width="0.8"/>
          <!-- Cushion lines -->
          <line :x1="item.w / 3 + 5" y1="2" :x2="item.w / 3 + 5" :y2="item.h - 2"
            stroke="#7dd3fc" stroke-width="0.6"/>
          <line :x1="(item.w / 3) * 2" y1="2" :x2="(item.w / 3) * 2" :y2="item.h - 2"
            stroke="#7dd3fc" stroke-width="0.6"/>
        </g>

        <!-- Storage box (with X pattern) -->
        <g v-else-if="item.type === 'storage'">
          <rect :width="item.w" :height="item.h" rx="1"
            fill="#f3f4f6" stroke="#6b7280" stroke-width="1"/>
          <line x1="2" y1="2" :x2="item.w - 2" :y2="item.h - 2"
            stroke="#d1d5db" stroke-width="0.7"/>
          <line :x1="item.w - 2" y1="2" x2="2" :y2="item.h - 2"
            stroke="#d1d5db" stroke-width="0.7"/>
        </g>

        <!-- Desk / rack (with label) -->
        <g v-else-if="item.type === 'desk'">
          <rect :width="item.w" :height="item.h" rx="2"
            fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>
          <!-- Rack unit lines -->
          <line x1="4" y1="10" :x2="item.w - 4" y2="10" stroke="#fbbf24" stroke-width="0.5"/>
          <line x1="4" y1="20" :x2="item.w - 4" y2="20" stroke="#fbbf24" stroke-width="0.5"/>
          <line x1="4" y1="30" :x2="item.w - 4" y2="30" stroke="#fbbf24" stroke-width="0.5"/>
          <text
            v-if="item.label"
            :x="item.w / 2" :y="item.h / 2 + 1"
            text-anchor="middle" dominant-baseline="middle"
            font-size="7.5" fill="#92400e" font-weight="600"
            font-family="Inter, system-ui, sans-serif">{{ item.label }}</text>
        </g>

        <!-- Plant (circle cluster) -->
        <g v-else-if="item.type === 'plant'">
          <circle :cx="item.w / 2" :cy="item.h / 2" :r="item.w / 2"
            fill="#86efac" stroke="#16a34a" stroke-width="1"/>
          <circle :cx="item.w / 2 - 2.5" :cy="item.h / 2 - 2" r="2.5"
            fill="#4ade80" opacity="0.8"/>
          <circle :cx="item.w / 2 + 2" :cy="item.h / 2 - 1.5" r="2"
            fill="#4ade80" opacity="0.8"/>
        </g>
      </g>

      <!-- ─── Door symbols ───────────────────────────────────── -->
      <g v-for="(door, idx) in furnitureDoors" :key="`door-${idx}`">
        <template v-if="door.openDir">
          <!-- Door panel (leaf, shown open 90°) -->
          <path
            :d="getDoorPaths(door.x, door.y, door.w, door.openDir).panel"
            stroke="#475569" stroke-width="1.8" stroke-linecap="round" fill="none"
          />
          <!-- Arc (sweep path, dashed) -->
          <path
            :d="getDoorPaths(door.x, door.y, door.w, door.openDir).arc"
            stroke="#94a3b8" stroke-width="0.7" stroke-dasharray="3,2" fill="none"
          />
          <!-- Door opening gap indicator (small tick marks) -->
          <line
            :x1="door.openDir === 'up' ? door.x : door.x"
            :y1="door.openDir === 'up' ? door.y - 2 : door.y - 2"
            :x2="door.openDir === 'up' ? door.x : door.x"
            :y2="door.openDir === 'up' ? door.y + 2 : door.y + 2"
            stroke="#475569" stroke-width="1.5"
          />
        </template>
      </g>

      <!-- Room name overlay (shown with furniture) -->
      <g v-if="expandedFurniture.length > 0">
        <g v-for="coord in plan.rooms" :key="`label-${coord.roomId}`">
          <text
            v-if="roomMap[coord.roomId]"
            :x="coord.x + coord.w / 2"
            :y="coord.y + coord.h - 10"
            text-anchor="middle" dominant-baseline="middle"
            font-size="9" opacity="0.5"
            :fill="statusStyle[roomMap[coord.roomId].status].text"
            font-family="Inter, system-ui, sans-serif" font-weight="600"
          >{{ roomMap[coord.roomId].name }} · {{ roomMap[coord.roomId].capacity }} pax</text>
        </g>
      </g>
    </svg>

    <div v-else class="flex items-center justify-center h-48 text-gray-400 text-sm">
      Denah tidak tersedia untuk lantai ini
    </div>
  </div>
</template>
