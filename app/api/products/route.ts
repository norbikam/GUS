// app/api/products/route.ts - POST endpoint (tworzenie produktu)

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📥 POST /api/products - Received body:', JSON.stringify(body, null, 2));

    // Walidacja wymaganych pól
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // ✅ KLUCZOWE: Przygotowanie danych images
    let finalImages: any = null;

    if (body.images && Array.isArray(body.images) && body.images.length > 0) {
      console.log('🖼️  Processing', body.images.length, 'images');
      
      // Deep clean każdego obrazu - usuń React metadata
      const cleanImages = body.images.map((img: any, index: number) => {
        const cleaned: any = {
          id: String(img.id || `img-${Date.now()}-${index}`),
          url: String(img.url || '')
        };
        
        // Dodaj isPrimary tylko jeśli istnieje
        if (typeof img.isPrimary === 'boolean') {
          cleaned.isPrimary = img.isPrimary;
        }
        
        return cleaned;
      });

      // Upewnij się że jest dokładnie jeden primary image
      const hasPrimary = cleanImages.some((img: any) => img.isPrimary === true);
      if (!hasPrimary && cleanImages.length > 0) {
        cleanImages[0].isPrimary = true;
      }

      // ✅ WAŻNE: Przypisz jako plain JavaScript object/array
      // Prisma automatycznie skonwertuje to na JSON
      finalImages = cleanImages;

      console.log('✅ Final images prepared:', finalImages.length, 'images');
      console.log('📋 Images structure:', JSON.stringify(finalImages, null, 2));
    }

    // Przygotuj dane do zapisu
    const productData: any = {
      name: String(body.name),
      price: parseFloat(body.price),
      description: body.description ? String(body.description) : null,
      category: body.category ? String(body.category) : null,
      inStock: Boolean(body.inStock ?? true),
      featured: Boolean(body.featured ?? false),
    };

    // ✅ KLUCZOWE: Dodaj images tylko jeśli istnieją
    if (finalImages !== null) {
      productData.images = finalImages;
    }

    // Legacy support: jeśli jest pojedynczy image (stary format)
    if (body.image && typeof body.image === 'string') {
      productData.image = body.image;
    }

    console.log('💾 Creating product with data:', JSON.stringify(productData, null, 2));

    // ✅ Zapis do bazy
    const product = await prisma.product.create({
      data: productData
    });

    console.log('✅ Product created successfully:', product.id);

    return NextResponse.json(product, { status: 201 });

  } catch (error: any) {
    console.error('❌ ERROR in POST /api/products:', error);
    console.error('📋 Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });

    return NextResponse.json(
      { 
        error: 'Failed to create product',
        details: error.message,
        hint: 'Check server logs for detailed error information'
      },
      { status: 500 }
    );
  }
}

// GET endpoint (bez zmian - już działa)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const where = featured === 'true' ? { featured: true } : {};

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error('❌ Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}