import { useState, useEffect, useCallback } from 'react'
import { cn } from '../lib/utils'

interface LifeItem {
  name: string
  description: string
  expandedDescription?: string
  context?: string
}

interface LifeCategory {
  title: string
  items: LifeItem[]
  layout?: 'feature' | 'list'
}

const LIFE_CATEGORIES: LifeCategory[] = [
  {
    title: 'Homelab',
    layout: 'list',
    items: [
      {
        name: 'Jellyfin',
        description: 'Self-hosted media server for keeping my own media library accessible across my devices.',
        context: 'Running',
      },
      {
        name: 'Minecraft / PaperMC',
        description: 'Ran a PaperMC Minecraft server on an old laptop — a practical way to learn about running services, backups, and remote access.',
        context: 'Running',
      },
      {
        name: 'Immich',
        description: 'Self-hosted photo and video backup — keeps my photos off cloud services while staying searchable and organized.',
        context: 'Running',
      },
      {
        name: 'CasaOS',
        description: 'Simple dashboard for managing Docker containers on my home server. Makes self-hosting feel approachable.',
        context: 'Running',
      },
      {
        name: 'Tailscale',
        description: 'Connects my devices remotely with a private mesh network. Great for secure remote access without opening ports.',
        context: 'Running',
      },
      {
        name: 'Sunshine / Moonlight',
        description: 'Game streaming setup — Sunshine on the host, Moonlight on the client. Lets me play from anywhere on the local network or over Tailscale.',
        context: 'Experimenting',
      },
    ],
  },
  {
    title: 'Cats',
    layout: 'feature',
    items: [
      {
        name: 'Cats',
        description: 'I really like cats. I also take an unreasonable number of pictures of them.',
        expandedDescription: 'Street cats, house cats, friend\'s cats — if there\'s a cat nearby, I\'m probably already crouched down trying to get a good shot. They\'re the most willing photography subjects if you have the patience.',
        context: '📸',
      },
    ],
  },
  {
    title: 'Photography',
    layout: 'feature',
    items: [
      {
        name: 'Photography',
        description: 'Capturing moments that feel right — cats, places, objects, random things that catch my eye.',
        expandedDescription: 'Not a professional photographer. Just someone who carries a camera (or phone) and stops when something looks interesting. The best shots are usually the ones I didn\'t plan.',
        context: '📷',
      },
    ],
  },
  {
    title: 'Games',
    layout: 'list',
    items: [
      {
        name: 'Indie & Chill Games',
        description: 'Games where I can just explore and enjoy the atmosphere. Stray is a good example — you play as a cat in a cyberpunk city.',
        expandedDescription: 'No competitive grind, no meta. Just vibes. Games like Stray, Journey, Firewatch, Eastshade — things that feel like wandering through a mood rather than checking off objectives.',
        context: '🎮',
      },
    ],
  },
  {
    title: 'Anime',
    layout: 'list',
    items: [
      {
        name: 'Anime',
        description: 'Big anime fan. One Piece especially — been following it for years.',
        expandedDescription: 'One Piece is the one that stuck. The world-building, the characters, the way it balances goofy adventure with genuine emotional weight. Currently caught up and waiting weekly like everyone else.',
        context: '🏴‍☠️',
      },
    ],
  },
  {
    title: 'Side Quests',
    layout: 'list',
    items: [
      {
        name: 'Random Side Quests',
        description: 'Going somewhere just because it sounds fun. Spontaneous plans with friends that turn into stories.',
        expandedDescription: 'No itinerary, just a starting point. Could be a random train ride, a cafe three towns over, or showing up at a place because someone mentioned it once. The unplanned ones are usually the best memories.',
        context: '🗺️',
      },
    ],
  },
]

function LifeItemButton({
  item,
  isSelected,
  onSelect,
  prefersReducedMotion,
}: {
  item: LifeItem
  isSelected: boolean
  onSelect: () => void
  prefersReducedMotion: boolean
}) {
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
      style={{
        transform: isSelected && !prefersReducedMotion ? 'translateY(-1px)' : 'none',
      }}
      aria-expanded={isSelected}
      aria-pressed={isSelected}
    >
      {item.name}
      {item.context && !isSelected && (
        <span className="ml-1.5 text-sm">{item.context}</span>
      )}
    </button>
  )
}

function LifeItemCard({
  item,
  prefersReducedMotion,
}: {
  item: LifeItem
  prefersReducedMotion: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggle = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  return (
    <article
      className={cn(
        'p-6 md:p-8 rounded-xl border border-border bg-bg-card',
        'transition-all duration-300 ease-out',
        'hover:border-border-strong hover:bg-bg-elevated hover:shadow-lg',
        isExpanded && 'ring-1 ring-accent/20'
      )}
      style={{
        opacity: prefersReducedMotion ? 1 : 0,
        transform: prefersReducedMotion ? 'none' : 'translateY(16px)',
        animation: prefersReducedMotion
          ? 'none'
          : 'slideUp var(--transition-slow) var(--ease-out) forwards',
      }}
    >
      <button
        type="button"
        onClick={toggle}
        className={cn(
          'w-full flex items-start justify-between gap-4 text-left',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-lg',
          isExpanded && 'text-text'
        )}
        aria-expanded={isExpanded}
        aria-controls={`life-detail-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex-1 min-w-0 flex items-center gap-3">
          {item.context && (
            <span className="text-xl flex-shrink-0" aria-hidden="true">{item.context}</span>
          )}
          <div>
            <h3 className="text-base md:text-lg font-medium tracking-tight">
              {item.name}
            </h3>
            <p className="mt-1 text-text-muted text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'flex-shrink-0 text-text-subtle transition-transform duration-200 ease-out',
            isExpanded && !prefersReducedMotion && 'rotate-180'
          )}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {item.expandedDescription && (
        <div
          id={`life-detail-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
          className={cn(
            'mt-4 px-5 py-4 rounded-xl border border-border bg-bg-card animate-fade-in',
            isExpanded ? 'block' : 'hidden'
          )}
          style={{ animationDuration: prefersReducedMotion ? '0ms' : '200ms' }}
          role="region"
          aria-label={`More about ${item.name}`}
        >
          <p className="text-text-muted text-sm leading-relaxed">
            {item.expandedDescription}
          </p>
        </div>
      )}
    </article>
  )
}

function LifeCategory({
  category,
  index,
  prefersReducedMotion,
}: {
  category: LifeCategory
  index: number
  prefersReducedMotion: boolean
}) {
  if (category.layout === 'feature') {
    return (
      <div className="space-y-6 animate-slide-up" style={{ animationDelay: `${100 + index * 100}ms` }}>
        {category.items.map((item) => (
          <LifeItemCard
            key={item.name}
            item={item}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    )
  }

  const [selectedItem, setSelectedItem] = useState<LifeItem | null>(null)

  const handleItemSelect = useCallback((item: LifeItem) => {
    setSelectedItem(prev => prev?.name === item.name ? null : item)
  }, [])

  return (
    <div className="space-y-4 animate-slide-up" style={{ animationDelay: `${100 + index * 100}ms` }}>
      <span className="font-mono text-xs uppercase tracking-wider text-text-subtle block mb-3">
        {category.title}
      </span>
      <div className="p-4 rounded-xl border border-border bg-bg-card">
        <div className="flex flex-wrap gap-2">
          {category.items.map((item) => (
            <LifeItemButton
              key={item.name}
              item={item}
              isSelected={selectedItem?.name === item.name}
              onSelect={() => handleItemSelect(item)}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      <div
        className={cn(
          'mt-4 px-5 py-4 rounded-xl border border-border bg-bg-card animate-fade-in',
          selectedItem ? 'block' : 'hidden'
        )}
        style={{ animationDuration: prefersReducedMotion ? '0ms' : '200ms' }}
        role="region"
        aria-label={selectedItem ? `Details for ${selectedItem.name}` : undefined}
      >
        {selectedItem?.expandedDescription && (
          <p className="text-text-muted text-sm leading-relaxed">
            {selectedItem.expandedDescription}
          </p>
        )}
      </div>
    </div>
  )
}

export function Life() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <section id="life" className="py-20 md:py-28 lg:py-36">
      <div className="container">
        <header className="mb-16 md:mb-20 animate-fade-in">
          <span className="section-header-label mb-6">Life</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            Life
          </h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-text-muted leading-relaxed">
            When I&apos;m not building something, I&apos;m usually taking pictures, playing something chill, or going somewhere I didn&apos;t plan to go.
          </p>
        </header>

        <div className="space-y-12 md:space-y-16">
          {LIFE_CATEGORIES.map((category, index) => (
            <LifeCategory
              key={category.title}
              category={category}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}

          <div className="pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
            <p className="text-text-subtle text-sm leading-relaxed max-w-2xl mx-auto text-center">
              The interesting stuff happens between the planned things.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}