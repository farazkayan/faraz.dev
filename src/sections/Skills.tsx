import { useState, useEffect, useCallback } from 'react'
import { cn } from '../lib/utils'

interface Technology { name: string; description: string; context?: string }
interface TechnologyCategory { label: string; technologies: Technology[] }

const SKILL_CATEGORIES: TechnologyCategory[] = [
  { label: 'Languages', technologies: [{ name: 'Python', description: 'Currently learning it in school — using it to understand programming fundamentals and build small projects.', context: 'Learning' }, { name: 'TypeScript', description: 'Used throughout Avero\'s frontend for type-safe components, API routes, and shared types between client and server.', context: 'Used in Avero' }, { name: 'SQL', description: 'Wrote queries, RLS policies, indexes, and triggers for Avero\'s PostgreSQL database. Learned by doing.', context: 'Used in Avero' }] },
  { label: 'Frontend', technologies: [{ name: 'React', description: 'Built Avero\'s entire frontend as a component-based SPA — routing, contexts, forms, timelines, maps, and interactive UI.', context: 'Used in Avero' }, { name: 'Vite', description: 'Fast build tool and dev server that powers Avero\'s development workflow and production builds.', context: 'Used in Avero' }, { name: 'Tailwind CSS', description: 'Utility-first styling for rapid, consistent UI development across all my projects without custom CSS files.', context: 'Used regularly' }, { name: 'React Router', description: 'Handles client-side routing between Spaces, Memories, settings, and auth flows in Avero.', context: 'Used in Avero' }, { name: 'Leaflet', description: 'Used for the interactive map that displays memories with saved locations in Avero.', context: 'Used in Avero' }, { name: 'React Leaflet', description: 'React wrapper for Leaflet, integrating the map seamlessly into Avero\'s component tree.', context: 'Used in Avero' }] },
  { label: 'Backend & Data', technologies: [{ name: 'Supabase', description: 'Used as Avero\'s backend — authentication, PostgreSQL database, Row Level Security, Edge Functions, and API access.', context: 'Used in Avero' }, { name: 'PostgreSQL', description: 'Avero\'s primary database with 10 application tables, RLS policies, constraints, indexes, and triggers.', context: 'Used in Avero' }, { name: 'Supabase Edge Functions', description: 'Serverless Deno functions for presigned upload URLs, media processing, and secure server-side logic in Avero.', context: 'Used in Avero' }, { name: 'Deno', description: 'Runtime for Supabase Edge Functions — wrote Edge Functions in TypeScript running on Deno.', context: 'Used in Avero' }] },
  { label: 'Infrastructure', technologies: [{ name: 'Cloudflare Pages', description: 'Hosts the Avero frontend with global CDN, automatic HTTPS, and instant cache invalidation on deploy.', context: 'Used in Avero' }, { name: 'Cloudflare Workers', description: 'Used as a media proxy between Avero and Backblaze B2 — handles token validation and edge caching.', context: 'Used in Avero' }, { name: 'Backblaze B2', description: 'Private media storage for Avero — photos, videos, thumbnails, avatars. Browser uploads use short-lived presigned URLs.', context: 'Used in Avero' }] },
  { label: 'Tools', technologies: [{ name: 'Git', description: 'Version control for every project. Commits, branches, rebases — learned by daily use.', context: 'Used regularly' }, { name: 'GitHub', description: 'Remote repositories, issues, PRs, Actions for CI. Nexus is open source on GitHub.', context: 'Used regularly' }, { name: 'Playwright', description: 'End-to-end testing for Avero — simulating real user flows across the app.', context: 'Used in Avero' }, { name: 'ESLint', description: 'Linting for TypeScript/React codebases — keeps code consistent and catches bugs early.', context: 'Used regularly' }, { name: 'Wrangler', description: 'CLI for developing and deploying Cloudflare Workers — used for Avero\'s media proxy.', context: 'Used in Avero' }] },
  { label: 'AI & Development', technologies: [{ name: 'Kilo Code', description: 'AI coding assistant in my editor — helps me plan, write, debug, and understand code.', context: 'Used regularly' }, { name: 'Roo Code', description: 'AI agent for multi-step coding tasks — handles larger refactors and feature work.', context: 'Used regularly' }, { name: 'Claude', description: 'Conversational AI for architecture discussions, debugging, and learning new concepts.', context: 'Used regularly' }, { name: 'Gemini', description: 'Google\'s AI model — used for code review, documentation, and exploring alternatives.', context: 'Exploring' }, { name: 'Aider', description: 'Terminal-based AI pair programmer — used heavily while building Avero\'s backend and infrastructure.', context: 'Used in Avero' }, { name: 'NVIDIA NIM', description: 'Inference microservices for running models locally — experimenting with local LLMs.', context: 'Exploring' }, { name: 'LM Studio', description: 'Local LLM runner — experimenting with running models offline for privacy and speed.', context: 'Exploring' }] },
]

const CONTEXT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Learning': { bg: 'rgba(59, 130, 246, 0.1)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.25)' },
  'Used in Avero': { bg: 'rgba(168, 85, 247, 0.08)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.2)' },
  'Used regularly': { bg: 'rgba(34, 197, 94, 0.1)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.25)' },
  'Exploring': { bg: 'rgba(249, 115, 22, 0.1)', text: '#fb923c', border: 'rgba(249, 115, 22, 0.25)' },
  default: { bg: 'rgba(168, 85, 247, 0.08)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.2)' },
}

function TechnologyButton({ name, isSelected, onSelect, prefersReducedMotion, context }: { name: string; isSelected: boolean; onSelect: () => void; prefersReducedMotion: boolean; context?: string }) {
  const ctx = context ? CONTEXT_COLORS[context] || CONTEXT_COLORS.default : null
  return (
    <button type="button" onClick={onSelect} className={cn('px-3 py-1.5 text-sm font-mono rounded-md transition-all duration-200 ease-out', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg', isSelected ? 'skill-item-active' : 'skill-item')} style={{ transform: isSelected && !prefersReducedMotion ? 'translateY(-1px)' : 'none' }} aria-expanded={isSelected} aria-pressed={isSelected}>
      {name}
      {context && !isSelected && <span className="ml-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-sm" style={{ backgroundColor: ctx?.bg, color: ctx?.text, border: `1px solid ${ctx?.border}` }}>{context}</span>}
    </button>
  )
}

function TechExplanationPanel({ technology, prefersReducedMotion }: { technology: Technology | null; prefersReducedMotion: boolean }) {
  if (!technology) return null
  return <div className="skill-detail-panel mt-4 px-5 py-4 rounded-xl animate-fade-in" style={{ animationDuration: prefersReducedMotion ? '0ms' : '200ms' }} role="region" aria-label={`Details for ${technology.name}`}><p className="text-text-secondary text-sm leading-relaxed">{technology.description}</p></div>
}

function SkillCategory({ category, prefersReducedMotion }: { category: TechnologyCategory; prefersReducedMotion: boolean }) {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
  const handleTechSelect = useCallback((tech: Technology) => { setSelectedTech(prev => prev?.name === tech.name ? null : tech) }, [])
  return (
    <div className="space-y-4">
      <div className="skill-category-card p-5"><div className="flex items-center gap-3 mb-4"><span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" /><span className="font-mono text-xs uppercase tracking-wider text-text-subtle">{category.label}</span></div><div className="flex flex-wrap gap-2">{category.technologies.map((tech) => (<TechnologyButton key={tech.name} name={tech.name} isSelected={selectedTech?.name === tech.name} onSelect={() => handleTechSelect(tech)} prefersReducedMotion={prefersReducedMotion} context={tech.context} />))}</div></div>
      <TechExplanationPanel technology={selectedTech} prefersReducedMotion={prefersReducedMotion} />
    </div>
  )
}

export function Skills({ isVisible }: { isVisible: boolean }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => { const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)'); setPrefersReducedMotion(mediaQuery.matches); const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches); mediaQuery.addEventListener('change', handler); return () => mediaQuery.removeEventListener('change', handler) }, [])
  return (
    <section id="skills" className={cn('section-skills relative section-gap', isVisible && 'is-visible')}>
      <div className="container relative z-10">
        <header className={cn('mb-16 md:mb-20 animate-fade-in', isVisible ? 'is-visible' : '')} style={{ animationDelay: '0ms' }}>
          <span className="section-header-label mb-6">Skills</span>
          <h2 className="text-heading text-balance">Things I&apos;ve worked with</h2>
          <p className="mt-4 text-body-lg max-w-2xl text-text-muted leading-relaxed">Technologies I&apos;ve used while building projects. Some extensively, some experimentally. Python I&apos;m learning in school.</p>
        </header>
        <div className={cn('space-y-8 md:space-y-10 animate-slide-up', isVisible ? 'is-visible' : '')} style={{ animationDelay: '100ms' }}>
          {SKILL_CATEGORIES.map((category) => (<SkillCategory key={category.label} category={category} prefersReducedMotion={prefersReducedMotion} />))}
          <div className="pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
            <p className="text-caption leading-relaxed max-w-2xl mx-auto text-center">No proficiency bars, no percentages — just things I&apos;ve actually used while building and learning.</p>
          </div>
        </div>
      </div>
    </section>
  )
}