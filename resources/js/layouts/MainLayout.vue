<script setup lang="ts">
import { computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import AppNavbar from '../components/AppNavbar.vue'
import AppFooter from '../components/AppFooter.vue'

const route = usePage()
const isAdminRoute = computed(() => route.url.startsWith('/admin'))
const showNav = computed(() => !isAdminRoute.value && usePage().component !== 'login' && usePage().component !== 'register')
</script>

<template>
  <template v-if="isAdminRoute">
    <slot />
  </template>
  <div v-else class="min-h-screen font-sans flex flex-col" style="background:linear-gradient(135deg,#c8d9ed 0%,#e8f6fb 50%,#9ef0f5 100%) fixed">
    <AppNavbar v-if="showNav" />
    <main :class="showNav ? 'pt-16 flex-1' : 'flex-1'">
      <RouterView v-slot="{ Component, route: r }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="r.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter v-if="showNav" />
  </div>
</template>
