import { ref, onMounted, onUnmounted, Ref } from 'vue'

/**
 * @module useScrollAnimation
 * A composable that uses the Intersection Observer API to detect when an element enters the viewport.
 * It provides a boolean ref `isVisible` that becomes true when the element is visible.
 * @param elementRef A Vue ref pointing to the HTML element to observe.
 * @returns An object containing the `isVisible` boolean ref.
 */
export function useScrollAnimation(elementRef: Ref<HTMLElement | null>) {
  const isVisible = ref(false)
  let observer: IntersectionObserver;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (elementRef.value) {
            observer.unobserve(elementRef.value)
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    )

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
    }
  })

  return {
    isVisible,
  }
}
