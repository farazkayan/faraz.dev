export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#09090B] py-8 relative z-20">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#71717A] text-sm font-medium">
          <span>&copy; {new Date().getFullYear()}</span>
          <span>Faraz Kayan Haque.</span>
        </div>
        
        <div className="text-[#71717A] text-sm italic">
          Built because why not.
        </div>
      </div>
    </footer>
  );
};
