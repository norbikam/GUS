// app/api/products/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    console.log('🔍 API /products wywołane');
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    console.log('Parametry wyszukiwania:', { search, category, featured });
    
    // Buduj warunki where - POPRAWNE dla SQLite
    const where = {
      active: true
    };

    // Dodaj warunki wyszukiwania (SQLite nie ma mode: 'insensitive')
    if (search) {
      const searchLower = search.toLowerCase();
      where.OR = [
        { title: { contains: searchLower } },
        { description: { contains: searchLower } },
        { tags: { contains: searchLower } }
      ];
    }

    // Dodaj filtr kategorii
    if (category && category !== 'all') {
      where.category = category;
    }

    // Dodaj filtr featured
    if (featured === 'true') {
      where.featured = true;
    }

    console.log('Where clause:', JSON.stringify(where, null, 2));

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    console.log(`📦 Znaleziono ${products.length} produktów`);

    return NextResponse.json(products);
    
  } catch (error) {
    console.error('❌ Błąd API products:', error);
    console.error('Stack trace:', error.stack);
    
    return NextResponse.json({ 
      error: 'Failed to fetch products', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const product = await prisma.product.create({
      data: {
        ...data,
        slug,
        tags: data.tags || ''
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('❌ Błąd podczas tworzenia produktu:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}