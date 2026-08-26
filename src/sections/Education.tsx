import { useState, useEffect } from 'react'
import { cn } from '../lib/utils'

interface School {
  name: string
  period: string
  logo: string
  logoAlt: string
  current?: boolean
}

interface EducationProps {
  isVisible: boolean
}

const SCHOOLS: School[] = [
  {
    name: 'Mastermind English Medium School',
    period: '2024 — Present',
    logo: '/mastermind-logo.png',
    logoAlt: 'Mastermind English Medium School logo',
    current: true,
  },
  {
    name: 'Yale International School',
    period: '2015 — 2024',
    logo: '/yale-logo.png',
    logoAlt: 'Yale International School logo',
  },
]

function SchoolEntry({
  school,
  index,
  prefersReducedMotion,
}: {
  school: School
  index: number
  prefersReducedMotion: boolean
}) {
  return (
    <article
      className={cn(
        'relative flex flex-col md:flex-row md:items-center gap-6 p-5 md:p-6',
        'card-elevated',
        school.current && 'border-l-3 border-accent'
      )}
      style={{
        animationDelay: `${100 + index * 100}ms`,
        opacity: prefersReducedMotion ? 1 : 0,
        transform: prefersReducedMotion ? 'none' : 'translateY(16px)',
        animation: prefersReducedMotion
          ? 'none'
          : 'slideUp var(--transition-slow) var(--ease-out) forwards',
      }}
    >
      <div className="education-timeline flex-1 md:w-24 md:flex-none">
        <time
          className="text-meta whitespace-nowrap md:text-right block"
          dateTime={school.period.replace('—', '/')}
        >
          {school.period}
        </time>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-accent bg-bg"
          style={{ transform: 'translateX(-50%) translateY(-50%)' }}
          aria-hidden="true"
        >
          {school.current && (
            <span className="absolute inset-0 rounded-full bg-accent" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 min-w-0">
        <img
          src={school.logo}
          alt={school.logoAlt}
          className={cn(
            'h-10 md:h-12 w-auto max-w-[180px] object-contain',
            'transition-opacity duration-200',
            'hover:opacity-80'
          )}
          loading="lazy"
        />
        <h3 className={cn('text-subheading', school.current ? 'text-text' : 'text-text-secondary')}>
          {school.name}
        </h3>
      </div>
      {school.current && (
        <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-accent bg-accent-soft border border-accent/30 rounded-sm">
          Current
        </span>
      )}
    </article>
  )
}

export function Education({ isVisible }: EducationProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <section id="education" className={cn('section-education relative section-gap', isVisible && 'is-visible')}>
      <div className="container relative z-10">
        <header className={cn('mb-16 md:mb-20 animate-fade-in', isVisible ? 'is-visible' : '')} style={{ animationDelay: '0ms' }}>
          <span className="section-header-label mb-6">Education</span>
          <h2 className="text-heading text-balance">Education</h2>
        </header>
        <div className={cn('relative', isVisible ? 'is-visible' : '')}>
          {/* Timeline connecting line */}
          <div
            className="absolute left-[22px] md:left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent"
            aria-hidden="true"
          />
          <div className={cn('space-y-8 animate-slide-up', isVisible ? 'is-visible' : '')} style={{ animationDelay: '100ms' }}>
            {SCHOOLS.map((school, index) => (
              <SchoolEntry
                key={school.name}
                school={school}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}