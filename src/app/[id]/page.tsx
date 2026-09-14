import { getProductById } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Suspense } from 'react';

export const revalidate = 3600;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return (
    <div className="min-h-screen bg-white flex items-center justify-center text-center px-8">
      <div className="space-y-6">
        <h1 className="text-4xl font-light text-gray-800">Ürün Bulunamadı</h1>
        <p className="text-gray-400 font-light">Aradığınız ürün şu an mevcut değil.</p>
        <Link href="/" className="inline-block bg-black text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-[#B89B72] transition-all">
          Koleksiyona Dön
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-right selection:bg-[#B89B72]/30" dir="rtl">
      <Navbar />

      <nav className="container mx-auto px-8 pt-32 pb-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
          <Link href="/" className="hover:text-black transition">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>
      </nav>

      <main className="container mx-auto px-8 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#B89B72]/10 rounded-3xl blur-2xl group-hover:bg-[#B89B72]/20 transition duration-1000" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl bg-[#F5F5F5]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#B89B72] font-bold block">
                {product.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-light text-[#121212] leading-tight tracking-tighter">
                {product.name}
              </h1>
              <div className="h-1 w-20 bg-[#B89B72]" />
              <p className="text-3xl font-light text-[#B89B72]">{product.price} TL</p>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed font-light text-lg">
              <p>
                Bu sadece bir ürün değil; kendinize verdiğiniz bir söz, bir statü göstergesi ve gerçek güzelliğin anahtarıdır. 
                {product.description}
              </p>
              <p className="text-sm italic text-gray-400">
                Sadece en iyisini hak edenler için kürate edildi.
              </p>
            </div>

            <div className="pt-8 space-y-6">
              <a 
                href={product.affiliate_link} 
                target="_blank" 
                className="block w-full text-center bg-black text-white py-6 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#B89B72] transition-all duration-500 transform hover:scale-[1.02] shadow-2xl"
              >
                Şimdi Sahip Ol
              </a>
              <p className="text-center text-[10px] uppercase tracking-widest text-gray-400">
                Resmi Partner Linki üzerinden yönlendirileceksiniz.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-12 border-t border-gray-100">
              <div className="text-center space-y-2">
                <div className="text-[#B89B72] text-xl">✦</div>
                <p className="text-[9px] uppercase tracking-widest text-gray-500">Premium Kalite</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-[#B89B72] text-xl">✦</div>
                <p className="text-[9px] uppercase tracking-widest text-gray-500">Küratör Onaylı</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-[#B89B72] text-xl">✦</div>
                <p className="text-[9px] uppercase tracking-widest text-gray-500">Sınırlı Erişim</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 bg-[#0A0A0A] text-white border-t border-white/10" dir="ltr">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="text-2xl font-light tracking-[0.3em] uppercase mb-4">Lina <span className="text-[#B89B72] font-bold">Studio</span></div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">The Architecture of Beauty © 2026</p>
          </div>
          <div className="flex gap-12 text-[10px] uppercase tracking-widest text-white/60">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Pinterest</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
