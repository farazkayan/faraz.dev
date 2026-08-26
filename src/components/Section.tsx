import { cn } from '../lib/utils'

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  'aria-labelledby'?: string
}

export function Section({ id, children, className, 'aria-labelledby': labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24 lg:py-32', className)}
      aria-labelledby={labelledBy}
    >
      <div className="container">
        {children}
      </div>
    </section>
  )
}

interface SectionHeaderProps {
  id?: string
  label?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ id, label, title, description, className }: SectionHeaderProps) {
  return (
    <header className={cn('mb-12 md:mb-16', className)}>
      {label && (
        <span className="inline-block px-3 py-1 text-xs font-mono text-text-subtle uppercase tracking-wider mb-4 rounded-sm bg-bg-elevated border border-border">
          {label}
        </span>
      )}
      <h2 id={id} className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-text-muted">
          {description}
        </p>
      )}
    </header>
  )
}