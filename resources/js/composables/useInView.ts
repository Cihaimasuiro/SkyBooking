import { ref, onMounted, onUnmounted } from 'vue'

export function useInView(threshold = 0.15) {
  const el = ref<HTMLElement | null>(null)
  const isInView = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isInView.value = true
          observer?.disconnect()
        }
      },
      { threshold }
    )
    if (el.value) observer.observe(el.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { el, isInView }
}
