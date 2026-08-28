import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Homelab', href: '#homelab' },
  { label: 'Hobbies', href: '#hobbies' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 300) {
          current = section;
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      {/* Desktop Navigation */}
      <nav 
        className={`
          hidden md:flex items-center gap-1 p-1 rounded-full pointer-events-auto
          transition-all duration-500 ease-out border
          ${isScrolled 
            ? 'bg-[#1C1C20]/60 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
            : 'bg-transparent border-transparent'}
        `}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <a
              key={item.label}
              href={item.href}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${isActive ? 'text-[#F5F5F5]' : 'text-[#94949F] hover:text-[#E4E4E5]'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden w-full flex justify-end pointer-events-auto">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3 rounded-full bg-[#1C1C20]/80 backdrop-blur-xl border border-white/10 text-white shadow-lg"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-20 right-4 left-4 p-2 rounded-2xl bg-[#1C1C20]/95 backdrop-blur-xl border border-white/10 shadow-[0_16px_64px_rgba(0,0,0,0.5)] pointer-events-auto md:hidden flex flex-col gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    px-4 py-3 rounded-xl text-base font-medium transition-colors
                    ${isActive 
                      ? 'bg-white/10 text-[#F5F5F5]' 
                      : 'text-[#94949F] hover:bg-white/5 hover:text-[#E4E4E5]'}
                  `}
                >
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
