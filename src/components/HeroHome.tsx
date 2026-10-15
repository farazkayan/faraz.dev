import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';

export const HeroHome: React.FC = () => {
  const scrollTo = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo({
      top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 75),
      behavior: 'smooth',
    });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[92svh] w-full flex-col justify-between overflow-hidden px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[34rem] w-[34rem] rounded-full bg-purple-500/[0.045] blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto my-auto w-full max-w-5xl py-12 sm:py-16"
      >
        <p className="mb-6 flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.15em] text-zinc-500 sm:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          Student · Builder · Dhaka, Bangladesh
        </p>

        <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-[-0.055em] text-white xs:text-6xl sm:text-7xl lg:text-[5.75rem]">
          Faraz Kayan Haque
        </h1>

        <p className="mt-7 max-w-2xl border-l border-purple-400/60 pl-4 font-display text-lg leading-relaxed text-zinc-200 sm:mt-9 sm:pl-5 sm:text-2xl">
          I see something that doesn’t exist, and I decide to build it.
        </p>

        <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:mt-6 sm:text-base">
          I’m a student who learns by making things — useful apps, small tools, and a homelab to tinker with.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10">
          <a
            href="#projects"
            onClick={scrollTo('projects')}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            See my projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="mailto:contact@farazkh.dev"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white"
          >
            Say hello <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>

      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-zinc-900/80 pt-5 text-xs font-mono text-zinc-500">
        <span>Dhaka, Bangladesh · 2026</span>
        <a
          href="#about"
          onClick={scrollTo('about')}
          className="group inline-flex items-center gap-2 py-1 text-zinc-400 transition hover:text-white"
        >
          A little more <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  );
};

export default HeroHome;
