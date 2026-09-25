import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  whatItIs: string;
  whyIRunIt: string;
  whatItTaughtMe: string;
}

const services: ServiceItem[] = [
  {
    id: 'jellyfin',
    name: 'Jellyfin',
    category: 'MEDIA',
    whatItIs:
      'A free, open-source media system that puts you in control of managing and streaming your media.',
    whyIRunIt:
      'Because I wanted to stop paying for multiple streaming services and wanted full ownership of my media library.',
    whatItTaughtMe:
      'Media encoding, hardware acceleration (GPU passthrough in Docker), and bandwidth management.',
  },
  {
    id: 'immich',
    name: 'Immich',
    category: 'PHOTOS / MEMORIES',
    whatItIs:
      'A high-performance self-hosted photo and video backup solution with local machine-learning facial recognition and reverse geocoding.',
    whyIRunIt:
      'Because I wanted full ownership and privacy for my personal photos and memories without paying recurring cloud storage subscription fees.',
    whatItTaughtMe:
      'Managing multi-container microservice stacks (PostgreSQL with pgvector, Redis, machine-learning workers), database migrations, and persistent background synchronization.',
  },
  {
    id: 'pihole',
    name: 'Pi-hole',
    category: 'NETWORK',
    whatItIs:
      'A network-wide DNS sinkhole that blocks advertisements and tracking domains before they ever reach devices on the local network.',
    whyIRunIt:
      'To protect every phone, laptop, and device on the home network from ad trackers without needing to install browser extensions on each individual machine.',
    whatItTaughtMe:
      'DNS query resolution, local upstream routing, DHCP configuration, regex domain blocking rules, and network perimeter hygiene.',
  },
  {
    id: 'nextcloud',
    name: 'Nextcloud',
    category: 'FILES',
    whatItIs:
      'A self-hosted productivity and private cloud storage platform providing synchronized file storage, calendar, and contacts across devices.',
    whyIRunIt:
      'To have a truly private personal cloud drive accessible from my laptop and phone without trusting third-party cloud storage providers with sensitive files.',
    whatItTaughtMe:
      'WebDAV protocol behavior, PHP-FPM performance tuning, database indexing for large file trees, and Redis caching for file-locking concurrency.',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    category: 'GAMES',
    whatItIs:
      'A dedicated self-hosted Paper/Fabric Minecraft server running in an isolated container with automated world backups.',
    whyIRunIt:
      'So friends and I could play together in a persistent multiplayer world without paying monthly rental host fees or dealing with performance throttling.',
    whatItTaughtMe:
      'JVM memory allocation flags, garbage collection tuning (Aikar flags), server tick-rate profiling, and automated cron world backup scripts.',
  },
];

export const HomelabSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('jellyfin');

  const selectedService =
    services.find((s) => s.id === selectedId) || services[0];

  return (
    <section
      id="homelab"
      className="scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-4xl mx-auto w-full select-none relative overflow-hidden"
    >
      {/* Subtle Destination Atmosphere: Technical Green */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.03)_0%,transparent_65%)]"
      />
      <div className="space-y-8 sm:space-y-12">
        {/* Header & Intro - Tone: Quiet System-Status Green */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 border-b border-zinc-900 pb-3">
            <span className="text-emerald-400 font-semibold">05</span>
            <span className="text-zinc-700">/</span>
            <span className="uppercase tracking-widest text-zinc-300 font-medium">
              Infrastructure
            </span>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-medium tracking-tight text-white font-display">
              Things I actually run.
            </h2>

            <div className="space-y-2 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-2xl">
              <p>
                I didn’t learn Linux and Docker to get a certificate. I learned them because self-hosting is
                incredibly useful, and honestly, it’s just cool.
              </p>
              <p className="text-zinc-400">
                I got curious, installed something, broke something, fixed it, and then somehow ended up running
                half my own infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================
            MINIMAL INFRASTRUCTURE FLOW
            Quiet, monochrome infrastructure sketch with system-status green accents
            ==================================================== */}
        <div className="space-y-5 sm:space-y-6 pt-1 sm:pt-2">
          {/* Top Nodes: Linux Server -> Docker Engine */}
          <div className="flex flex-col items-center">
            {/* Linux Server (CasaOS) Node */}
            <div className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg bg-zinc-950/90 border border-zinc-800 text-xs font-mono text-zinc-200 shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shrink-0" />
              <span>Linux Server</span>
              <span className="text-zinc-500 text-[11px]">(CasaOS)</span>
            </div>

            {/* Connecting line */}
            <div className="w-[1px] h-5 sm:h-6 bg-zinc-800" />
            <div className="text-[9px] sm:text-[10px] text-zinc-600 -my-1">▼</div>

            {/* Docker Engine Node */}
            <div className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg bg-zinc-950/90 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-sm mt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shrink-0" />
              <span>Docker Engine</span>
            </div>

            {/* Connecting line to horizontal branch */}
            <div className="w-[1px] h-5 sm:h-6 bg-zinc-800" />
          </div>

          {/* Desktop Horizontal Tree */}
          <div className="hidden md:block relative">
            {/* Horizontal Branch Line */}
            <div className="w-full h-[1px] bg-zinc-800 relative">
              <div className="absolute left-1/2 -top-1 w-[1px] h-2 bg-zinc-800" />
            </div>

            {/* Service Buttons on the Tree */}
            <div className="grid grid-cols-5 gap-3 pt-3">
              {services.map((service) => {
                const isSelected = service.id === selectedService.id;
                return (
                  <div key={service.id} className="flex flex-col items-center">
                    {/* Tiny connector down */}
                    <div className="w-[1px] h-3 bg-zinc-800 -mt-3 mb-1" />
                    <div className="text-[9px] text-zinc-700 -mt-1.5 mb-1">▼</div>

                    <button
                      onClick={() => setSelectedId(service.id)}
                      className={`
                        w-full py-2.5 px-2 rounded-lg text-center font-mono text-xs transition-all duration-150 cursor-pointer outline-none min-h-[44px]
                        ${
                          isSelected
                            ? 'bg-zinc-900 border border-emerald-500/60 text-white shadow-sm ring-1 ring-emerald-500/20 font-medium'
                            : 'bg-zinc-950/60 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/40'
                        }
                      `}
                      aria-label={`Select ${service.name}`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                        )}
                        <span className="truncate">{service.name}</span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Flow View: Clean Vertical arrangement */}
          <div className="md:hidden space-y-2 pt-1">
            <div className="text-center text-[11px] font-mono text-zinc-500 mb-2">▼ Active Services</div>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
              {services.map((service) => {
                const isSelected = service.id === selectedService.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedId(service.id)}
                    className={`
                      py-3 px-3.5 rounded-xl text-left font-mono text-xs transition-all duration-150 cursor-pointer outline-none flex items-center justify-between min-h-[44px] touch-manipulation
                      ${
                        isSelected
                          ? 'bg-zinc-900 border border-emerald-500/60 text-white shadow-sm ring-1 ring-emerald-500/20 font-medium'
                          : 'bg-zinc-950/70 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                      }
                    `}
                  >
                    <span className="truncate font-medium">{service.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 uppercase">{service.category}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ====================================================
            SELECTED SERVICE DETAIL
            The ONLY detail card on the page.
            ==================================================== */}
        <div className="pt-1 sm:pt-2">
          <div className="rounded-2xl bg-[#0c0c0e]/95 border border-zinc-800/90 p-5 sm:p-8 shadow-[0_12px_35px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3 sm:pb-4">
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white font-display">
                    {selectedService.name}
                  </h3>
                  <span className="text-[10.5px] sm:text-[11px] font-mono tracking-widest text-emerald-400 font-semibold uppercase">
                    {selectedService.category}
                  </span>
                </div>

                {/* WHAT IT IS */}
                <div className="space-y-1 sm:space-y-1.5">
                  <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-500 block font-semibold">
                    What It Is
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {selectedService.whatItIs}
                  </p>
                </div>

                {/* WHY I RUN IT */}
                <div className="space-y-1 sm:space-y-1.5 pt-3 sm:pt-4 border-t border-zinc-900/80">
                  <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-500 block font-semibold">
                    Why I Run It
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {selectedService.whyIRunIt}
                  </p>
                </div>

                {/* WHAT IT TAUGHT ME */}
                <div className="space-y-1 sm:space-y-1.5 pt-3 sm:pt-4 border-t border-zinc-900/80">
                  <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-500 block font-semibold">
                    What It Taught Me
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {selectedService.whatItTaughtMe}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomelabSection;
