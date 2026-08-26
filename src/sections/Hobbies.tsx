import { useState, useEffect, useCallback } from 'react'
import { cn } from '../lib/utils'

interface Hobby { name: string; description: string; expandedDescription?: string }

interface HobbySection { title: string; hobbies: Hobby[]; layout?: 'feature' | 'list' }

const HOBBIES: HobbySection[] = [
  { title: 'Cats', layout: 'feature', hobbies: [{ name: 'Cats', description: 'I really like cats. I also take an unreasonable number of pictures of them.', expandedDescription: 'Street cats, house cats, friend\'s cats — if there\'s a cat nearby, I\'m probably already crouched down trying to get a good shot. They\'re the most willing photography subjects if you have the patience.' }] },
  { title: 'Photography', layout: 'feature', hobbies: [{ name: 'Photography', description: 'Capturing moments that feel right — cats, places, objects, random things that catch my eye.', expandedDescription: 'Not a professional photographer. Just someone who carries a camera (or phone) and stops when something looks interesting. The best shots are usually the ones I didn\'t plan.' }] },
  { title: 'Games', layout: 'list', hobbies: [{ name: 'Indie & Chill Games', description: 'Games where I can just explore and enjoy the atmosphere. Stray is a good example — you play as a cat in a cyberpunk city.', expandedDescription: 'No competitive grind, no meta. Just vibes. Games like Stray, Journey, Firewatch, Eastshade — things that feel like wandering through a mood rather than checking off objectives.' }] },
  { title: 'Anime', layout: 'list', hobbies: [{ name: 'Anime', description: 'Big anime fan. One Piece especially — been following it for years.', expandedDescription: 'One Piece is the one that stuck. The world-building, the characters, the way it balances goofy adventure with genuine emotional weight. Currently caught up and waiting weekly like everyone else.' }] },
  { title: 'Side Quests', layout: 'list', hobbies: [{ name: 'Random Side Quests', description: 'Going somewhere just because it sounds fun. Spontaneous plans with friends that turn into stories.', expandedDescription: 'No itinerary, just a starting point. Could be a random train ride, a cafe three towns over, or showing up at a place because someone mentioned it once. The unplanned ones are usually the best memories.' }] },
]

function HobbyItem({ hobby, prefersReducedMotion }: { hobby: Hobby; prefersReducedMotion: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggle = useCallback(() => { setIsExpanded(prev => !prev) }, [])
  return (
    <article className={cn('p-6 md:p-8 rounded-xl border transition-all duration-300 ease-out', 'hobby-feature', isExpanded && 'ring-1 ring-accent/30')} style={{ opacity: prefersReducedMotion ? 1 : 0, transform: prefersReducedMotion ? 'none' : 'translateY(16px)', animation: prefersReducedMotion ? 'none' : 'slideUp var(--transition-slow) var(--ease-out) forwards' }}>
      <button type="button" onClick={toggle} className={cn('w-full flex items-start justify-between gap-4 text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-lg', isExpanded && 'text-text')} aria-expanded={isExpanded} aria-controls={`hobby-detail-${hobby.name.replace(/\s+/g, '-').toLowerCase()}`}>
        <div className="flex-1 min-w-0"><h3 className="text-base md:text-lg font-medium tracking-tight">{hobby.name}</h3><p className="mt-1 text-text-muted text-sm leading-relaxed">{hobby.description}</p></div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('flex-shrink-0 text-text-subtle transition-transform duration-200 ease-out', isExpanded && !prefersReducedMotion && 'rotate-180')} aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {hobby.expandedDescription && <div id={`hobby-detail-${hobby.name.replace(/\s+/g, '-').toLowerCase()}`} className={cn('mt-4 px-5 py-4 rounded-xl border border-accent/20 bg-accent-soft/30 animate-fade-in', isExpanded ? 'block' : 'hidden')} style={{ animationDuration: prefersReducedMotion ? '0ms' : '200ms' }} role="region" aria-label={`More about ${hobby.name}`}><p className="text-text-secondary text-sm leading-relaxed">{hobby.expandedDescription}</p></div>}
    </article>
  )
}

function HobbySection({ section, index, prefersReducedMotion }: { section: HobbySection; index: number; prefersReducedMotion: boolean }) {
  if (section.layout === 'feature') {
    return <div className="space-y-6 animate-slide-up" style={{ animationDelay: `${100 + index * 100}ms` }}>{section.hobbies.map((hobby) => (<HobbyItem key={hobby.name} hobby={hobby} prefersReducedMotion={prefersReducedMotion} />))}</div>
  }
  return (
    <div className="space-y-4 animate-slide-up" style={{ animationDelay: `${100 + index * 100}ms` }}>
      <div className="flex items-center gap-3 mb-3"><span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-orange-500" aria-hidden="true" /><span className="font-mono text-xs uppercase tracking-wider text-text-subtle">{section.title}</span></div>
      <div className="space-y-4">{section.hobbies.map((hobby) => (<HobbyItem key={hobby.name} hobby={hobby} prefersReducedMotion={prefersReducedMotion} />))}</div>
    </div>
  )
}

export function Hobbies() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => { const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)'); setPrefersReducedMotion(mediaQuery.matches); const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches); mediaQuery.addEventListener('change', handler); return () => mediaQuery.removeEventListener('change', handler) }, [])
  return (
    <section id="hobbies" className="section-hobbies relative section-gap">
      <div className="container relative z-10">
        <header className="mb-16 md:mb-20 animate-fade-in"><span className="section-header-label mb-6">Hobbies</span><h2 className="text-heading text-balance">Outside of building</h2><p className="mt-4 text-body-lg max-w-2xl text-text-muted leading-relaxed">When I&apos;m not building something, I&apos;m usually taking pictures, playing something chill, or going somewhere I didn&apos;t plan to go.</p></header>
        <div className="space-y-12 md:space-y-16">{HOBBIES.map((section, index) => (<HobbySection key={section.title} section={section} index={index} prefersReducedMotion={prefersReducedMotion} />))}<div className="pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '200ms' }}><p className="text-caption leading-relaxed max-w-2xl mx-auto text-center">The interesting stuff happens between the planned things.</p></div></div>
      </div>
    </section>
  )
}