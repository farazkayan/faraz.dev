import React from 'react';
import { LimelightNav } from './LimelightNav';

export const Navbar: React.FC = () => {
  return (
    <>
      {/* Brand Anchor (FKH) — Left-aligned, non-competing, fixed at same top plane */}
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById('home');
          if (target) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.replaceState(null, '', '#home');
          }
        }}
        className="fixed top-5 left-6 sm:left-8 z-50 hidden lg:flex items-center gap-2 group text-zinc-300 hover:text-white transition-colors"
        aria-label="Faraz Kayan Haque Home"
      >
        <div className="w-8 h-8 rounded-full border border-zinc-800/80 bg-[#0c0c0e]/90 backdrop-blur-md flex items-center justify-center font-display font-semibold text-xs tracking-wider text-zinc-300 group-hover:border-zinc-500/50 group-hover:text-white transition-colors shadow-sm">
          FKH
        </div>
      </a>

      {/* Floating Limelight Navigation */}
      <LimelightNav />
    </>
  );
};

export { LimelightNav };
export default Navbar;
