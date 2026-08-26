import { cn } from '../lib/utils'

interface SocialLink { name: string; url: string; icon: React.ReactNode; ariaLabel: string }
interface ContactData { email: string; heading: string; subtext: string; socialLinks: SocialLink[] }

const CONTACT_DATA: ContactData = {
  email: 'farazkayanhaque.official@gmail.com',
  heading: "Let's talk.",
  subtext: "If you want to talk about something I'm building, found something cool, or just want to say hi, feel free.",
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/farazkayan', ariaLabel: 'GitHub', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
    { name: 'Instagram', url: 'https://www.instagram.com/faraz_kayan_haque/', ariaLabel: 'Instagram', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
    { name: 'Facebook', url: 'https://www.facebook.com/faraz.kayan.haque/', ariaLabel: 'Facebook', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/faraz-kayan-haque-6b70253aa/', ariaLabel: 'LinkedIn', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  ],
}

export function Contact({ isVisible }: { isVisible: boolean }) {
  const { email, heading, subtext, socialLinks } = CONTACT_DATA
  return (
    <section id="contact" className={cn('section-contact relative section-gap', isVisible && 'is-visible')}>
      <div className="container relative z-10">
        <header className={cn('mb-16 md:mb-20 animate-fade-in text-center', isVisible ? 'is-visible' : '')} style={{ animationDelay: '0ms' }}>
          <span className="section-header-label mb-6">Contact</span>
          <h2 className="text-heading text-balance">{heading}</h2>
          <p className="mt-4 text-body-lg max-w-2xl mx-auto text-text-muted leading-relaxed">{subtext}</p>
        </header>
        <div className={cn('max-w-xl mx-auto animate-slide-up', isVisible ? 'is-visible' : '')} style={{ animationDelay: '100ms' }}>
          <a href={`mailto:${email}`} className="contact-cta w-full group block py-6 px-8 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="inline-block group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span className="font-mono text-base tracking-wider block mt-2">{email}</span>
          </a>
          <p className="mt-8 text-center text-text-subtle text-sm">Or find me elsewhere</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={social.ariaLabel}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}