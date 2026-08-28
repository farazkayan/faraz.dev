import { motion } from 'motion/react';
import { Section } from './Section';
import { Cat, Camera, Gamepad2, Compass, Tv } from 'lucide-react';

export const Hobbies = () => {
  return (
    <Section id="hobbies" className="bg-[#111113] overflow-hidden relative">
      {/* Subtle top transition gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#161618] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 py-24">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs tracking-widest text-[#A855F7] uppercase">Outside the Screen</span>
            <div className="h-px flex-1 max-w-[100px] bg-[#A855F7]/30" />
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F5F5] leading-[1.1] tracking-tight">
            When I'm not building something.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          {/* SUPPORTING: Cats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-7 bg-[#1C1C20] border border-white/5 rounded-[2rem] p-8 sm:p-12 flex flex-col justify-between group transition-all hover:border-[#F97316]/30 min-h-[300px] relative overflow-hidden shadow-xl"
          >
            <div className="absolute -bottom-10 -right-10 text-[#F97316]/5 group-hover:text-[#F97316]/10 transition-colors pointer-events-none">
              <Cat size={200} />
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-[#F97316] mb-6 group-hover:scale-110 transition-transform">
                <Cat size={24} />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">Cats</h3>
              <p className="text-xl text-[#C4C4CA] leading-relaxed max-w-md font-light">
                I love cats. That's basically the whole explanation.
              </p>
            </div>
          </motion.div>

          {/* SUPPORTING: Photography */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5 bg-[#1C1C20] border border-white/5 rounded-[2rem] p-8 sm:p-12 flex flex-col justify-between group transition-all hover:border-[#3B82F6]/30 min-h-[300px] relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#3B82F6]/10 transition-colors" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] mb-6 group-hover:scale-110 transition-transform">
                <Camera size={24} />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">Photography</h3>
              <p className="text-[#94949F] text-lg leading-relaxed font-light">
                Taking pictures of things and capturing moments that just feel right.
              </p>
            </div>
          </motion.div>

          {/* SMALLER INTERESTS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bg-[#161618] border border-white/5 rounded-3xl p-8 group hover:border-[#10B981]/30 transition-colors shadow-lg"
          >
            <div className="w-10 h-10 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-6 group-hover:scale-110 transition-transform origin-left">
              <Gamepad2 size={20} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Gaming</h3>
            <p className="text-[#94949F] leading-relaxed text-sm">
              Chill and indie games to unwind. Stray, Stardew Valley, Minecraft. No competitive stress.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 bg-[#161618] border border-white/5 rounded-3xl p-8 group hover:border-[#EC4899]/30 transition-colors shadow-lg"
          >
            <div className="w-10 h-10 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 flex items-center justify-center text-[#EC4899] mb-6 group-hover:scale-110 transition-transform origin-left">
              <Tv size={20} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Anime</h3>
            <p className="text-[#94949F] leading-relaxed text-sm">
              Great stories and beautiful animation. Just a nice way to disconnect from the terminal.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4 }}
            className="md:col-span-4 bg-gradient-to-br from-[#1C1C20] to-[#161618] border border-white/5 rounded-3xl p-8 group hover:border-[#A855F7]/30 transition-colors relative overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0 bg-[#A855F7]/0 group-hover:bg-[#A855F7]/5 transition-colors pointer-events-none" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center text-[#A855F7] mb-6 group-hover:rotate-45 transition-transform origin-center">
                <Compass size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Side Quests</h3>
              <p className="text-[#94949F] leading-relaxed text-sm italic">
                "That sounds cool. I have the time and tools. Why not?"
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};
