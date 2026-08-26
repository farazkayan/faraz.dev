import { useState, useEffect, useRef, useCallback } from 'react'

interface UseActiveSectionOptions {
  rootMargin?: string
  threshold?: number
}

export function useActiveSection(
  sectionIds: readonly string[],
  options: UseActiveSectionOptions = {}
): string {
  const { rootMargin = '-20% 0px -60% 0px', threshold = 0 } = options
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setActive = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        let bestEntry: IntersectionObserverEntry | null = null
        let bestRatio = -1

        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio
            bestEntry = entry
          }
        }

        if (bestEntry) {
          setActive(bestEntry.target.id)
        }
      },
      { rootMargin, threshold }
    )

    observerRef.current = observer

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
      observerRef.current = null
    }
  }, [sectionIds, rootMargin, threshold, setActive])

  return activeId
}