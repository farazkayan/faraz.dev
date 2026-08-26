import React, { useState, useEffect, useCallback } from 'react'
import { cn } from '../lib/utils'

interface WorkflowStage {
  id: string
  label: string
  shortLabel: string
  description: string
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  { id: 'idea', label: 'IDEA', shortLabel: 'Idea', description: 'Something should exist.' },
  { id: 'plan', label: 'PLAN', shortLabel: 'Plan', description: 'Break it into pieces.' },
  { id: 'build', label: 'BUILD', shortLabel: 'Build', description: 'Turn the idea into something real.' },
  { id: 'debug', label: 'DEBUG', shortLabel: 'Debug', description: 'Find where it actually broke.' },
  { id: 'learn', label: 'LEARN', shortLabel: 'Learn', description: 'Understand why.' },
  { id: 'improve', label: 'IMPROVE', shortLabel: 'Improve', description: "Don't make the same mistake twice." },
]

const QUICK_LINKS = [
  { label: 'About', href: '#about', description: 'Who I am & how I think' },
  { label: 'Projects', href: '#projects', description: 'Avero, Nexus & more' },
  { label: 'Skills', href: '#skills', description: 'Things I\'ve worked with' },
  { label: 'Homelab', href: '#homelab', description: 'Servers, services, networking' },
  { label: 'Hobbies', href: '#hobbies', description: 'Cats, photos, games, side quests' },
  { label: 'Contact', href: '#contact', description: 'Say hi or start a conversation' },
]

function WorkflowStageItem({
  stage,
  isActive,
  onActivate,
  prefersReducedMotion,
}: {
  stage: WorkflowStage
  isActive: boolean
  onActivate: () => void
  prefersReducedMotion: boolean
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`workflow-panel-${stage.id}`}
      id={`workflow-tab-${stage.id}`}
      onClick={onActivate}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={cn(
        'relative flex flex-col items-center gap-2 px-5 py-4',
        'rounded-xl border transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        isActive
          ? 'border-accent/40 bg-accent-soft text-accent'
          : 'border-border bg-bg-card text-text-muted hover:border-border-strong hover:text-text hover:bg-bg-elevated'
      )}
      style={{
        transform: isActive && !prefersReducedMotion ? 'translateY(-2px)' : 'none',
      }}
    >
      <span className="font-mono text-xs uppercase tracking-wider">{stage.shortLabel}</span>
      <span className="font-medium text-sm" aria-hidden="true">{stage.label}</span>
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
      )}
    </button>
  )
}

function WorkflowPanel({
  stage,
  isActive,
  prefersReducedMotion,
}: {
  stage: WorkflowStage
  isActive: boolean
  prefersReducedMotion: boolean
}) {
  if (!isActive) return null

  return (
    <div
      id={`workflow-panel-${stage.id}`}
      role="tabpanel"
      aria-labelledby={`workflow-tab-${stage.id}`}
      className={cn('mt-6 px-5 py-4 rounded-xl border border-border bg-bg-card', 'animate-fade-in')}
      style={{ animationDuration: prefersReducedMotion ? '0ms' : '300ms' }}
    >
      <p className="text-text-secondary text-sm leading-relaxed max-w-md mx-auto text-center">{stage.description}</p>
    </div>
  )
}

export function Home() {
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const handleWorkflowActivate = useCallback((index: number) => { setActiveWorkflowIndex(index) }, [])

  const activeStage = WORKFLOW_STAGES[activeWorkflowIndex]

  return (
    <section id="home" className="section-home relative min-h-screen flex items-center justify-center py-20 md:py-28 lg:py-36">
      <div className="container relative z-10">
        {/* Entrance marker */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-accent/40 to-transparent animate-pulse" style={{ animationDuration: prefersReducedMotion ? '0ms' : '2000ms' }} aria-hidden="true" />

        <header className="mb-16 md:mb-24 text-center animate-fade-in">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider mb-8 rounded-full border border-border bg-bg-card">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDuration: prefersReducedMotion ? '0ms' : '1500ms' }} aria-hidden="true" />
            Student & Builder
          </span>
          <h1 className="text-display text-balance leading-[1.02] mb-8">
            Faraz Kayan Haque
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto text-text-secondary leading-relaxed mb-6">
            I build things I wish existed.
          </p>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-text-subtle leading-relaxed">
            Always learning. Always building. I don&apos;t know what I&apos;ll build next — and that&apos;s the fun part.
          </p>
        </header>

        {/* Navigation portal */}
        <nav className="mb-16 md:mb-20 animate-slide-up" style={{ animationDelay: '100ms' }} aria-label="Quick navigation">
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {QUICK_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="group card-elevated flex flex-col items-center gap-2 p-5 rounded-xl text-center transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                <span className="font-medium text-text">{link.label}</span>
                <span className="font-mono text-xs text-text-subtle">{link.description}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-subtle group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ))}
          </div>
        </nav>

        <div className="mt-8 md:mt-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-center gap-2 md:gap-3 font-mono text-xs text-text-subtle uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDuration: prefersReducedMotion ? '0ms' : '1500ms' }} aria-hidden="true" />
            <span>Currently</span>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="card-elevated p-5 md:p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-subtle mb-3">
                Learning
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Python
              </p>
            </div>
            <div className="card-elevated p-5 md:p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-subtle mb-3">
                Exploring
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                AI-assisted development · databases · product building
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-wider text-text-subtle text-center mb-10">
              How I Build
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 mb-10" role="tablist" aria-label="Building workflow">
              {WORKFLOW_STAGES.map((stage, index) => (
                <React.Fragment key={stage.id}>
                  <WorkflowStageItem
                    stage={stage}
                    isActive={index === activeWorkflowIndex}
                    onActivate={() => handleWorkflowActivate(index)}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  {index < WORKFLOW_STAGES.length - 1 && (
                    <span className="flex items-center text-text-subtle font-mono text-xs px-1" aria-hidden="true" style={{ opacity: prefersReducedMotion ? 1 : 0.6 }}>
                      →
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <WorkflowPanel stage={activeStage} isActive={true} prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>

        {/* Section exit marker */}
        <div className="mt-20 flex justify-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}