'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center mb-12 md:mb-20 space-y-4">
    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#B89B72] font-bold block">{subtitle}</span>
    <h2 className="text-3xl md:text-6xl font-light text-[#121212] tracking-tighter">{title}</h2>
    <div className="h-[1px] w-12 bg-[#B89B72] mx-auto" />
  </div>
);

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('Tümü');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const categories = ['Tümü', ...new Set(products.map(p => p.category))];
  const filteredProducts = filter === 'Tümü' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-white text-right selection:bg-[#B89B72]/30" dir="rtl">
      <Navbar />
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 z-0">
          <img src="/hero.jpg" alt="Lina" className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-[10s] hover:scale-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0A] via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-8 relative z-10 text-center space-y-6 md:space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4 md:space-y-6"
          >
            <span className="text-white/60 text-[10px] md:text-[12px] uppercase tracking-[0.5em] block animate-fade-in">The New Era of Beauty</span>
            <h1 className="text-5xl md:text-9xl font-light text-white leading-none tracking-tighter">
              LINA <br /> 
              <span className="font-serif italic text-[#B89B72]">STUDIO</span>
            </h1>
            <p className="text-white/70 text-base md:text-xl max-w-xl mx-auto font-light leading-relaxed px-4">
              Küratörlüğünü yaptığım, sadece en yüksek standartlardaki ürünlerin yer aldığı, kişisel bakımın sanata dönüştüğü bir alan.
            </p>
            <div className="pt-6 md:pt-10">
              <a href="#products" className="bg-white text-black px-10 py-4 md:px-12 md:py-5 rounded-full text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#B89B72] hover:text-white transition-all duration-500 transform hover:scale-105 shadow-2xl inline-block">
                Koleksiyonu Keşfet
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#0A0A0A] text-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-4 bg-[#B89B72]/20 rounded-full blur-3xl group-hover:bg-[#B89B72]/30 transition duration-1000" />
            <img src="/influencer.jpg" alt="Philosophy" className="relative rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition duration-1000 w-full max-w-sm md:max-w-md mx-auto" />
          </div>
          <div className="space-y-6 md:space-y-8 text-right order-1 lg:order-2">
            <h2 className="text-3xl md:text-6xl font-light leading-tight">
              "Sıradan olmak bir seçimdir, <br /> 
              <span className="text-[#B89B72] italic">ilham vermek</span> ise bir sanat."
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">
              Lina Studio, sadece bir ürün listesi değil; bir yaşam biçimi önerisidir. Burada her seçim, her içerik ve her detay, sizin en yüksek versiyonunuzu ortaya çıkarmak için tasarlandı.
            </p>
            <div className="h-1 w-12 md:w-20 bg-[#B89B72] mr-0 ml-auto" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#FDFCFB] border-y border-gray-100">
        <div className="container mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          <div className="space-y-4 p-4">
            <div className="text-[#B89B72] text-2xl md:text-3xl mb-2">✦</div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-black">Sadece Seçkinler</h3>
            <p className="text-[11px] md:text-xs text-gray-400 font-light leading-relaxed">Kürasyonumuz, sıradanlığı reddeden ve mükemmelliği arayanlar için tasarlandı.</p>
          </div>
          <div className="space-y-4 p-4">
            <div className="text-[#B89B72] text-2xl md:text-3xl mb-2">✦</div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-black">Kanıtlanmış Etki</h3>
            <p className="text-[11px] md:text-xs text-gray-400 font-light leading-relaxed">Önerdiğimiz her ürün, yüksek performans ve gerçek sonuçlar sunan seçkin markalardır.</p>
          </div>
          <div className="space-y-4 p-4">
            <div className="text-[#B89B72] text-2xl md:text-3xl mb-2">✦</div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-black">Sınırlı Erişim</h3>
            <p className="text-[11px] md:text-xs text-gray-400 font-light leading-relaxed">Kişisel bakımın en saf ve en etkili halini sadece burada bulabilirsiniz.</p>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <SectionTitle title="Seçkin Koleksiyon" subtitle="Curated Selection" />

          <div className="flex justify-center gap-3 md:gap-4 mb-12 md:mb-20 overflow-x-auto pb-4 no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`px-6 md:px-8 py-2 text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-500 rounded-full border whitespace-nowrap ${
                  filter === cat ? 'bg-black text-white border-black' : 'bg-transparent text-gray-400 border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-24">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 md:py-20 bg-[#0A0A0A] text-white border-t border-white/10" dir="ltr">
        <div className="container mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-4">Lina <span className="text-[#B89B72] font-bold">Studio</span></div>
            <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-widest">The Architecture of Beauty © 2026</p>
          </div>
          <div className="flex gap-8 md:gap-12 text-[9px] md:text-[10px] uppercase tracking-widest text-white/60">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Pinterest</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
