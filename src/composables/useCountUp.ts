import { ref, onMounted, watch } from 'vue'

export function useCountUp(target: number, duration = 800) {
  const current = ref(0)

  function run(to: number) {
    const start = performance.now()
    const from = current.value
    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      current.value = Math.round(from + (to - from) * eased)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  onMounted(() => run(target))
  watch(() => target, (val) => run(val))

  return current
}
