import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from './Section';
import { Server, Database, Cloud, Shield, HardDrive, Gamepad2, Tv, Camera, Network, Terminal, ChevronRight, X } from 'lucide-react';

type ServiceInfo = {
  id: string;
  name: string;
  category: string;
  icon: ReactNode;
  what: string;
  why: string;
  taught: string;
  color: string;
};

const SERVICES: ServiceInfo[] = [
  {
    id: 'jellyfin',
    name: 'Jellyfin',
    category: 'Media',
    icon: <Tv size={20} />,
    what: 'A free, open-source media system that puts you in control of managing and streaming your media.',
    why: 'Because I wanted to stop paying for multiple streaming services and wanted full ownership of my media library.',
    taught: 'Media encoding, hardware acceleration (GPU passthrough in Docker), and bandwidth management.',
    color: '#A855F7' // purple
  },
  {
    id: 'immich',
    name: 'Immich',
    category: 'Photos',
    icon: <Camera size={20} />,
    what: 'A high performance, self-hosted photo and video backup solution.',
    why: 'To escape cloud storage limits and privacy concerns while keeping a seamless mobile backup experience.',
    taught: 'PostgreSQL databases, machine learning containers (for face/object detection), and volume backups.',
    color: '#3B82F6' // blue
  },
  {
    id: 'pihole',
    name: 'Pi-hole',
    category: 'Networking',
    icon: <Shield size={20} />,
    what: 'A DNS sinkhole that protects devices from unwanted content without installing any client-side software.',
    why: 'To block ads and trackers at the network level for every device in my house automatically.',
    taught: 'DNS protocols, DHCP, network routing, and how much telemetry smart devices actually send.',
    color: '#EF4444' // red
  },
  {
    id: 'nextcloud',
    name: 'Nextcloud',
    category: 'Cloud',
    icon: <Cloud size={20} />,
    what: 'A suite of client-server software for creating and using file hosting services.',
    why: 'To have a private Google Drive alternative for file syncing, calendars, and contacts.',
    taught: 'Reverse proxies, SSL certificates, WebDAV, and PHP application tuning.',
    color: '#06B6D4' // cyan
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    category: 'Games',
    icon: <Gamepad2 size={20} />,
    what: 'Dedicated servers for Minecraft.',
    why: 'To play with friends in a persistent world without paying monthly hosting fees.',
    taught: 'Java memory management, port forwarding, and game server administration.',
    color: '#10B981' // green
  }
];

export const Homelab = () => {
  const [activeService, setActiveService] = useState<ServiceInfo | null>(null);

  return (
    <Section id="homelab" className="bg-[#161618] overflow-hidden">
      {/* Subtle top transition gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#111113] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs tracking-widest text-[#10B981] uppercase">Infrastructure</span>
              <div className="h-px flex-1 max-w-[100px] bg-[#10B981]/30" />
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F5F5] leading-tight mb-6 tracking-tight">
              Things I <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#6EE7B7]">actually run.</span>
            </h2>
            
            <div className="text-lg text-[#94949F] space-y-6 leading-relaxed">
              <p>
                I didn't learn Linux and Docker to get a certificate. I learned them because self-hosting is incredibly useful, and honestly, it's just cool.
              </p>
              <p>
                I got curious, installed something, broke something, fixed it, and then somehow ended up running half my own infrastructure.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <div className="bg-[#1C1C20] border border-white/5 rounded-[2rem] p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#10B981]/5 via-transparent to-transparent pointer-events-none" />
              
              {/* Architecture Diagram */}
              <div className="relative z-10 flex flex-col items-center">
                
                {/* Core Server Node */}
                <div className="flex flex-col items-center mb-8 relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#161618] border border-[#10B981]/30 flex items-center justify-center text-[#10B981] mb-3 shadow-[0_0_30px_rgba(16,185,129,0.15)] z-10">
                    <Server size={28} />
                  </div>
                  <span className="font-mono text-xs text-[#F5F5F5] font-semibold bg-[#292930] px-3 py-1 rounded-full z-10">Linux Server (CasaOS)</span>
                  
                  {/* Connection Line down to Docker */}
                  <div className="w-px h-8 bg-gradient-to-b from-[#10B981]/50 to-white/20 mt-3" />
                </div>

                {/* Docker Node */}
                <div className="flex flex-col items-center mb-10 w-full">
                  <div className="w-12 h-12 rounded-xl bg-[#292930] border border-white/10 flex items-center justify-center text-[#3B82F6] mb-3 z-10 relative">
                    <Database size={20} />
                    {/* Horizontal distribution line */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-px bg-white/20 -z-10 hidden sm:block" />
                  </div>
                  <span className="font-mono text-[10px] text-[#94949F] uppercase tracking-wider bg-[#1C1C20] px-2 z-10">Docker Engine</span>
                </div>

                {/* Services Row */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full relative z-10">
                  {SERVICES.map((service) => (
                    <div key={service.id} className="flex flex-col items-center relative group">
                      {/* Vertical line up to docker dist line */}
                      <div className="w-px h-6 bg-white/10 mb-2 hidden sm:block group-hover:bg-[var(--hover-color)] transition-colors" style={{ '--hover-color': service.color } as any} />
                      
                      <button 
                        onClick={() => setActiveService(service)}
                        className={`w-14 h-14 rounded-2xl bg-[#161618] border flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${activeService?.id === service.id ? 'ring-2 bg-[#292930]' : 'border-white/5 hover:border-white/20'}`}
                        style={{ 
                          color: service.color, 
                          borderColor: activeService?.id === service.id ? service.color : undefined,
                          boxShadow: activeService?.id === service.id ? `0 0 20px ${service.color}40` : undefined
                        }}
                      >
                        {service.icon}
                      </button>
                      <span className="text-xs font-medium text-[#C4C4CA] mt-3 group-hover:text-white transition-colors">{service.name}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Service Detail Panel */}
              <AnimatePresence mode="wait">
                {activeService ? (
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-12 bg-[#161618] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: activeService.color }} />
                    <button 
                      onClick={() => setActiveService(null)}
                      className="absolute top-4 right-4 text-[#94949F] hover:text-white transition-colors p-2"
                    >
                      <X size={16} />
                    </button>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div style={{ color: activeService.color }}>{activeService.icon}</div>
                      <h4 className="text-xl font-bold text-white">{activeService.name}</h4>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#94949F] border border-white/10 px-2 py-0.5 rounded-full bg-white/5">{activeService.category}</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-mono text-[#94949F] uppercase tracking-widest mb-1">What it is</h5>
                        <p className="text-[#E4E4E5] text-sm leading-relaxed">{activeService.what}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-mono text-[#94949F] uppercase tracking-widest mb-1">Why I run it</h5>
                        <p className="text-[#E4E4E5] text-sm leading-relaxed">{activeService.why}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-mono text-[#10B981] uppercase tracking-widest mb-1">What it taught me</h5>
                        <p className="text-[#E4E4E5] text-sm leading-relaxed">{activeService.taught}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-12 h-[240px] flex flex-col items-center justify-center text-[#94949F] border border-dashed border-white/10 rounded-2xl"
                  >
                    <Network size={32} className="mb-4 opacity-50" />
                    <p className="font-mono text-sm uppercase tracking-widest">Select a service to inspect</p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
          
        </div>
      </div>
    </Section>
  );
};
