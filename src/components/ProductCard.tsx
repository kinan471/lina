'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductCard({ product }: { product: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5] rounded-sm mb-8 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
        <Link href={`/${product.id}`} className="block w-full h-full">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        </Link>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-black text-[8px] uppercase tracking-tighter px-2 py-1 rounded-sm font-bold">
            Sınırlı Stok
          </span>
        </div>
        
        {/* FIX: Button always visible on mobile, slides up on desktop */}
        <div className="absolute bottom-4 right-4 left-4 md:bottom-8 md:right-8 md:left-8 translate-y-0 opacity-100 md:translate-y-12 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <Link href={`/${product.id}`} className="block w-full bg-white text-black text-center py-3 md:py-4 text-[9px] md:text-[10px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-xl">
            Ürünü İncele
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2 text-right">
          <h3 className="text-lg md:text-xl font-light text-[#121212] tracking-tight group-hover:text-[#B89B72] transition-colors duration-300">{product.name}</h3>
          <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">{product.description}</p>
        </div>
        <span className="text-sm font-medium text-[#B89B72]">{product.price} TL</span>
      </div>
    </motion.div>
  );
}
