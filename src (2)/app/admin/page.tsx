'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const payload = isEditing ? { ...form, id: form.id } : { 
      ...form, 
      id: Date.now().toString() 
    };

    await fetch('/api/products', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setForm({});
    setIsEditing(false);
    loadProducts();
  };

  const handleEdit = (p: Product) => {
    setForm(p);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      loadProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم - إدارة المنتجات</h1>
          <a href="/" className="text-blue-600 hover:underline">عرض الموقع ←</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? 'تعديل منتج' : 'إضافة منتج جديد'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">اسم المنتج</label>
                <input 
                  className="w-full p-2 border rounded-md" 
                  value={form.name || ''} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">الوصف</label>
                <textarea 
                  className="w-full p-2 border rounded-md" 
                  value={form.description || ''} 
                  onChange={e => setForm({...form, description: e.target.value})} 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">السعر</label>
                  <input 
                    className="w-full p-2 border rounded-md" 
                    value={form.price || ''} 
                    onChange={e => setForm({...form, price: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">التصنيف</label>
                  <input 
                    className="w-full p-2 border rounded-md" 
                    value={form.category || ''} 
                    onChange={e => setForm({...form, category: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">رابط الصورة</label>
                <input 
                  className="w-full p-2 border rounded-md" 
                  value={form.image || ''} 
                  onChange={e => setForm({...form, image: e.target.value})} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">رابط الأفلييت</label>
                <input 
                  className="w-full p-2 border rounded-md" 
                  value={form.affiliate_link || ''} 
                  onChange={e => setForm({...form, affiliate_link: e.target.value})} 
                  required 
                />
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                {isEditing ? 'تحديث المنتج' : 'حفظ المنتج'}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  onClick={() => {setIsEditing(false); setForm({});}} 
                  className="w-full bg-gray-400 text-white py-2 rounded-md"
                >
                  إلغاء
                </button>
              )}
            </form>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">المنتج</th>
                  <th className="p-4 font-semibold text-gray-600">التصنيف</th>
                  <th className="p-4 font-semibold text-gray-600">السعر</th>
                  <th className="p-4 font-semibold text-gray-600">الإجراءات</th>
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
                    <td className="p-4 text-gray-600">{p.price} ر.س</td>
                    <td className="p-4 space-x-reverse space-x-2">
                      <button 
                        onClick={() => handleEdit(p)} 
                        className="text-blue-600 hover:text-blue-800 px-2 py-1"
                      >
                        تعديل
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)} 
                        className="text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        حذف
                      </button>
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
