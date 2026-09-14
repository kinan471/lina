'use client';
import { useState } from 'react';
import { Product } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [filter, setFilter] = useState('Tümü');
  const categories = ['Tümü', ...new Set(initialProducts.map(p => p.category))];
  const filteredProducts = filter === 'Tümü' ? initialProducts : initialProducts.filter(p => p.category === filter);

  return (
    <div className="space-y-20">
      {/* Categories - Minimalist Tab System */}
      <div className="flex justify-center items-center gap-4 md:gap-8 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={`relative px-6 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 rounded-full border ${
              filter === cat 
              ? 'text-white border-transparent' 
              : 'text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-600'
            }`}
            style={filter === cat ? { backgroundColor: '#121212' } : {}}
          >
            {cat}
            {filter === cat && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute inset-0 rounded-full border-2 border-black" 
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Product Grid - Editorial Layout */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F3EEE7] rounded-sm mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x1200/fdfcfb/B89B72?text=${encodeURIComponent(product.name)}`;
                  }}
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                
                <div className="absolute bottom-6 left-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <a 
                    href={product.affiliate_link} 
                    target="_blank" 
                    className="block w-full bg-white text-[#121212] text-center py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-xl"
                  >
                    Sırrı Şimdi Alın
                  </a>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-left space-y-3">
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-lg font-light text-[#121212] group-hover:text-[#B89B72] transition-colors duration-300 truncate">
                    {product.name}
                  </h3>
                  <span className="text-sm font-light text-gray-400 whitespace-nowrap">{product.price} TL</span>
                </div>
                <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {product.description}
                </p>
                <div className="pt-2">
                  <span className="text-[9px] uppercase tracking-widest text-[#B89B72] font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
