import { cn } from '../lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'border-t border-border',
        'bg-bg/50 backdrop-blur-sm'
      )}
      role="contentinfo"
    >
      <div className="container py-6 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <span className="font-semibold text-text">Faraz Kayan Haque</span>
            <p className="text-sm text-text-muted">
              Always learning. Always building.
            </p>
          </div>

          <p className="text-xs text-text-subtle text-center md:text-right">
            © {currentYear} Faraz Kayan Haque
          </p>
        </div>
      </div>
    </footer>
  )
}