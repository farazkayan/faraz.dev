import { useState, useEffect, useCallback } from 'react'
import { cn } from '../lib/utils'

interface HomelabItem { name: string; description: string; context?: string }
interface HomelabCategory { label: string; items: HomelabItem[] }

const HOMELAB_CATEGORIES: HomelabCategory[] = [
  { label: 'Services & Projects', items: [{ name: 'Jellyfin', description: 'Self-hosted media server for keeping my own media library accessible across my devices.', context: 'Running' }, { name: 'Minecraft / PaperMC', description: 'Ran a PaperMC Minecraft server on an old laptop — a practical way to learn about running services, backups, and remote access.', context: 'Running' }, { name: 'Immich', description: 'Self-hosted photo and video backup — keeps my photos off cloud services while staying searchable and organized.', context: 'Running' }, { name: 'CasaOS', description: 'Simple dashboard for managing Docker containers on my home server. Makes self-hosting feel approachable.', context: 'Running' }, { name: 'Tailscale', description: 'Connects my devices remotely with a private mesh network. Great for secure remote access without opening ports.', context: 'Running' }, { name: 'Sunshine / Moonlight', description: 'Game streaming setup — Sunshine on the host, Moonlight on the client. Lets me play from anywhere on the local network or over Tailscale.', context: 'Experimenting' }] },
  { label: 'Infrastructure & Things I\'ve Messed With', items: [{ name: 'Ubuntu / Linux', description: 'Daily-drove Linux on old hardware — learned package management, systemd, SSH, and debugging by actually breaking and fixing things.', context: 'Comfortable' }, { name: 'Networking', description: 'Set up VLANs, DNS, reverse proxies, and firewall rules. Mostly learned by needing something to work and figuring it out.', context: 'Exploring' }, { name: 'Self-hosting', description: 'Ran services on hardware at home instead of cloud. Taught me about uptime, backups, power costs, and hardware limits.', context: 'Comfortable' }, { name: 'Remote Access', description: 'Tailscale for mesh VPN, SSH for management, Cloudflare Tunnel for public endpoints. Different tools for different trust levels.', context: 'Comfortable' }, { name: 'Cloudflare', description: 'Used Cloudflare Pages for Avero\'s frontend, Workers for the media proxy, and Tunnels for exposing local services selectively.', context: 'Used in Avero' }] },
]

function HomelabItemButton({ name, isSelected, onSelect, prefersReducedMotion, context }: { name: string; isSelected: boolean; onSelect: () => void; prefersReducedMotion: boolean; context?: string }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'px-3 py-1.5 text-sm font-mono rounded-md transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        isSelected ? 'homelab-item-active' : 'homelab-item'
      )}
      style={{ transform: isSelected && !prefersReducedMotion ? 'translateY(-1px)' : 'none' }}
      aria-expanded={isSelected}
      aria-pressed={isSelected}
    >
      {name}
      {context && !isSelected && (
        <span className="ml-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-sm" style={{ backgroundColor: 'rgba(168, 85, 247, 0.08)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          {context}
        </span>
      )}
    </button>
  )
}

function ItemExplanationPanel({ item, prefersReducedMotion }: { item: HomelabItem | null; prefersReducedMotion: boolean }) {
  if (!item) return null
  return <div className="mt-4 px-5 py-4 rounded-xl border border-accent/30 bg-accent-soft/50 animate-fade-in" style={{ animationDuration: prefersReducedMotion ? '0ms' : '200ms' }} role="region" aria-label={`Details for ${item.name}`}><p className="text-text-secondary text-sm leading-relaxed">{item.description}</p></div>
}

function HomelabCategory({ category, prefersReducedMotion }: { category: HomelabCategory; prefersReducedMotion: boolean }) {
  const [selectedItem, setSelectedItem] = useState<HomelabItem | null>(null)
  const handleItemSelect = useCallback((item: HomelabItem) => { setSelectedItem(prev => prev?.name === item.name ? null : item) }, [])
  return (
    <div className="space-y-4">
      <div className="homelab-grid p-4 rounded-xl border border-border/50 bg-bg-elevated/30"><span className="font-mono text-xs uppercase tracking-wider text-text-subtle block mb-3">{category.label}</span><div className="flex flex-wrap gap-2">{category.items.map((item) => (<HomelabItemButton key={item.name} name={item.name} isSelected={selectedItem?.name === item.name} onSelect={() => handleItemSelect(item)} prefersReducedMotion={prefersReducedMotion} context={item.context} />))}</div></div>
      <ItemExplanationPanel item={selectedItem} prefersReducedMotion={prefersReducedMotion} />
    </div>
  )
}

export function Homelab() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => { const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)'); setPrefersReducedMotion(mediaQuery.matches); const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches); mediaQuery.addEventListener('change', handler); return () => mediaQuery.removeEventListener('change', handler) }, [])
  return (
    <section id="homelab" className="section-homelab relative section-gap">
      <div className="container relative z-10">
        <header className="mb-16 md:mb-20 animate-fade-in"><span className="section-header-label mb-6">Homelab</span><h2 className="text-heading text-balance">Homelab</h2><p className="mt-4 text-body-lg max-w-2xl text-text-muted leading-relaxed">I like taking old hardware, putting it to work, and seeing what I can make it do.</p></header>
        <div className="space-y-8 md:space-y-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {HOMELAB_CATEGORIES.map((category) => (<HomelabCategory key={category.label} category={category} prefersReducedMotion={prefersReducedMotion} />))}
          <div className="pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '200ms' }}><p className="text-caption leading-relaxed max-w-2xl mx-auto text-center">I mostly do this because it&apos;s fun to see something running on hardware that would&apos;ve otherwise been sitting around.</p></div>
        </div>
      </div>
    </section>
  )
}