import React, { useState, useEffect, useCallback } from 'react'
import { cn } from '../lib/utils'

interface WorkflowStage {
  id: string
  label: string
  shortLabel: string
  description: string
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'idea',
    label: 'IDEA',
    shortLabel: 'Idea',
    description: 'Something should exist.',
  },
  {
    id: 'plan',
    label: 'PLAN',
    shortLabel: 'Plan',
    description: 'Break it into pieces.',
  },
  {
    id: 'build',
    label: 'BUILD',
    shortLabel: 'Build',
    description: 'Turn the idea into something real.',
  },
  {
    id: 'debug',
    label: 'DEBUG',
    shortLabel: 'Debug',
    description: 'Find where it actually broke.',
  },
  {
    id: 'learn',
    label: 'LEARN',
    shortLabel: 'Learn',
    description: 'Understand why.',
  },
  {
    id: 'improve',
    label: 'IMPROVE',
    shortLabel: 'Improve',
    description: "Don't make the same mistake twice.",
  },
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
        'relative flex flex-col items-center gap-2 px-4 py-3',
        'rounded-lg border transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        isActive
          ? 'border-accent/50 bg-accent-muted text-accent'
          : 'border-border bg-bg-elevated/50 text-text-muted hover:border-border-strong hover:text-text hover:bg-bg-elevated'
      )}
      style={{
        transform: isActive && !prefersReducedMotion ? 'translateY(-2px)' : 'none',
      }}
    >
      <span className="font-mono text-xs uppercase tracking-wider">
        {stage.shortLabel}
      </span>
      <span className="font-medium text-sm" aria-hidden="true">
        {stage.label}
      </span>
      {isActive && (
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
          aria-hidden="true"
        />
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
      className={cn(
        'mt-6 px-4 py-4 rounded-lg border border-border bg-bg-elevated/50',
        'animate-fade-in'
      )}
      style={{
        animationDuration: prefersReducedMotion ? '0ms' : '300ms',
      }}
    >
      <p className="text-text-muted text-sm leading-relaxed max-w-md mx-auto text-center">
        {stage.description}
      </p>
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

  const handleWorkflowActivate = useCallback((index: number) => {
    setActiveWorkflowIndex(index)
  }, [])

  const activeStage = WORKFLOW_STAGES[activeWorkflowIndex]

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center py-16 md:py-24 lg:py-32">
      <div className="container relative z-10">
        <header className="mb-12 md:mb-16 text-center animate-fade-in" style={{ animationDelay: '0ms' }}>
          <span className="inline-block px-3 py-1 text-xs font-mono text-text-subtle uppercase tracking-wider mb-6 rounded-sm bg-bg-elevated border border-border">
            Student & Builder
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-balance leading-[1.1]">
            Faraz Kayan Haque
          </h1>
          <p className="mt-6 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-text-muted leading-relaxed">
            I build things I wish existed.
          </p>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-text-subtle leading-relaxed">
            Always learning. Always building. I don&apos;t know what I&apos;ll build next — and that&apos;s the fun part.
          </p>
        </header>

        <div
          className="mt-16 md:mt-24 animate-slide-up"
          style={{ animationDelay: '100ms' }}
          aria-hidden="true"
        >
          <div className="flex items-center justify-center gap-1 md:gap-2 md:gap-3 font-mono text-xs text-text-subtle uppercase tracking-wider">
            <span className="w-1 h-1 rounded-full bg-accent animate-pulse" style={{ animationDuration: prefersReducedMotion ? '0ms' : '1500ms' }} />
            <span>Currently</span>
          </div>
        </div>

        <div className="mt-8 md:mt-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="rounded-lg border border-border bg-bg-elevated/50 p-6 md:p-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-subtle mb-4">
                Learning
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Python
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-elevated/50 p-6 md:p-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-subtle mb-4">
                Exploring
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                AI-assisted development · databases · product building
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-wider text-text-subtle text-center mb-8">
              How I Build
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 mb-8" role="tablist" aria-label="Building workflow">
              {WORKFLOW_STAGES.map((stage, index) => (
                <React.Fragment key={stage.id}>
                  <WorkflowStageItem
                    stage={stage}
                    isActive={index === activeWorkflowIndex}
                    onActivate={() => handleWorkflowActivate(index)}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  {index < WORKFLOW_STAGES.length - 1 && (
                    <span
                      className="flex items-center text-text-subtle font-mono text-xs px-1"
                      aria-hidden="true"
                      style={{ opacity: prefersReducedMotion ? 1 : 0.6 }}
                    >
                      →
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <WorkflowPanel
              stage={activeStage}
              isActive={true}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  )
}