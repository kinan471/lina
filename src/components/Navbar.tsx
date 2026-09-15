'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${scrolled ? 'bg-white/90 backdrop-blur-lg py-4 shadow-sm' : 'bg-transparent py-6'}`} dir="ltr">
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link href="/" className={`text-lg md:text-xl font-light tracking-[0.3em] uppercase transition-colors duration-500 ${scrolled ? 'text-black' : 'text-[#121212]'}`}>
          Lina <span className="text-[#B89B72] font-bold">Studio</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500">
          <Link href="/" className="hover:text-black transition-colors duration-300">Ana Sayfa</Link>
          <Link href="#products" className="hover:text-black transition-colors duration-300">Seçkiler</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 group"
        >
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-12 text-center"
            >
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-light uppercase tracking-widest text-black hover:text-[#B89B72] transition-colors"
              >
                Ana Sayfa
              </Link>
              <Link 
                href="#products" 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-light uppercase tracking-widest text-black hover:text-[#B89B72] transition-colors"
              >
                Seçkiler
              </Link>
              <div className="absolute bottom-20 left-0 w-full text-center">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-light">The Architecture of Beauty</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
