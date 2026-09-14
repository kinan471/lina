'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Hatalı şifre. Lütfen tekrar deneyiniz.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6" dir="ltr">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-12 bg-white rounded-3xl shadow-sm border border-gray-100 text-center"
      >
        <h1 className="text-2xl font-light tracking-widest uppercase text-[#121212] mb-2">Yönetici Girişi</h1>
        <p className="text-sm text-gray-400 mb-10 font-light">Stüdyoya giriş yapmak için lütfen şifrenizi giriniz.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-full text-center focus:outline-none focus:border-[#B89B72] transition-all"
              placeholder="Şifre"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          
          <button className="w-full bg-[#121212] text-white py-4 rounded-full text-xs uppercase tracking-widest hover:bg-[#B89B72] transition-all duration-500 shadow-lg">
            Stüdyoya Gir
          </button>
        </form>
      </motion.div>
    </div>
  );
}
