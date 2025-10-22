// app/api/products/route.ts - POST endpoint (tworzenie produktu)

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ✅ Definiujemy typy
type ImageInput = {
  id?: string;
  url?: string;
  isPrimary?: boolean;
};

type CleanedImage = {
  id: string;
  url: string;
  isPrimary?: boolean;
};

type ProductData = {
  name: string;
  price: number;
  description?: string | null;
  category?: string | null;
  inStock?: boolean;
  featured?: boolean;
  images?: CleanedImage[] | null;
  image?: string | null;
};

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
    let finalImages: CleanedImage[] | null = null;

    if (body.images && Array.isArray(body.images) && body.images.length > 0) {
      console.log('🖼️  Processing', body.images.length, 'images');
      
      // Deep clean każdego obrazu - usuń React metadata
      const cleanImages = body.images.map((img: ImageInput, index: number): CleanedImage => {
        const cleaned: CleanedImage = {
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
      const hasPrimary = cleanImages.some((img: CleanedImage) => img.isPrimary === true);
      if (!hasPrimary && cleanImages.length > 0) {
        cleanImages[0].isPrimary = true;
      }

      // ✅ WAŻNE: Przypisz jako plain JavaScript object/array
      // Prisma automatycznie skonwertuje to na JSON
      finalImages = cleanImages;


      if(finalImages != null){
      console.log('✅ Final images prepared:', finalImages.length, 'images');}
      console.log('📋 Images structure:', JSON.stringify(finalImages, null, 2));
    }

    // Przygotuj dane do zapisu
    const productData: ProductData = {
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

  } catch (error) {
    console.error('❌ ERROR in POST /api/products:', error);
    
    // ✅ Bezpieczne logowanie błędów
    if (error && typeof error === 'object') {
      const err = error as { message?: string; code?: string; meta?: unknown; stack?: string };
      console.error('📋 Error details:', {
        message: err.message,
        code: err.code,
        meta: err.meta,
        stack: err.stack
      });
    }

    return NextResponse.json(
      { 
        error: 'Failed to create product',
        details: error instanceof Error ? error.message : 'Unknown error',
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
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
