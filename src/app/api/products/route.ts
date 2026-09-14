import { NextResponse } from 'next/server';
import { getProducts, addProduct, deleteProduct, updateProduct } from '@/lib/db';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  await addProduct(body);
  return NextResponse.json({ message: 'Product added' }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  await deleteProduct(id);
  return NextResponse.json({ message: 'Product deleted' });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...updateData } = body;
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  await updateProduct(id, updateData);
  return NextResponse.json({ message: 'Product updated' });
}
