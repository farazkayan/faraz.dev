import { useState } from 'react';
import { motion } from 'motion/react';
import { Section } from './Section';
import { Github, Linkedin, Instagram, Facebook, Copy, ArrowRight, Mail } from 'lucide-react';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "farazkayanhaque.official@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="contact" className="bg-[#09090B] overflow-hidden min-h-[90svh] flex flex-col justify-center relative">
      {/* Subtle top transition gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#111113] to-transparent pointer-events-none" />
      
      {/* Ambient Purple Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-[#9333EA]/10 blur-[150px] rounded-full pointer-events-none translate-y-1/3" />
      
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs tracking-widest text-[#A855F7] uppercase">The End</span>
            <div className="h-px w-12 bg-[#A855F7]/30" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#F5F5F5] leading-[1.1] tracking-tight mb-4">
            I don't know what <br className="hidden sm:block" /> I'll build next.
          </h2>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#D8B4FE] mb-8">
            That's kind of the fun part.
          </h2>
          
          <p className="text-lg sm:text-xl text-[#94949F] mb-16 max-w-lg leading-relaxed">
            Have an idea, want to build something, or just want to say hi? I'm probably interested.
          </p>
          
          {/* Email Interaction */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-20 w-full sm:w-auto">
            <a 
              href={`mailto:${email}`}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-full bg-[#F5F5F5] text-[#111113] font-semibold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(168,85,247,0.2)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Mail size={20} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                Say hello
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-[#F3E8FF] to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <button 
              onClick={handleCopy}
              aria-label="Copy email address"
              className="flex items-center justify-center sm:justify-start gap-3 px-6 py-4 sm:py-5 rounded-full bg-[#1C1C20] border border-white/5 text-[#E4E4E5] font-mono text-sm hover:border-white/10 hover:bg-[#222228] transition-all group"
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">{email}</span>
              {copied ? (
                <span className="text-[#10B981] font-sans font-semibold text-xs bg-[#10B981]/10 px-2 py-0.5 rounded uppercase tracking-wider">Copied!</span>
              ) : (
                <Copy size={16} className="text-[#94949F] group-hover:text-white transition-colors" />
              )}
            </button>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4 flex-wrap">
            {[
              { icon: <Github size={22} />, href: 'https://github.com/farazkayan', label: 'GitHub', hover: 'hover:text-white hover:border-white hover:bg-white/5' },
              { icon: <Linkedin size={22} />, href: 'https://www.linkedin.com/in/faraz-kayan-haque-6b70253aa/', label: 'LinkedIn', hover: 'hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10' },
              { icon: <Instagram size={22} />, href: 'https://www.instagram.com/faraz_kayan_haque/', label: 'Instagram', hover: 'hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-[#E1306C]/10' },
              { icon: <Facebook size={22} />, href: 'https://facebook.com/farazkayanhaque', label: 'Facebook', hover: 'hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10' },
            ].map((social) => (              
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className={`p-4 rounded-full bg-[#1C1C20] text-[#94949F] transition-all hover:scale-110 active:scale-95 border border-white/5 ${social.hover}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
