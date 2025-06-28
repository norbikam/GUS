// app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Błąd podczas pobierania produktu:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    
    // Generuj slug jeśli tytuł się zmienił
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...data,
        slug,
        tags: data.tags || ''
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Błąd podczas aktualizacji produktu:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.product.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Błąd podczas usuwania produktu:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
