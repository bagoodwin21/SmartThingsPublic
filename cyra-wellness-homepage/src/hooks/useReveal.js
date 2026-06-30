import { useEffect, useRef, useState } from 'react'

/*
 * useReveal — subtle, tasteful entrance animation.
 *
 * Returns a ref to attach to any element. When the element scrolls into view,
 * `isVisible` flips to true (once). Pair with the `.reveal` / `.is-visible`
 * utilities in index.css. Honors prefers-reduced-motion via CSS.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // If IntersectionObserver isn't available, just show the content.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible }
}
