import { motion } from 'motion/react';
import { Section } from './Section';
import { GraduationCap, ArrowDown } from 'lucide-react';
import mastermindLogo from '../../assets/education/mastermind.svg';
import yaleLogo from '../../assets/education/yale.svg';

export const Education = () => {
  return (
    <Section id="education" className="bg-[#111113] overflow-hidden">
      {/* Subtle top transition gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#161618] to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 py-24">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-[#3B82F6] uppercase">Academic Journey</span>
          <div className="h-px flex-1 max-w-[100px] bg-[#3B82F6]/30" />
        </motion.div>

        <div className="relative">
          
          {/* Vertical Timeline Line */}
          <div className="absolute left-[39px] sm:left-[49px] top-12 bottom-12 w-px bg-gradient-to-b from-white/5 via-[#3B82F6]/30 to-[#3B82F6] hidden md:block" />

          <div className="space-y-12">
            
            {/* Yale International School (Past) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative flex flex-col md:flex-row gap-6 md:gap-12 group"
            >
              <div className="md:w-32 shrink-0 md:text-right pt-4">
                <span className="font-mono text-sm text-[#94949F] bg-[#161618] border border-white/5 px-3 py-1.5 rounded-full md:border-none md:bg-transparent md:p-0">2015 — 2024</span>
              </div>
              
              <div className="flex-1 bg-[#1C1C20] border border-white/5 rounded-[2rem] p-6 sm:p-8 flex items-start gap-6 relative overflow-hidden transition-colors hover:border-white/10">
                {/* Logo */}
                <div className="w-16 h-16 rounded-2xl bg-[#F4F4F5] border border-white/20 shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={yaleLogo} alt="Yale International School Logo" className="w-full h-full object-contain" />
                </div>
                
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#C4C4CA] group-hover:text-[#F5F5F5] transition-colors mb-2">Yale International School</h3>
                  <p className="text-[#94949F] text-sm sm:text-base leading-relaxed">
                    Nine years of early education. Basically where I figured out how to learn.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mobile Arrow Connector */}
            <div className="md:hidden flex justify-center py-2 text-[#3B82F6]/50">
              <ArrowDown size={24} />
            </div>

            {/* Mastermind English Medium School (Current) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="relative flex flex-col md:flex-row gap-6 md:gap-12 group"
            >
              <div className="md:w-32 shrink-0 md:text-right pt-4">
                <span className="font-mono text-sm text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3 py-1.5 rounded-full md:border-none md:bg-transparent md:p-0 font-medium">2024 — Present</span>
              </div>
              
              <div className="flex-1 bg-[#1C1C20] border border-[#3B82F6]/30 rounded-[2rem] p-6 sm:p-8 flex items-start gap-6 relative overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.05)] ring-1 ring-[#3B82F6]/10">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#3B82F6]" />
                
                {/* Logo */}
                <div className="w-16 h-16 rounded-2xl bg-[#F4F4F5] border border-white/20 shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={mastermindLogo} alt="Mastermind English Medium School Logo" className="w-full h-full object-contain" />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Mastermind English Medium School</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-semibold uppercase tracking-wider mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                    Current Student
                  </div>
                  <p className="text-[#94949F] text-sm sm:text-base leading-relaxed">
                    Where I'm at right now. Learning Python for class, and spending the rest of my time on projects and homelab stuff.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </Section>
  );
};
