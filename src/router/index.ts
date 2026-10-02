import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { public: true } },
    { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue'), meta: { public: true } },
    { path: '/', name: 'home', component: HomeView, meta: { public: true } },
    { path: '/event', name: 'event', component: () => import('../views/EventView.vue'), meta: { public: true } },
    { path: '/ruang', name: 'ruang', component: () => import('../views/RoomView.vue'), meta: { public: true } },
    { path: '/ruang/:id', name: 'ruang-detail', component: () => import('../views/RoomDetailView.vue'), meta: { public: true } },
    // { path: '/map', name: 'map', component: () => import('../views/MapView.vue'), meta: { public: true } },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: { adminOnly: true },
      children: [
        { path: '', name: 'admin', component: () => import('../views/admin/AdminDashboardView.vue') },
        { path: 'booking', name: 'admin-booking', component: () => import('../views/admin/AdminBookingView.vue') },
      ],
    },
    { path: '/booking', name: 'booking', component: () => import('../views/BookingView.vue') },
    { path: '/booking/success', name: 'booking-success', component: () => import('../views/BookingSuccessView.vue') },
    { path: '/booking-saya', name: 'booking-saya', component: () => import('../views/MyBookingView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  auth.restore()
  if (!to.meta.public && !to.meta.adminOnly && !auth.isAuthenticated) {
    return { name: 'login' }
  }
  if (to.meta.adminOnly && (!auth.isAuthenticated || !auth.isAdmin)) {
    return { name: 'login' }
  }
  if ((to.name === 'login' || to.name === 'register') && auth.isAuthenticated) {
    return auth.isAdmin ? { name: 'admin' } : { name: 'home' }
  }
})
