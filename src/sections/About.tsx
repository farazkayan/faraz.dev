export function About() {
  return (
    <section id="about" className="section-about relative section-gap">
      <div className="container relative z-10">
        <header className="mb-16 md:mb-20 animate-fade-in">
          <span className="section-header-label mb-6">About</span>
          <h2 className="text-heading text-balance">About</h2>
        </header>

        <div className="max-w-3xl mx-auto space-y-10 md:space-y-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {/* Opening statement - larger, more prominent */}
          <div className="prose prose-invert prose-lg md:prose-xl max-w-none">
            <p className="text-text-secondary leading-relaxed text-lg">
              I got into technology because something about it just clicked. There's a particular satisfaction in taking separate pieces — code, services, hardware — and making them work together as a coherent whole.
            </p>
            <p className="text-text-secondary leading-relaxed mt-6 text-lg">
              I tend to build things when I notice something that doesn't exist yet, or when an existing tool doesn't quite work the way I need it to. "I build things I wish existed" isn't a tagline — it's genuinely how most of my projects start.
            </p>
          </div>

          <div className="relative pl-8 border-l-2 border-accent/20 space-y-10 md:space-y-12">
            <div className="prose prose-invert prose-base md:prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed">
                I'm still a student, currently learning Python in school. Most of what I know beyond that has come from actually building projects and investigating why they break.
              </p>
              <p className="text-text-secondary leading-relaxed mt-6">
                AI is a big part of how I work — tools like Kilo Code, Roo Code, Claude, Gemini, Aider, NVIDIA NIM, and LM Studio are in my daily workflow. But I don't just accept what they generate. When something fails, I dig in to understand the problem first, then use AI to help pinpoint and fix it. Learning why something broke means I'm less likely to hit the same wall twice.
              </p>
            </div>

            <div className="prose prose-invert prose-base md:prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed">
                Building projects has pulled me into areas beyond just writing code. I've spent a lot of time with Linux servers, Docker, self-hosting, databases, media storage, and networking — not because I set out to learn "DevOps," but because the things I wanted to build required it.
              </p>
              <p className="text-text-secondary leading-relaxed mt-6">
                I run a few things at home: CasaOS for a dashboard, Immich for photos, Jellyfin for media, and a couple of Minecraft servers for friends. It's taught me that the best way to learn infrastructure is to actually run it.
              </p>
            </div>

            <div className="pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
              <p className="text-text-secondary leading-relaxed text-sm">
                When I'm not building, I'm probably taking photos of cats, playing Stray for the third time, or convincing friends to go on a random side quest. The dedicated <a href="#hobbies" className="link-external">Hobbies</a> section has more on that.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}