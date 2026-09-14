import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'products.json');

export async function getProducts() {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

export async function getProductById(id: string) {
  const products = await getProducts();
  return products.find(p => p.id === id);
}

export async function addProduct(product: any) {
  const products = await getProducts();
  const newProduct = {
    ...product,
    id: Date.now().toString(), // Generate unique ID
  };
  products.push(newProduct);
  await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2), 'utf8');
  return newProduct;
}

export async function updateProduct(id: string, updates: any) {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Product not found');
  
  products[index] = { ...products[index], ...updates };
  await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2), 'utf8');
  return products[index];
}

export async function deleteProduct(id: string) {
  const products = await getProducts();
  const filtered = products.filter(p => p.id !== id);
  await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2), 'utf8');
  return { success: true };
}
