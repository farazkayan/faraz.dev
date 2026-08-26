import { useState, useEffect, useRef, useCallback } from 'react'

interface UseActiveSectionOptions {
  rootMargin?: string
  threshold?: number
}

interface UseActiveSectionReturn {
  activeId: string
  visibleSections: Set<string>
}

export function useActiveSection(
  sectionIds: readonly string[],
  options: UseActiveSectionOptions = {}
): UseActiveSectionReturn {
  const { rootMargin = '-20% 0px -60% 0px', threshold = 0 } = options
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '')
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const visibilityObserverRef = useRef<IntersectionObserver | null>(null)

  const setActive = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return

    // Observer for active section detection (existing behavior)
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

    // Observer for section visibility (for entrance animations)
    const visibilityObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        setVisibleSections(prev => {
          const next = new Set(prev)
          let changed = false
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
              if (!next.has(entry.target.id)) {
                next.add(entry.target.id)
                changed = true
              }
            }
          }
          return changed ? next : prev
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: [0.1, 0.25, 0.5] }
    )

    visibilityObserverRef.current = visibilityObserver

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
        visibilityObserver.observe(element)
      }
    })

    return () => {
      observer.disconnect()
      visibilityObserver.disconnect()
      observerRef.current = null
      visibilityObserverRef.current = null
    }
  }, [sectionIds, rootMargin, threshold, setActive])

  return { activeId, visibleSections }
}