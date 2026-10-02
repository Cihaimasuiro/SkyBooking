<script setup lang="ts">
import { ChevronRight, Users, MapPin } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import StatusBadge from './StatusBadge.vue'
import type { Room } from '../data/rooms'

const props = defineProps<{ room: Room; index?: number }>()
const router = useRouter()
</script>

<template>
  <tr
    class="hover:bg-blue-50/40 cursor-pointer group animate-slide-up"
    :style="{ animationDelay: `${(index ?? 0) * 40}ms` }"
    style="transition: background-color 0.15s ease;"
    @click="router.push(`/ruang/${props.room.id}`)"
  >
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            v-if="props.room.image"
            :src="props.room.image"
            :alt="props.room.name"
            class="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div v-else class="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700" />
        </div>
        <div>
          <p class="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{{ props.room.name }}</p>
          <p class="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
            <MapPin :size="11" />
            {{ props.room.location }}
          </p>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 text-sm text-gray-600">{{ props.room.terminal }}</td>
    <td class="px-6 py-4 text-sm text-gray-600">
      <span class="flex items-center gap-1.5">
        <Users :size="14" class="text-gray-400" />
        {{ props.room.capacity }}
      </span>
    </td>
    <td class="px-6 py-4 hidden lg:table-cell">
      <div class="flex flex-wrap gap-1">
        <span
          v-for="f in props.room.facilities.slice(0, 3)"
          :key="f"
          class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
        >{{ f }}</span>
        <span v-if="props.room.facilities.length > 3" class="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-md font-medium">
          +{{ props.room.facilities.length - 3 }}
        </span>
      </div>
    </td>
    <td class="px-6 py-4">
      <StatusBadge :status="props.room.status" />
    </td>
    <td class="px-6 py-4 text-right">
      <ChevronRight
        :size="18"
        class="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all ml-auto"
      />
    </td>
  </tr>
</template>
