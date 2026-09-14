import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/types/product';

const DB_PATH = path.join(process.cwd(), 'products.json');

export async function getProducts(): Promise<Product[]> {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p: Product) => p.id === id);
}

export async function addProduct(product: Partial<Product>): Promise<Product> {
  const products = await getProducts();
  const newProduct: Product = {
    id: Date.now().toString(),
    name: product.name || '',
    description: product.description || '',
    price: product.price || '0',
    category: product.category || 'General',
    image: product.image || '',
    affiliate_link: product.affiliate_link || '',
    ...product,
  };
  products.push(newProduct);
  await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2), 'utf8');
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const products = await getProducts();
  const index = products.findIndex((p: Product) => p.id === id);
  if (index === -1) throw new Error('Product not found');
  
  const updatedProduct = { ...products[index], ...updates };
  products[index] = updatedProduct;
  await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2), 'utf8');
  return updatedProduct;
}

export async function deleteProduct(id: string): Promise<{ success: boolean }> {
  const products = await getProducts();
  const filtered = products.filter((p: Product) => p.id !== id);
  await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2), 'utf8');
  return { success: true };
}
