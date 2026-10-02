<script setup lang="ts">
defineProps<{ status: string }>()

const map: Record<string, { label: string; cls: string; dot: string }> = {
  available:   { label: 'Tersedia',    cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' },
  in_use:      { label: 'Booked',   cls: 'bg-blue-50 text-blue-700 border border-blue-200',         dot: 'bg-blue-500' },
  pending:     { label: 'Pending',     cls: 'bg-orange-50 text-orange-700 border border-orange-200',   dot: 'bg-orange-500' },
  maintenance: { label: 'Maintenance', cls: 'bg-red-50 text-red-600 border border-red-200',            dot: 'bg-red-500' },
  scheduled:   { label: 'Terjadwal',   cls: 'bg-sky-50 text-sky-700 border border-sky-200',            dot: 'bg-sky-500' },
  ongoing:     { label: 'Berlangsung', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500 animate-pulse' },
  completed:   { label: 'Selesai',     cls: 'bg-gray-100 text-gray-500 border border-gray-200',        dot: 'bg-gray-400' },
  approved:    { label: 'Disetujui',   cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' },
  rejected:    { label: 'Ditolak',     cls: 'bg-red-50 text-red-600 border border-red-200',            dot: 'bg-red-500' },
  cancelled:   { label: 'Dibatalkan',  cls: 'bg-gray-100 text-gray-500 border border-gray-200',        dot: 'bg-gray-400' },
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
    :class="map[status]?.cls ?? 'bg-gray-100 text-gray-600 border border-gray-200'"
  >
    <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="map[status]?.dot ?? 'bg-gray-400'" />
    {{ map[status]?.label ?? status }}
  </span>
</template>
