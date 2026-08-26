import { useState, useEffect, useCallback } from 'react'
import { cn } from '../lib/utils'

interface Technology {
  name: string
  description: string
}

interface TechnologyCategory {
  label: string
  technologies: Technology[]
}

const AVERO_TECH_CATEGORIES: TechnologyCategory[] = [
  {
    label: 'Frontend',
    technologies: [
      { name: 'React', description: 'Used to build the Avero web interface and its reusable UI components.' },
      { name: 'TypeScript', description: 'Provides type safety across the frontend codebase, catching errors early during development.' },
      { name: 'Vite', description: 'Fast build tool and dev server that powers Avero\'s development workflow and production builds.' },
      { name: 'Tailwind CSS', description: 'Utility-first styling for rapid, consistent UI development without custom CSS files.' },
      { name: 'React Router', description: 'Handles client-side routing between Spaces, Memories, settings, and auth flows.' }
    ]
  },
  {
    label: 'Backend & Data',
    technologies: [
      { name: 'Supabase', description: 'Used for Avero\'s backend — authentication, database access, and Edge Functions. The database uses Row Level Security to control access to private Spaces.' },
      { name: 'PostgreSQL', description: 'Used as Avero\'s primary database for Spaces, memories, media metadata, members, comments, reactions and tags, with RLS, constraints, indexes and triggers.' },
      { name: 'Supabase Auth', description: 'Handles user authentication with JWT-based sessions, email/password, and OAuth providers.' },
      { name: 'Supabase Edge Functions', description: 'Serverless functions for presigned upload URLs, media processing, and other secure server-side logic.' },
      { name: 'SQL / Row Level Security', description: 'Row Level Security policies enforce space-based authorization at the database level, ensuring users only access data in Spaces they belong to.' }
    ]
  },
  {
    label: 'Infrastructure',
    technologies: [
      { name: 'Cloudflare Pages', description: 'Hosts the Avero frontend with global CDN, automatic HTTPS, and instant cache invalidation on deploy.' },
      { name: 'Cloudflare Workers', description: 'Used as a media proxy between Avero and Backblaze B2, handling token validation and edge caching.' },
      { name: 'Backblaze B2', description: 'Used as private media storage for photos, videos, thumbnails and avatars. Browser uploads use short-lived presigned URLs.' }
    ]
  },
  {
    label: 'Maps & APIs',
    technologies: [
      { name: 'Leaflet', description: 'Used for the interactive map that displays memories with saved locations.' },
      { name: 'React Leaflet', description: 'React wrapper for Leaflet, integrating the map seamlessly into the component tree.' },
      { name: 'Barikoi', description: 'Location autocomplete provider for map search in Bangladesh and surrounding regions.' },
      { name: 'LocationIQ', description: 'Geocoding and reverse geocoding service for location search and display.' },
      { name: 'OpenStreetMap', description: 'Open map tile provider used as the base layer for the interactive map.' },
      { name: 'CartoDB', description: 'Additional map tile provider used for alternative map styling options.' }
    ]
  },
  {
    label: 'Development',
    technologies: [
      { name: 'Playwright', description: 'Used for end-to-end testing of the application.' },
      { name: 'Aider', description: 'Used as part of my AI-assisted development workflow while building Avero.' }
    ]
  }
]

function TechnologyButton({ name, isSelected, onSelect, prefersReducedMotion }: { name: string; isSelected: boolean; onSelect: () => void; prefersReducedMotion: boolean }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'px-3 py-1.5 text-sm font-mono rounded-md border transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        isSelected
          ? 'bg-accent-soft border-accent/40 text-accent'
          : 'border-border bg-bg-card text-text-muted hover:border-border-strong hover:text-text hover:bg-bg-elevated'
      )}
      style={{ transform: isSelected && !prefersReducedMotion ? 'translateY(-1px)' : 'none' }}
    >
      {name}
    </button>
  )
}

function TechExplanationPanel({ technology, prefersReducedMotion }: { technology: Technology | null; prefersReducedMotion: boolean }) {
  if (!technology) return null
  return (
    <div
      className="mt-4 px-5 py-4 rounded-xl border border-border bg-bg-card animate-fade-in"
      style={{ animationDuration: prefersReducedMotion ? '0ms' : '200ms' }}
      role="region"
      aria-label={`Details for ${technology.name}`}
    >
      <p className="text-text-secondary text-sm leading-relaxed">{technology.description}</p>
    </div>
  )
}

function ProjectCard({
  title,
  featured,
  description,
  techCategories,
  ctaLabel,
  ctaHref,
  ctaExternal = true,
  metadata,
  prefersReducedMotion,
}: {
  title: string
  featured?: boolean
  description: string
  techCategories: TechnologyCategory[]
  ctaLabel: string
  ctaHref: string
  ctaExternal?: boolean
  metadata?: { icon: React.ReactNode; label: string }[]
  prefersReducedMotion: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null)

  const handleTechSelect = useCallback((tech: Technology) => {
    setSelectedTech(tech)
  }, [])

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      const firstTech = techCategories[0]?.technologies[0]
      if (firstTech) setSelectedTech(firstTech)
    } else {
      setSelectedTech(null)
    }
  }, [isExpanded, techCategories])

  return (
    <article className={cn('border rounded-xl p-6 md:p-8 transition-all duration-300 ease-out', featured ? 'project-featured' : 'card-elevated')}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          {featured && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-accent uppercase tracking-wider mb-3 bg-accent-soft border border-accent/30 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              Featured
            </span>
          )}
          <h3 className={cn('font-semibold tracking-tight', featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl')}>
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={toggleExpand}
            className="btn-ghost"
            aria-expanded={isExpanded}
            aria-controls={`${title.toLowerCase()}-tech-details`}
          >
            {isExpanded ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                Collapse
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                Explore
              </>
            )}
          </button>
          <a
            href={ctaHref}
            target={ctaExternal ? '_blank' : undefined}
            rel={ctaExternal ? 'noopener noreferrer' : undefined}
            className="btn-primary"
          >
            {ctaLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      <p className="text-text-secondary leading-relaxed mb-6 max-w-3xl">{description}</p>

      <div
        id={`${title.toLowerCase()}-tech-details`}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isExpanded ? 'none' : '0',
          opacity: isExpanded ? 1 : 0,
          marginBottom: isExpanded ? '1.5rem' : 0,
          paddingTop: isExpanded ? 0 : 0,
        }}
      >
        {isExpanded && (
          <div className="space-y-6 animate-fade-in" style={{ animationDuration: prefersReducedMotion ? '0ms' : '250ms' }}>
            <div className="pt-4 border-t border-border">
              <div className="flex flex-col gap-4 mb-4">
                {techCategories.map((category) => (
                  <div key={category.label} className="flex flex-col gap-2 p-3 rounded-lg border border-border/50 bg-bg-elevated/50">
                    <span className="font-mono text-xs uppercase tracking-wider text-text-subtle">{category.label}</span>
                    <div className="flex flex-wrap gap-2">
                      {category.technologies.map((tech) => (
                        <TechnologyButton
                          key={tech.name}
                          name={tech.name}
                          isSelected={selectedTech?.name === tech.name}
                          onSelect={() => handleTechSelect(tech)}
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <TechExplanationPanel technology={selectedTech} prefersReducedMotion={prefersReducedMotion} />
            </div>

            {metadata && (
              <div className="pt-4 border-t border-border">
                <p className="font-mono text-xs uppercase tracking-wider text-text-subtle mb-3">Details</p>
                <ul className="space-y-1.5 text-text-secondary text-sm leading-relaxed">
                  {metadata.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="flex-shrink-0">{item.icon}</span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {metadata && (
        <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-text-subtle pt-4 border-t border-border">
          {metadata.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

function AveroCard({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <ProjectCard
      title="Avero"
      featured={true}
      description="Avero is a private shared-memory journal designed around preserving meaningful moments with people who matter. Memories shouldn't just disappear into a camera roll or a chat history — Avero lets people capture and preserve them together."
      techCategories={AVERO_TECH_CATEGORIES}
      ctaLabel="View Avero"
      ctaHref="https://withavero.pages.dev"
      metadata={[
        {
          icon: (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          ),
          label: 'Public'
        },
        {
          icon: (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
          ),
          label: 'Web'
        }
      ]}
      prefersReducedMotion={prefersReducedMotion}
    />
  )
}

function NexusCard() {
  return (
    <article className="card-elevated p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Nexus</h3>
        </div>
        <a
          href="https://github.com/farazkayan/nexus-workflow-manager"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          View on GitHub
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      <p className="text-text-secondary leading-relaxed mb-6 max-w-3xl">
        Nexus is a Windows workflow launcher. It exists because this didn't exist, I needed it, and I wanted to build something that would make my life faster. It turns repetitive multi-step workflows into single actions.
      </p>

      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-text-subtle mb-3">What I worked with</p>
        <p className="text-text-secondary font-mono text-sm leading-relaxed flex flex-wrap gap-2">
          <span>Python · PySide6</span>
          <span>Windows · Git/GitHub</span>
          <span>AI-assisted development</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-text-subtle pt-4 border-t border-border">
        <span className="inline-flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          Open Source
        </span>
        <span className="inline-flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
          Windows
        </span>
        <span className="inline-flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Personal Tool
        </span>
      </div>
    </article>
  )
}

export function Projects() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <section id="projects" className="section-projects relative section-gap">
      <div className="container relative z-10">
        <header className="mb-16 md:mb-20 animate-fade-in">
          <span className="section-header-label mb-6">Projects</span>
          <h2 className="text-heading text-balance">Projects</h2>
          <p className="mt-4 text-body-lg max-w-2xl text-text-muted leading-relaxed">Things I built because I wanted them to exist.</p>
        </header>

        <div className="space-y-12 md:space-y-16 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <AveroCard prefersReducedMotion={prefersReducedMotion} />
          <NexusCard />

          <div className="pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
            <p className="text-caption leading-relaxed max-w-2xl mx-auto text-center">Both projects were built with a lot of AI help, a lot of debugging, and a lot of figuring things out along the way.</p>
          </div>
        </div>
      </div>
    </section>
  )
}