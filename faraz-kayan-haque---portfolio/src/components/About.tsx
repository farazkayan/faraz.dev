
import { motion } from 'motion/react';
import { Section } from './Section';
import { Sparkles, Terminal, Wrench, Search, CheckCircle, Lightbulb, RefreshCw, Briefcase, TrendingUp } from 'lucide-react';

const BUILD_LOOP = [
  { id: 'break', label: 'Break', icon: <Terminal size={18} />, desc: 'Try something until it inevitably breaks.' },
  { id: 'investigate', label: 'Investigate', icon: <Search size={18} />, desc: 'Ask Claude or check docs to see what went wrong.' },
  { id: 'fix', label: 'Fix', icon: <Wrench size={18} />, desc: 'Actually fix it.' },
  { id: 'learn', label: 'Learn', icon: <Lightbulb size={18} />, desc: 'Figure out why it broke in the first place.' },
  { id: 'improve', label: 'Improve', icon: <RefreshCw size={18} />, desc: 'Try not to do that again.' }
];

export const About = () => {
  return (
    <Section id="about" className="bg-[#161618] overflow-hidden">
      {/* Subtle top transition gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#111113] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 py-24">
        
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs tracking-widest text-[#A855F7] uppercase">How this started</span>
            <div className="h-px flex-1 max-w-[100px] bg-[#A855F7]/30" />
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F5F5] leading-[1.1] tracking-tight mb-8">
            I see something that doesn't exist, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#D8B4FE]">and I decide to build it.</span>
          </h2>
          
          <div className="space-y-6 text-xl text-[#C4C4CA] leading-relaxed font-light">
            <p>
              I didn't get into tech with some crazy master plan. Honestly, something about it just naturally attracts me. It's incredibly satisfying to take a random idea, figure out the pieces, and watch it actually work.
            </p>
            <p>
              I'm learning Python in school, but most of my real learning happens when I'm just messing around. If I need something to make my life faster, I'll build it. If I realize I can run my own server, I'll try it. I basically learn by building.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* How I Build (The Loop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-8 p-8 sm:p-12 rounded-[2rem] bg-[#1C1C20] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A855F7]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#A855F7]/10 transition-colors duration-700 pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="font-display text-2xl font-bold text-[#F5F5F5] mb-4">How I Build & Learn</h3>
              <p className="text-[#94949F] text-lg leading-relaxed mb-10 max-w-xl">
                I use AI a lot when I build. I'm not going to pretend I don't. It doesn't write everything for me, but it's a huge part of how I experiment, figure things out, and fix stuff when it breaks. Here is basically how it goes:
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden sm:block absolute top-6 left-6 right-6 h-px bg-white/10 z-0" />
                
                {BUILD_LOOP.map((step, i) => (
                  <div key={step.id} className="relative z-10 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3 group/step">
                    <div className="w-12 h-12 rounded-2xl bg-[#161618] border border-white/10 flex items-center justify-center text-[#94949F] group-hover/step:text-[#A855F7] group-hover/step:border-[#A855F7]/30 group-hover/step:bg-[#222228] transition-all shadow-sm shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-[#E4E4E5] font-semibold text-sm sm:text-base sm:mb-1">{step.label}</h4>
                      <p className="text-[#71717A] text-xs sm:text-sm max-w-[120px] hidden sm:block">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Where I'm Going */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 p-8 sm:p-10 rounded-[2rem] bg-gradient-to-br from-[#222228] to-[#1C1C20] border border-white/5 relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute -right-6 -bottom-6 text-[#A855F7]/5 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700 pointer-events-none">
              <TrendingUp size={180} strokeWidth={1} />
            </div>
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-[#161618] border border-white/5 mb-6 text-[#A855F7] shadow-lg w-fit">
                <Briefcase size={20} />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F5F5F5] mb-4">Where I'm going</h3>
              <p className="text-[#94949F] text-lg leading-relaxed flex-1">
                I eventually want to build businesses. Technology isn't just something I want to study—it's something I want to actually use to build things people want. I don't have it all figured out yet, but growing with the tech feels like the right direction. 
              </p>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[#C4C4CA] italic font-medium">
                  "Technology is the future. You should grow with the tech."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};
