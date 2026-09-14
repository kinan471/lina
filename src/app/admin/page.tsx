'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    let imageUrl = form.image || '';

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok) {
          imageUrl = uploadData.url;
        }
      } catch (err) {
        alert('Image upload failed');
      }
    }

    const method = isEditing ? 'PUT' : 'POST';
    const payload = { 
      ...form, 
      image: imageUrl,
      id: isEditing ? form.id : Date.now().toString() 
    };

    const res = await fetch('/api/products', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setForm({});
      setFile(null);
      setIsEditing(false);
      loadProducts();
    } else {
      alert('Session expired. Please login again.');
      router.push('/login');
    }
    setUploading(false);
  };

  const handleEdit = (p: Product) => {
    setForm(p);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadProducts();
      } else {
        router.push('/login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="ltr">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Yönetim Paneli</h1>
          <div className="flex gap-4">
            <a href="/" className="text-blue-600 hover:underline">Siteye Git →</a>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm">Çıkış Yap</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ürün Adı</label>
                <input className="w-full p-2 border rounded-md" value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Açıklama</label>
                <textarea className="w-full p-2 border rounded-md" value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fiyat</label>
                  <input className="w-full p-2 border rounded-md" value={form.price || ''} onChange={e => setForm({...form, price: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kategori</label>
                  <input className="w-full p-2 border rounded-md" value={form.category || ''} onChange={e => setForm({...form, category: e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ürün Görseli</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setFile(e.target.files ? e.target.files[0] : null)} 
                  className="w-full p-2 border rounded-md text-sm"
                />
                {form.image && <p className="text-[10px] text-gray-400 mt-1">Mevcut görsel: {form.image}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Affiliate Linki</label>
                <input className="w-full p-2 border rounded-md" value={form.affiliate_link || ''} onChange={e => setForm({...form, affiliate_link: e.target.value})} required />
              </div>
              <button disabled={uploading} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:bg-gray-400">
                {uploading ? 'Kaydediliyor...' : (isEditing ? 'Güncelle' : 'Kaydet')}
              </button>
              {isEditing && (
                <button type="button" onClick={() => {setIsEditing(false); setForm({}); setFile(null);}} className="w-full bg-gray-400 text-white py-2 rounded-md">İptal</button>
              )}
            </form>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">Ürün</th>
                  <th className="p-4 font-semibold text-gray-600">Kategori</th>
                  <th className="p-4 font-semibold text-gray-600">Fiyat</th>
                  <th className="p-4 font-semibold text-gray-600">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.image} className="w-10 h-10 rounded-full object-cover" />
                      <span className="font-medium">{p.name}</span>
                    </td>
                    <td className="p-4 text-gray-600">{p.category}</td>
                    <td className="p-4 text-gray-600">{p.price} TL</td>
                    <td className="p-4 space-x-2">
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800 px-2 py-1">Düzenle</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800 px-2 py-1">Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
