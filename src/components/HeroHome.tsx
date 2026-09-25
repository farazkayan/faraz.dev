import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowUpRight, Terminal } from 'lucide-react';

export const HeroHome: React.FC = () => {
  // Easter egg: rotating authentic thought fragments on subtle prompt click
  const thoughtSnippets = [
    'usually starts with "I wonder if..."',
    'idea → build → break → fix',
    'probably making another side quest',
    'self-hosting because it’s cool',
    'I don’t know what I’ll build next either',
  ];

  const [thoughtIndex, setThoughtIndex] = useState(0);

  const handleNextThought = () => {
    setThoughtIndex((prev) => (prev + 1) % thoughtSnippets.length);
  };

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      const navHeight = 75;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
      window.history.replaceState(null, '', '#about');
    }
  };

  return (
    <section
      id="home"
      className="scroll-mt-28 relative min-h-[92svh] flex flex-col justify-between pt-24 xs:pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto w-full select-none"
    >
      {/* Editorial Main Canvas with Asymmetrical Rhythm */}
      <div className="my-auto py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-6 sm:space-y-8"
        >
          {/* Subtle Terminal-Inspired Prompt & Identity Anchor (Visual Anchor + Micro-Interaction) */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleNextThought}
              type="button"
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-purple-500/40 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer shadow-sm outline-none focus:ring-1 focus:ring-purple-500/40 touch-manipulation"
              title="Click to cycle thoughts"
            >
              <Terminal className="w-3.5 h-3.5 text-purple-400/90 group-hover:text-purple-300 transition-colors shrink-0" />
              <span className="text-zinc-500 font-medium">faraz@dhaka:~$</span>
              <span className="text-zinc-300">builder</span>
              <span className="w-1.5 h-3 bg-purple-400/80 inline-block animate-pulse ml-0.5" />
            </button>

            {/* Subtle cycling thought snippet */}
            <div
              onClick={handleNextThought}
              className="cursor-pointer text-[11px] sm:text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors py-1 flex items-center gap-1.5 group select-none touch-manipulation"
              title="Click for next note"
            >
              <span className="text-zinc-700 hidden xs:inline">/</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={thoughtIndex}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.18 }}
                  className="text-zinc-400 group-hover:text-purple-300 transition-colors"
                >
                  {thoughtSnippets[thoughtIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Primary Name & Core Philosophy */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white font-display leading-[1.08] break-words">
              Faraz Kayan Haque
            </h1>

            <div className="border-l-2 border-purple-500/50 pl-3.5 sm:pl-4 py-0.5">
              <p className="text-base xs:text-lg sm:text-xl lg:text-[22px] text-zinc-200 font-display font-medium tracking-tight leading-snug">
                I see something that doesn’t exist, and I decide to build it.
              </p>
            </div>
          </div>

          {/* Natural, Personal Voice Body Copy */}
          <div className="space-y-3 text-xs xs:text-sm sm:text-[14.5px] text-zinc-400 font-normal leading-relaxed max-w-2xl">
            <p>
              I’m a student who likes building things from the ground up. Most of
              my real learning happens when I’m experimenting — writing code,
              running a homelab because self-hosting is cool, and solving everyday
              problems when existing tools feel clunky.
            </p>
          </div>

          {/* Personal Signal Detail: Way of Building + Direct Links */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400 border-t border-zinc-900/80">
            {/* Subtle personal loop */}
            <div className="flex items-center gap-2 text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400/90 shadow-[0_0_8px_rgba(192,132,252,0.6)] shrink-0" />
              <span className="text-zinc-300">idea → build → break → fix</span>
            </div>

            {/* Quiet Say Hello Link */}
            <a
              href="mailto:farazkayanhaque.official@gmail.com"
              className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group py-1 touch-manipulation w-fit"
            >
              <span>say hello</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-zinc-500 group-hover:text-zinc-300" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Quiet Continuation Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        className="pt-6 sm:pt-8 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-zinc-500 border-t border-zinc-900/80"
      >
        <span className="text-zinc-600 text-[11px] sm:text-xs">
          Dhaka, Bangladesh · 2026
        </span>

        {/* Directional Scroll Prompt */}
        <a
          href="#about"
          onClick={scrollToAbout}
          className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer py-1 touch-manipulation"
        >
          <span>there’s more</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-zinc-500 group-hover:text-purple-400" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroHome;
