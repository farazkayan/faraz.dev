function App() {
  return (
    <main className="min-h-screen">
      <div className="container py-16 md:py-24">
        <header className="mb-12 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance">
            Faraz Kayan Haque
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Student & Builder
          </p>
        </header>

        <section className="space-y-8 md:space-y-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="rounded-xl border border-border p-6 md:p-8 bg-bg-elevated">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Development Foundation Ready
            </h2>
            <p className="text-text-muted">
              Vite + React + TypeScript + Tailwind CSS v4 initialized successfully.
              Dark-mode-only foundation with Inter + JetBrains Mono typography established.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border p-6 md:p-8 bg-bg-elevated">
              <h3 className="text-lg font-semibold mb-2">Stack</h3>
              <ul className="space-y-1 text-text-muted font-mono text-sm">
                <li>React 19 + TypeScript</li>
                <li>Vite 6</li>
                <li>Tailwind CSS v4</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border p-6 md:p-8 bg-bg-elevated">
              <h3 className="text-lg font-semibold mb-2">Design Tokens</h3>
              <ul className="space-y-1 text-text-muted font-mono text-sm">
                <li>Matte dark base (#0a0a0b)</li>
                <li>Purple accent (placeholder)</li>
                <li>Inter + JetBrains Mono</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App