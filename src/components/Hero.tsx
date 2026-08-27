import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, Code2, Cpu, Terminal, BookOpen, Wrench, Gamepad2, Send, Activity, Sparkles, Server } from 'lucide-react';

const DESTINATIONS = [
  { id: 'about', label: 'About', desc: 'The story so far.', icon: <Terminal size={20} /> },
  { id: 'projects', label: 'Projects', desc: 'Things I built.', icon: <Code2 size={20} /> },
  { id: 'skills', label: 'Skills', desc: 'Tools I use.', icon: <Wrench size={20} /> },
  { id: 'homelab', label: 'Homelab', desc: 'Personal infra.', icon: <Cpu size={20} /> },
  { id: 'education', label: 'Education', desc: 'Where I learn.', icon: <BookOpen size={20} /> },
  { id: 'hobbies', label: 'Hobbies', desc: 'Offline time.', icon: <Gamepad2 size={20} /> },
  { id: 'contact', label: 'Contact', desc: 'Say hello.', icon: <Send size={20} /> },
];

export const Hero = () => {
  return (
    <section id="home" className="relative flex flex-col overflow-hidden bg-[#111113]">
      {/* 1. INITIAL VIEWPORT (HERO) */}
      <div className="relative min-h-[100svh] flex flex-col justify-center py-20">
        {/* Ambient Lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-[#9333EA]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[15vw] sm:text-[6rem] lg:text-[8rem] font-bold tracking-[-0.04em] text-[#F5F5F5] leading-[0.9] mb-8"
          >
            Faraz Kayan<br/>Haque
          </motion.h1>
          
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#E4E4E5] leading-tight mb-6"
            >
              I build things I wish existed.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-[#94949F] leading-relaxed"
            >
              Always learning. Always building. I don't know what I'll build next — and that's the fun part.
            </motion.p>
          </div>

          {/* Subtle Project / Infra Hints */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-16 flex flex-col sm:flex-row gap-8 sm:gap-16"
          >
            <div>
              <div className="font-mono text-xs text-[#94949F] uppercase tracking-widest mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-[#A855F7]" />
                Featured Work
              </div>
              <div className="flex gap-4">
                <a href="#projects" className="text-sm font-medium text-[#C4C4CA] hover:text-white transition-colors border-b border-white/10 hover:border-[#A855F7] pb-1">Avero</a>
                <a href="#projects" className="text-sm font-medium text-[#C4C4CA] hover:text-white transition-colors border-b border-white/10 hover:border-[#A855F7] pb-1">Nexus</a>
              </div>
            </div>

            <div>
              <div className="font-mono text-xs text-[#94949F] uppercase tracking-widest mb-3 flex items-center gap-2">
                <Server size={14} className="text-[#10B981]" />
                Self-Hosted
              </div>
              <div className="text-sm font-medium text-[#71717A]">
                Jellyfin · Immich · Pi-hole · Nextcloud · CasaOS · Minecraft
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 lg:bottom-12 right-6 lg:right-12 hidden md:flex flex-col items-center gap-4 text-[#94949F]"
        >
          <span className="text-[10px] uppercase tracking-widest font-mono rotate-90 origin-bottom translate-y-4">Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>

      {/* 2. DISCOVERY / EXPLORATION */}
      <div className="relative z-10 py-20 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-12"
        >
          <div className="flex items-center gap-4">
            <h3 className="font-mono text-xs tracking-widest text-[#A855F7] uppercase">Explore</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
             {DESTINATIONS.map((dest, i) => (
               <motion.a 
                 key={dest.id} 
                 href={`#${dest.id}`}
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ delay: i * 0.05 }}
                 className="group relative p-5 rounded-2xl bg-[#161618] border border-white/5 hover:border-[#9333EA]/30 hover:bg-[#1C1C20] transition-all duration-300 flex flex-col justify-between overflow-hidden"
               >
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[#9333EA]/5 rounded-full blur-[30px] group-hover:bg-[#9333EA]/15 transition-colors pointer-events-none" />
                 
                 <div className="flex items-center justify-between mb-4">
                   <div className="text-[#94949F] group-hover:text-[#A855F7] transition-colors">
                     {dest.icon}
                   </div>
                   <ArrowRight size={14} className="text-[#94949F] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                 </div>
                 
                 <div>
                   <h4 className="font-semibold text-[#E4E4E5] group-hover:text-white transition-colors">{dest.label}</h4>
                   <p className="text-xs text-[#71717A] mt-1">{dest.desc}</p>
                 </div>
               </motion.a>
             ))}
          </div>
        </motion.div>
      </div>

      {/* 3. CURRENT SNAPSHOT */}
      <div className="relative z-10 py-24 sm:py-32 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F5F5] mb-6 tracking-tight">What I'm doing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#D8B4FE]">right now.</span></h3>
            <p className="text-lg text-[#94949F] leading-relaxed mb-8">
              I don't really have a master plan. I just like figuring out how things work. Here's what's usually on my screen lately.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 sm:p-10 rounded-[2rem] bg-[#161618] border border-white/5 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
              <Activity className="text-[#10B981]" size={24} />
              <h3 className="font-display text-2xl font-semibold text-white">Active Status</h3>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start group">
                <div className="w-2 h-2 rounded-full bg-[#10B981]/50 mt-2 group-hover:bg-[#10B981] transition-colors shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
                <div>
                  <h4 className="text-[#F5F5F5] font-medium mb-1">Learning</h4>
                  <p className="text-[#94949F] text-sm sm:text-base leading-relaxed">Learning Python in school, but mostly just experimenting with local AI stuff to see what it can actually do.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start group">
                <div className="w-2 h-2 rounded-full bg-[#A855F7]/50 mt-2 group-hover:bg-[#A855F7] transition-colors shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.2)]" />
                <div>
                  <h4 className="text-[#F5F5F5] font-medium mb-1">Building</h4>
                  <p className="text-[#94949F] text-sm sm:text-base leading-relaxed">Building random things I actually need, mostly to speed up my own workflows.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start group">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]/50 mt-2 group-hover:bg-[#3B82F6] transition-colors shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.2)]" />
                <div>
                  <h4 className="text-[#F5F5F5] font-medium mb-1">Running</h4>
                  <p className="text-[#94949F] text-sm sm:text-base leading-relaxed">Running a bunch of self-hosted stuff on Docker, mostly because it's cool to own my infrastructure.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
};
