'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${scrolled ? 'bg-white/90 backdrop-blur-lg py-4 shadow-sm' : 'bg-transparent py-8'}`} dir="ltr">
      <div className="container mx-auto px-8 flex items-center justify-between">
        <Link href="/" className={`text-xl font-light tracking-[0.3em] uppercase transition-colors duration-500 ${scrolled ? 'text-black' : 'text-[#121212]'}`}>
          Lina <span className="text-[#B89B72] font-bold">Studio</span>
        </Link>
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500">
          <Link href="/" className="hover:text-black transition-colors duration-300">Ana Sayfa</Link>
          <Link href="#products" className="hover:text-black transition-colors duration-300">Seçkiler</Link>
        </div>
      </div>
    </nav>
  );
}
