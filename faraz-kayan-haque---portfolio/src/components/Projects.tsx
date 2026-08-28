import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ExternalLink, Code2, Sparkles, Map, Database, Server, Image as ImageIcon } from 'lucide-react';
import { Section } from './Section';

export const Projects = () => {
  const [averoExpanded, setAveroExpanded] = useState(false);
  const [nexusExpanded, setNexusExpanded] = useState(false);

  // Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAveroExpanded(false);
        setNexusExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Section id="projects" className="bg-[#111113] overflow-hidden relative">
      {/* Subtle top transition gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#1C1C20] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 sm:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs tracking-widest text-[#A855F7] uppercase">The Work</span>
            <div className="h-px flex-1 max-w-[100px] bg-[#A855F7]/30" />
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F5F5] leading-[1.1] tracking-tight mb-6 max-w-3xl">
            Built, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#D8B4FE]">Not Claimed.</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#94949F] leading-relaxed max-w-2xl">
            The strongest evidence of my skills is the software itself. I don't wait for the perfect product to exist—I build it.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Featured Project: Avero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`rounded-[2rem] bg-[#161618] border border-white/5 overflow-hidden transition-all duration-500 shadow-2xl ${averoExpanded ? 'border-[#9333EA]/30 ring-1 ring-[#9333EA]/20' : 'hover:border-white/10'}`}
          >
            <div className="p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9333EA]/10 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
              
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 relative z-10">
                <div className="max-w-2xl">
                  <div className="font-mono text-xs tracking-widest text-[#A855F7] uppercase mb-6 flex items-center gap-3">
                    <Sparkles size={14} />
                    Featured Project
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">Avero</h3>
                  
                  <div className="mb-8">
                    <p className="text-xl sm:text-2xl text-[#E4E4E5] font-medium leading-relaxed mb-4">
                      "I had made a lot of memories with my best friend and wished I could relive them."
                    </p>
                    <p className="text-[#94949F] text-lg leading-relaxed">
                      Avero is a private, shared memory space. It started with a personal problem, not a tutorial.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                  <button
                    onClick={() => setAveroExpanded(!averoExpanded)}
                    className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all active:scale-95 whitespace-nowrap ${averoExpanded ? 'bg-[#292930] text-white hover:bg-[#33333C]' : 'bg-[#F5F5F5] text-[#111113] hover:bg-white shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}
                  >
                    {averoExpanded ? 'Close Details' : 'Explore Avero'}
                    <ChevronRight size={20} className={`transition-transform duration-300 ${averoExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Detailed Panel */}
            <AnimatePresence>
              {averoExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-white/5 bg-[#111113] overflow-hidden"
                >
                  <div className="p-8 sm:p-12 grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-16">
                    
                    {/* Left Column: The Narrative */}
                    <div className="xl:col-span-7 space-y-12">
                      <section>
                        <h4 className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-4">Overview</h4>
                        <p className="text-[#C4C4CA] text-lg leading-relaxed">
                          Avero is just a dedicated place for keeping things. It lets you pin memories to actual locations on a map, sort them in a timeline, and basically keep a history of everything you want to remember.
                        </p>
                      </section>

                      <section>
                        <h4 className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-4">What I Built</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            'Secure Media Storage',
                            'Interactive Map Pinning',
                            'Timeline Synchronization',
                            'Private Comments',
                            'Role-based Access Control',
                            'Real-time Updates'
                          ].map(feature => (
                            <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-[#161618] border border-white/5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                              <span className="text-[#E4E4E5] text-sm font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-4">What I Learned</h4>
                        <p className="text-[#94949F] leading-relaxed">
                          This project forced me to understand real-world constraints. I had to learn how to handle large media uploads properly, securely proxy images so they aren't exposed publicly, and structure a relational database with row-level security so users only ever see their own spaces. It took me out of the tutorial phase and into actual product building.
                        </p>
                      </section>
                    </div>

                    {/* Right Column: Technical Depth */}
                    <div className="xl:col-span-5 space-y-8">
                      <section>
                        <h4 className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-4">Behind the Scenes</h4>
                        <div className="space-y-4">
                          <div className="p-5 rounded-2xl bg-[#161618] border border-white/5 flex gap-4">
                            <div className="shrink-0 text-[#A855F7] mt-1"><ImageIcon size={20} /></div>
                            <div>
                              <h5 className="text-[#E4E4E5] font-medium mb-1">Media Handling</h5>
                              <p className="text-[#94949F] text-sm leading-relaxed">
                                Used Backblaze B2 for cost-effective object storage, fronted by Cloudflare Workers for edge caching to serve private media securely and fast.
                              </p>
                            </div>
                          </div>
                          <div className="p-5 rounded-2xl bg-[#161618] border border-white/5 flex gap-4">
                            <div className="shrink-0 text-[#10B981] mt-1"><Map size={20} /></div>
                            <div>
                              <h5 className="text-[#E4E4E5] font-medium mb-1">Spatial Data</h5>
                              <p className="text-[#94949F] text-sm leading-relaxed">
                                Integrated Leaflet and React Leaflet to parse coordinate data and render interactive mapping layers for memory pinning.
                              </p>
                            </div>
                          </div>
                          <div className="p-5 rounded-2xl bg-[#161618] border border-white/5 flex gap-4">
                            <div className="shrink-0 text-[#3B82F6] mt-1"><Database size={20} /></div>
                            <div>
                              <h5 className="text-[#E4E4E5] font-medium mb-1">Data Architecture</h5>
                              <p className="text-[#94949F] text-sm leading-relaxed">
                                Supabase handles authentication and the underlying PostgreSQL database, enforcing strict Row-Level Security policies.
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h4 className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Leaflet', 'Cloudflare', 'Tailwind CSS'].map(tech => (
                            <span key={tech} className="px-3 py-1.5 rounded-lg bg-[#1C1C20] border border-white/5 text-xs text-[#C4C4CA]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </section>
                      
                      <div className="pt-4">
                        <a href="https://withavero.pages.dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[#A855F7] hover:text-[#D8B4FE] transition-colors">
                          <ExternalLink size={16} />
                          Visit Live Project
                        </a>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Secondary Project: Nexus */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`rounded-[2rem] bg-[#161618] border border-white/5 overflow-hidden transition-all duration-500 shadow-xl ${nexusExpanded ? 'border-white/10' : 'hover:border-white/10'}`}
          >
            <div className="p-8 sm:p-12 relative">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="max-w-2xl relative z-10">
                  <div className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-6 flex items-center gap-3">
                    <Code2 size={14} />
                    Desktop Utility
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">Nexus</h3>
                  <div className="text-xl sm:text-2xl text-[#C4C4CA] font-medium leading-relaxed border-l-2 border-white/10 pl-6 py-2 mb-6">
                    "This doesn't exist. I need it. It would make my life faster. So I'll build it."
                  </div>
                  <p className="text-[#94949F] text-lg">
                    A local tool I built to automate boring tasks and organize my desktop.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                  <button
                    onClick={() => setNexusExpanded(!nexusExpanded)}
                    className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 rounded-full bg-[#222228] text-white border border-white/5 hover:bg-[#292930] hover:border-white/10 transition-all font-medium"
                  >
                    {nexusExpanded ? 'Close Details' : 'Explore Nexus'}
                    <ChevronRight size={18} className={`transition-transform ${nexusExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                  </button>
                  <a href="https://github.com/farazkayan/nexus-workflow-manager" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#222228] text-[#94949F] border border-white/5 hover:text-white hover:bg-[#292930] transition-colors flex justify-center w-full sm:w-auto" aria-label="View Repository">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Expanded Detailed Panel */}
            <AnimatePresence>
              {nexusExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-white/5 bg-[#111113] overflow-hidden"
                >
                  <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    <div className="space-y-10">
                      <section>
                        <h4 className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-4">The Motivation</h4>
                        <p className="text-[#C4C4CA] leading-relaxed">
                          I was wasting time setting up my environments, managing local files, and doing repetitive stuff. I didn't want a web app for this; I wanted a native tool on my computer. I basically just built exactly what I needed.
                        </p>
                      </section>
                      <section>
                        <h4 className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-4">What I Learned</h4>
                        <p className="text-[#94949F] leading-relaxed">
                          This taught me how to structure local apps, manage OS-level processes, and use AI to speed up the boring parts.
                        </p>
                      </section>
                    </div>
                    
                    <div className="space-y-10">
                      <section>
                        <h4 className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-4">Behind the Scenes</h4>
                        <div className="space-y-4">
                          <div className="p-5 rounded-2xl bg-[#161618] border border-white/5">
                            <h5 className="text-[#E4E4E5] font-medium mb-1">Native UI Integration</h5>
                            <p className="text-[#94949F] text-sm leading-relaxed">
                              Used PySide6 instead of a web wrapper (like Electron) for better OS integration, native file dialogues, and lower memory footprint on Windows.
                            </p>
                          </div>
                          <div className="p-5 rounded-2xl bg-[#161618] border border-white/5">
                            <h5 className="text-[#E4E4E5] font-medium mb-1">AI-Assisted Workflow</h5>
                            <p className="text-[#94949F] text-sm leading-relaxed">
                              Experimented with Aider to vibe-code tedious parts of the native UI, learning how to direct LLMs effectively in a local codebase.
                            </p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h4 className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Python', 'PySide6', 'Aider', 'Git', 'OS Libraries'].map(tech => (
                            <span key={tech} className="px-3 py-1.5 rounded-lg bg-[#1C1C20] border border-white/5 text-xs text-[#C4C4CA]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
