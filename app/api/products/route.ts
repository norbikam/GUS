// app/api/products/route.ts - POST endpoint (tworzenie produktu)

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma, Product } from '@prisma/client';

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
  title: string;       // ✅ Zmienione z name
  slug: string;        // ✅ Dodane
  price: string;       // ✅ Zmienione z number
  description?: string | null;
  category?: string | null;
  tags: string;        // ✅ Dodane
  youtubeUrl?: string | null;
  featured: boolean;
  active: boolean;     // ✅ Dodane
  image: string;       // ✅ Wymagane (nie optional)
  images?: CleanedImage[] | null;
};

// ✅ Helper function do generowania slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź|ż/g, 'z')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📥 POST /api/products - Received body:', JSON.stringify(body, null, 2));

    // ✅ Pobierz wartości (obsługa title i name dla kompatybilności)
    const productTitle = body.title || body.name;
    const productPrice = body.price;

    // Walidacja wymaganych pól
    if (!productTitle || !productPrice) {
      return NextResponse.json(
        { error: 'Title and price are required' },
        { status: 400 }
      );
    }

    // ✅ Generuj slug
    const generatedSlug = generateSlug(productTitle);
    
    // ✅ Sprawdź unikalność slug
    let finalSlug = generatedSlug;
    const existingSlug = await prisma.product.findFirst({
      where: { slug: generatedSlug }
    });

    if (existingSlug) {
      finalSlug = `${generatedSlug}-${Date.now()}`;
      console.log('⚠️  Slug collision, using:', finalSlug);
    }

    // ✅ KLUCZOWE: Przygotowanie danych images
    let finalImages: CleanedImage[] | null = null;

    if (body.images && Array.isArray(body.images) && body.images.length > 0) {
      console.log('🖼️  Processing', body.images.length, 'images');
      
      const cleanImages = body.images.map((img: ImageInput, index: number): CleanedImage => {
        const cleaned: CleanedImage = {
          id: String(img.id || `img-${Date.now()}-${index}`),
          url: String(img.url || '')
        };
        
        if (typeof img.isPrimary === 'boolean') {
          cleaned.isPrimary = img.isPrimary;
        }
        
        return cleaned;
      });

      const hasPrimary = cleanImages.some((img: CleanedImage) => img.isPrimary === true);
      if (!hasPrimary && cleanImages.length > 0) {
        cleanImages[0].isPrimary = true;
      }

      finalImages = cleanImages;

      if (finalImages != null) {
        console.log('✅ Final images prepared:', finalImages.length, 'images');
      }
      console.log('📋 Images structure:', JSON.stringify(finalImages, null, 2));
    }

    // ✅ Ustal główny obraz (WYMAGANE pole)
    let mainImage = '';
    if (body.image && typeof body.image === 'string') {
      mainImage = body.image;
    } else if (finalImages && finalImages.length > 0) {
      mainImage = finalImages[0].url;
    } else {
      // Fallback - musi być jakiś obraz
      mainImage = '/placeholder.jpg';
    }

    // Przygotuj dane do zapisu
    const productData: ProductData = {
      title: String(productTitle),           // ✅ title zamiast name
      slug: finalSlug,                       // ✅ Dodane
      price: String(productPrice),           // ✅ String zamiast parseFloat
      description: body.description ? String(body.description) : null,
      category: body.category ? String(body.category) : null,
      tags: body.tags ? String(body.tags) : '',  // ✅ Dodane
      youtubeUrl: body.youtubeUrl ? String(body.youtubeUrl) : null,
      featured: Boolean(body.featured ?? false),
      active: Boolean(body.active ?? true), // ✅ Dodane
      image: mainImage,                      // ✅ Wymagane
    };

    // ✅ Dodaj images tylko jeśli istnieją
    if (finalImages !== null) {
      productData.images = finalImages;
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

// GET endpoint
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const active = searchParams.get('active');

    console.log('📥 GET /api/products - Params:', { featured, category, search, active });

    // ✅ KROK 1: Buduj podstawowe query dla Prisma (bez wyszukiwania)
    const where: Prisma.ProductWhereInput = {};
    
    if (featured === 'true') {
      where.featured = true;
    }
    
    if (category && category !== 'all') {
      where.category = category;
    }
    
    // Domyślnie tylko aktywne produkty
    if (active === 'false') {
      where.active = false;
    } else if (active !== 'all') {
      where.active = true;
    }

    console.log('🔍 Prisma where:', JSON.stringify(where, null, 2));

    // ✅ KROK 2: Pobierz produkty z bazy
    let products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    console.log(`📦 Pobrano z bazy: ${products.length} produktów`);

    // ✅ KROK 3: Filtruj wyszukiwanie PO STRONIE SERWERA (w Node.js)
    if (search && search.trim()) {
      const searchLower = search.trim().toLowerCase();
      console.log(`🔍 Filtrowanie po: "${searchLower}"`);
      
      products = products.filter((product: Product) => {
        // Sprawdź czy którekolwiek pole zawiera szukaną frazę
        const titleMatch = product.title?.toLowerCase().includes(searchLower);
        const descMatch = product.description?.toLowerCase().includes(searchLower);
        const tagsMatch = product.tags?.toLowerCase().includes(searchLower);
        const categoryMatch = product.category?.toLowerCase().includes(searchLower);
        
        const isMatch = titleMatch || descMatch || tagsMatch || categoryMatch;
        
        if (isMatch) {
          console.log(`  ✓ Znaleziono: ${product.title}`);
        }
        
        return isMatch;
      });
      
      console.log(`📊 Po filtrowaniu: ${products.length} produktów`);
    }

    console.log(`✅ Zwracam: ${products.length} produktów`);

    return NextResponse.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    
    if (error && typeof error === 'object') {
      const err = error as { message?: string; code?: string };
      console.error('Error details:', {
        message: err.message,
        code: err.code
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}