import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from './Section';
import { Code2, Database, Server, Sparkles, Layout, Wrench } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    name: "Languages",
    icon: <Code2 size={16} />,
    skills: [
      { name: 'Python', status: 'LEARNING', desc: "Currently learning this in school. It's great for quick scripts and automation.", projects: ['Nexus'] },
      { name: 'TypeScript', status: 'USED IT FOR AVERO', desc: "I used this for Avero and Nexus. It helps me catch things before they break.", projects: ['Avero'] },
      { name: 'SQL', status: 'USED IT FOR AVERO', desc: "I used SQL in Avero to store everything. Still getting the hang of it, but it works.", projects: ['Avero'] },
    ]
  },
  {
    name: "Frontend",
    icon: <Layout size={16} />,
    skills: [
      { name: 'React', status: 'USED IN AVERO', desc: "My default for building interfaces. I used it for most of my recent projects.", projects: ['Avero'] },
      { name: 'Vite', status: 'USED IN AVERO', desc: "It's just really fast. I use it to bundle almost all my frontend stuff now.", projects: ['Avero'] },
      { name: 'Tailwind CSS', status: 'USED REGULARLY', desc: "Basically how I style everything now. It just makes things way faster.", projects: ['Avero', 'Portfolio'] },
      { name: 'React Router', status: 'USED IN AVERO', desc: "Used to handle navigating between different pages without reloading.", projects: ['Avero'] },
      { name: 'Leaflet', status: 'USED IN AVERO', desc: "I used this to pin memories to actual physical locations on a map.", projects: ['Avero'] },
      { name: 'React Leaflet', status: 'USED IN AVERO', desc: "Makes using Leaflet inside React a lot less painful.", projects: ['Avero'] },
    ]
  },
  {
    name: "Backend & Data",
    icon: <Database size={16} />,
    skills: [
      { name: 'Supabase', status: 'USED IN AVERO', desc: "What I used for Avero's backend so I didn't have to build an entire auth and database system from scratch.", projects: ['Avero'] },
      { name: 'PostgreSQL', status: 'USED IN AVERO', desc: "I used this in Avero to store everything. Still getting the hang of it, but it works.", projects: ['Avero'] },
      { name: 'Supabase Edge Functions', status: 'USED IN AVERO', desc: "For running little backend scripts close to the user without managing a whole server.", projects: ['Avero'] },
      { name: 'Deno', status: 'USED IN AVERO', desc: "The runtime those Edge Functions use. It's like Node but feels a bit cleaner.", projects: ['Avero'] },
    ]
  },
  {
    name: "Infrastructure",
    icon: <Server size={16} />,
    skills: [
      { name: 'Cloudflare Pages', status: 'USED IN AVERO', desc: "I use this to host the frontend. It's ridiculously easy.", projects: ['Avero'] },
      { name: 'Cloudflare Workers', status: 'USED IN AVERO', desc: "Used this to securely serve photos and videos fast.", projects: ['Avero'] },
      { name: 'Backblaze B2', status: 'USED IN AVERO', desc: "Way cheaper than AWS for storing all the private photos in Avero.", projects: ['Avero'] },
    ]
  },
  {
    name: "Tools",
    icon: <Wrench size={16} />,
    skills: [
      { name: 'Git', status: 'USED REGULARLY', desc: "So I don't lose my code when I inevitably break something.", projects: ['Workflow'] },
      { name: 'GitHub', status: 'USED REGULARLY', desc: "Where I store everything.", projects: ['Workflow'] },
      { name: 'Playwright', status: 'USED IN AVERO', desc: "Used it to automatically test Avero so I didn't have to click through it manually every time.", projects: ['Avero'] },
      { name: 'ESLint', status: 'USED REGULARLY', desc: "Yells at me when I write bad code.", projects: ['Workflow'] },
      { name: 'Wrangler', status: 'USED IN AVERO', desc: "The CLI tool for deploying to Cloudflare.", projects: ['Avero'] },
    ]
  },
  {
    name: "AI & Development",
    icon: <Sparkles size={16} />,
    skills: [
      { name: 'Kilo Code', status: 'USED REGULARLY', desc: "Editor tool I use all the time to speed up scaffolding and writing boilerplate.", projects: ['Workflow'] },
      { name: 'Roo Code', status: 'USED REGULARLY', desc: "Another editor tool I use when I want to experiment with ideas quickly.", projects: ['Workflow'] },
      { name: 'Claude', status: 'USED REGULARLY', desc: "My go-to for brainstorming logic and figuring out why my code is failing.", projects: ['Workflow'] },
      { name: 'Gemini', status: 'EXPLORING', desc: "I use this a lot for creative stuff and trying out new multimodal models.", projects: ['Workflow'] },
      { name: 'Aider', status: 'USED IN AVERO', desc: "A command-line AI tool I use to vibe-code the tedious parts of scripts.", projects: ['Avero', 'Nexus'] },
      { name: 'NVIDIA NIM', status: 'EXPLORING', desc: "Trying this out for running local models when I want to see how they work under the hood.", projects: ['Homelab'] },
      { name: 'LM Studio', status: 'EXPLORING', desc: "I use this to mess around with local AI models without paying for API calls.", projects: ['Homelab'] },
    ]
  }
];

export const Skills = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSkill(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Section id="skills" className="bg-[#1C1C20] overflow-hidden">
      {/* Subtle top transition gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#111113] to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs tracking-widest text-[#A855F7] uppercase">The Toolkit</span>
            <div className="h-px w-12 bg-[#A855F7]/30" />
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F5F5] leading-[1.1] tracking-tight mb-6">
            The things I <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#D8B4FE]">build with.</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#94949F] leading-relaxed max-w-2xl">
            I'm definitely not an expert in all of these. Most of this I picked up by vibe coding and just trying to make things work. But here's what I actually use.
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {SKILL_CATEGORIES.map((category, index) => {
             const activeSkillData = category.skills.find(s => s.name === activeSkill);

             return (
               <motion.div 
                 key={category.name}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ delay: index * 0.1 }}
                 className="relative"
               >
                 <h3 className="font-mono text-xs tracking-widest text-[#94949F] uppercase mb-6 flex items-center gap-3">
                    <span className="text-[#A855F7] opacity-80">
                      {category.icon}
                    </span>
                    {category.name}
                 </h3>
                 
                 <div className="flex flex-wrap gap-3 mb-6">
                   {category.skills.map(skill => {
                     const isSelected = activeSkill === skill.name;
                     return (
                       <button
                         key={skill.name}
                         onClick={() => setActiveSkill(isSelected ? null : skill.name)}
                         className={`
                           px-5 py-3 rounded-xl border text-sm sm:text-base font-medium transition-all duration-300
                           ${isSelected 
                             ? 'bg-[#292930] border-[#9333EA]/50 text-white shadow-[0_0_20px_rgba(147,51,234,0.15)] -translate-y-1' 
                             : 'bg-[#161618] border-white/5 text-[#C4C4CA] hover:bg-[#222228] hover:border-white/10 hover:text-white'}
                         `}
                       >
                         {skill.name}
                       </button>
                     );
                   })}
                 </div>

                 <AnimatePresence mode="wait">
                   {activeSkillData && (
                     <motion.div
                       key={activeSkillData.name}
                       initial={{ height: 0, opacity: 0, y: -10 }}
                       animate={{ height: 'auto', opacity: 1, y: 0 }}
                       exit={{ height: 0, opacity: 0, y: -10 }}
                       transition={{ duration: 0.2 }}
                       className="overflow-hidden"
                     >
                       <div className="mt-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#222228] to-[#161618] border border-[#9333EA]/20 relative shadow-2xl">
                         <div className="absolute top-0 left-0 w-1 h-full bg-[#A855F7] rounded-l-2xl shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                         
                         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8 relative z-10">
                           <div className="max-w-2xl">
                             <div className="flex flex-wrap items-center gap-4 mb-6">
                               <h4 className="font-display text-2xl font-bold text-white uppercase tracking-wide">{activeSkillData.name}</h4>
                               <span className="px-3 py-1 rounded-full bg-[#9333EA]/10 border border-[#9333EA]/30 text-[10px] font-mono tracking-widest text-[#D8B4FE] uppercase">
                                 {activeSkillData.status}
                               </span>
                             </div>
                             
                             <div className="mb-3 flex items-center gap-2">
                               <p className="font-mono text-xs text-[#A855F7] uppercase tracking-widest">What I used it for</p>
                             </div>
                             
                             <p className="text-[#C4C4CA] leading-relaxed text-base sm:text-lg">
                               {activeSkillData.desc}
                             </p>
                           </div>

                           {activeSkillData.projects.length > 0 && (
                             <div className="shrink-0 sm:text-right border-t border-white/10 sm:border-t-0 pt-6 sm:pt-0">
                               <p className="font-mono text-xs text-[#94949F] uppercase tracking-widest mb-3">Context</p>
                               <div className="flex flex-wrap sm:justify-end gap-2">
                                 {activeSkillData.projects.map(p => (
                                   <span key={p} className="px-3 py-1.5 rounded-lg bg-[#111113] border border-white/5 text-xs text-[#E4E4E5] shadow-inner">
                                     {category.name} → {p}
                                   </span>
                                 ))}
                               </div>
                             </div>
                           )}
                         </div>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.div>
             );
          })}
        </div>
      </div>
    </Section>
  );
};
