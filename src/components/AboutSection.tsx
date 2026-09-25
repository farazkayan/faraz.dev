import React from 'react';
import { motion } from 'motion/react';

interface BuildStep {
  num: string;
  title: string;
  description: string;
}

const buildSteps: BuildStep[] = [
  {
    num: '01',
    title: 'Break',
    description: 'Try something until it inevitably breaks.',
  },
  {
    num: '02',
    title: 'Investigate',
    description: 'Ask Claude or check docs to see what went wrong.',
  },
  {
    num: '03',
    title: 'Fix',
    description: 'Actually fix it.',
  },
  {
    num: '04',
    title: 'Learn',
    description: 'Figure out why it broke in the first place.',
  },
  {
    num: '05',
    title: 'Improve',
    description: 'Try not to do that again.',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <div className="border-t border-zinc-900/60">
      {/* ========================================================
          ABOUT: CLEAN, UNCLUTTERED VIEWPORT COMPOSITION
          Tone: Soft Violet / Muted Warmth
          ======================================================== */}
      <section
        id="about"
        className="scroll-mt-20 relative min-h-0 sm:min-h-[90svh] xl:h-[100svh] xl:max-h-[1080px] flex flex-col justify-between py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full select-none overflow-hidden"
      >
        {/* Subtle Destination Atmosphere: Warm Violet */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(192,132,252,0.035)_0%,transparent_65%)]"
        />
        {/* ----------------------------------------------------
            01 / HOW THIS STARTED
            Clean statement (Left) + Personal story (Right)
            ---------------------------------------------------- */}
        <div className="py-2 sm:my-auto">
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 mb-3 sm:mb-4">
            <span className="text-purple-400 font-semibold">01</span>
            <span className="text-zinc-700">/</span>
            <span className="uppercase tracking-widest text-zinc-400">How this started</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-medium tracking-tight text-white font-display leading-[1.2] sm:leading-[1.18]">
                I see something that doesn’t exist, and I decide to build it.
              </h2>
            </div>

            <div className="lg:col-span-6 space-y-3 text-xs sm:text-[13.5px] leading-relaxed text-zinc-400 font-normal">
              <p>
                I didn’t get into tech with some crazy master plan. Honestly, something
                about it just naturally attracts me. It’s incredibly satisfying to take a
                random idea, figure out the pieces, and watch it actually work.
              </p>
              <p>
                I’m learning Python in school, but most of my real learning happens when
                I’m just messing around. If I need something to make my life faster, I’ll
                build it. If I realize I can run my own server, I’ll try it. I basically
                learn by building.
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------
            02 / HOW I BUILD & LEARN
            Clean vertical sequence on mobile, 5-card row on desktop
            ---------------------------------------------------- */}
        <div className="py-6 sm:py-3 sm:my-auto border-t border-zinc-900/60 sm:border-none">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="text-purple-400 font-semibold">02</span>
              <span className="text-zinc-700">/</span>
              <span className="uppercase tracking-widest text-zinc-400">How I build &amp; learn</span>
            </div>
            <span className="text-purple-300/80 font-mono text-[11px]">
              the feedback loop
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {buildSteps.map((step) => (
              <motion.div
                key={step.num}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="group rounded-xl p-3.5 sm:p-4.5 bg-[#0c0c0e]/80 border border-zinc-800/80 hover:border-purple-500/40 hover:bg-[#0e0d14] transition-all duration-200 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between sm:block">
                    <span className="text-xs font-mono text-zinc-500 group-hover:text-purple-400 transition-colors font-medium">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 sm:hidden">step</span>
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-medium font-display text-white mt-1 mb-0.5 sm:mt-1.5 sm:mb-1 group-hover:text-purple-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------
            03 / WHERE I'M GOING + CLOSING THOUGHT
            Quiet paragraph (Left) + Minimal quote (Right)
            ---------------------------------------------------- */}
        <div className="py-2 pt-5 sm:pt-4 border-t border-zinc-900/80 sm:my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                <span className="text-purple-400 font-semibold">03</span>
                <span className="text-zinc-700">/</span>
                <span className="uppercase tracking-widest text-zinc-400">Where I’m going</span>
              </div>

              <p className="text-xs sm:text-[13.5px] text-zinc-400 font-normal leading-relaxed max-w-xl">
                I eventually want to build businesses. Technology isn’t just something I
                want to study—it’s something I want to actually use to build things people
                want. I don’t have it all figured out yet, but growing with the tech feels
                like the right direction.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center lg:items-end">
              <div className="border-l-2 border-purple-500/60 pl-4 py-1.5 max-w-md bg-purple-950/10 rounded-r-lg">
                <p className="text-xs sm:text-[13.5px] font-display font-medium text-zinc-200 leading-relaxed italic">
                  &ldquo;Technology is the future. You should grow with the tech.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ACADEMIC JOURNEY: CLEAN, UNCLUTTERED VIEWPORT
          Tone: Restrained Cool Blue
          ======================================================== */}
      <section
        id="education"
        className="scroll-mt-20 relative min-h-0 sm:min-h-[90svh] xl:h-[100svh] xl:max-h-[1080px] flex flex-col justify-between py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full select-none overflow-hidden"
      >
        {/* Subtle Destination Atmosphere: Cool Blue */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.035)_0%,transparent_65%)]"
        />
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="text-sky-400 font-semibold">02</span>
              <span className="text-zinc-700">/</span>
              <span className="uppercase tracking-widest text-zinc-300">Education</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              Dhaka, Bangladesh
            </span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-medium tracking-tight text-white font-display">
            Academic Journey
          </h2>
        </div>

        {/* Timeline Progression & Cards */}
        <div className="py-4 sm:my-auto space-y-6">
          {/* Desktop Horizontal Timeline Header with Cool Blue Progression */}
          <div className="hidden md:flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
            <span className="text-zinc-400">2015</span>
            <div className="flex-1 mx-4 h-[1px] bg-gradient-to-r from-zinc-800 via-sky-500/30 to-sky-500/60" />
            <span className="text-sky-400">2024</span>
            <div className="flex-1 mx-4 h-[1px] bg-gradient-to-r from-sky-500/60 to-emerald-500/60" />
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Present
            </span>
          </div>

          {/* Mobile Vertical Timeline Indicator */}
          <div className="md:hidden flex items-center gap-3 text-xs font-mono text-zinc-400 pb-1">
            <span className="text-sky-400/90 font-medium">Timeline</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-sky-500/40 via-emerald-500/40 to-transparent" />
            <span className="text-emerald-400 text-[11px]">2015 → Present</span>
          </div>

          {/* Two Clean School Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            {/* Yale International School */}
            <div className="group rounded-2xl bg-[#0c0c0e]/80 border border-zinc-800/80 p-5 sm:p-7 flex flex-col justify-between hover:border-sky-500/40 hover:bg-[#0c0d12] transition-all duration-200 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  {/* Yale Logo with Light Background */}
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-white p-1.5 sm:p-2 flex items-center justify-center shadow-md shrink-0 border border-zinc-200/80">
                    <img
                      src="/yale.svg"
                      alt="Yale International School Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono text-sky-300/90 bg-sky-950/40 border border-sky-500/30 px-2.5 py-1 rounded-full">
                    2015 — 2024
                  </span>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-medium tracking-tight text-white font-display group-hover:text-sky-200 transition-colors">
                    Yale International School
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-zinc-400 leading-relaxed font-normal">
                    Nine years of early education. Basically where I figured out how to learn.
                  </p>
                </div>
              </div>

              <div className="pt-4 sm:pt-5 mt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500 flex items-center justify-between">
                <span>Foundation</span>
                <span className="text-sky-400/80">9 years</span>
              </div>
            </div>

            {/* Mastermind English Medium School */}
            <div className="group rounded-2xl bg-[#0c0c0e]/90 border border-zinc-700/80 p-5 sm:p-7 flex flex-col justify-between hover:border-sky-500/50 hover:bg-[#0c0e14] transition-all duration-200 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  {/* Mastermind Logo with Light Background */}
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-white p-1.5 sm:p-2 flex items-center justify-center shadow-md shrink-0 border border-zinc-200/80">
                    <img
                      src="/mastermind.svg"
                      alt="Mastermind English Medium School Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Current Student</span>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-medium tracking-tight text-white font-display group-hover:text-sky-200 transition-colors">
                    Mastermind English Medium School
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-zinc-300 leading-relaxed font-normal">
                    Where I’m at right now. Learning Python for class, and spending the rest
                    of my time on projects and homelab stuff.
                  </p>
                </div>
              </div>

              <div className="pt-4 sm:pt-5 mt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-sky-400/90 font-medium">2024 — Present</span>
                <span className="text-zinc-500">Python &amp; Homelab</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Footer Note */}
        <div className="text-xs font-mono text-zinc-600 flex items-center gap-2 pt-2">
          <span>academic progression</span>
          <span className="text-zinc-700">·</span>
          <span className="text-sky-400/70">then → now</span>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
