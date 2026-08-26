import { useState, useEffect } from 'react'
import { cn } from '../lib/utils'

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Homelab', href: '#homelab' },
  { label: 'Hobbies', href: '#hobbies' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation({ activeSection }: { activeSection: string }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
      setScrollProgress(Math.min(Math.max(progress, 0), 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      e.preventDefault()
      targetElement.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
      targetElement.focus({ preventScroll: true })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300 ease-out',
        isScrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
      role="banner"
    >
      {/* Scroll progress indicator */}
      <div
        className="absolute bottom-0 left-0 h-0.5 transition-transform duration-300 ease-out"
        style={{
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-hover))',
          boxShadow: '0 0 8px var(--color-accent)',
          transformOrigin: 'left center',
        }}
        aria-hidden="true"
      />

      <nav
        className="container"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="#home"
            className="flex items-center gap-2 font-medium text-text hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md px-2 py-1"
            aria-label="Faraz Kayan Haque — Home"
            onClick={(e) => handleLinkClick(e, '#home')}
          >
            <span className="text-lg font-semibold tracking-tight">FKH</span>
          </a>

          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'nav-link relative px-3 py-2 rounded-md transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                    isActive
                      ? 'nav-link-active text-accent'
                      : 'text-text-muted hover:text-text'
                  )}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-text hover:bg-bg-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-border animate-slide-up"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '')
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={cn(
                        'block px-3 py-3 text-base font-medium rounded-md transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                        isActive
                          ? 'text-accent bg-accent-soft'
                          : 'text-text-muted hover:text-text hover:bg-bg-elevated'
                      )}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}