import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ✅ Helper function do generowania slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Zamień polskie znaki
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź|ż/g, 'z')
    // Usuń wszystko oprócz liter, cyfr, spacji i myślników
    .replace(/[^a-z0-9\s-]/g, '')
    // Zamień spacje na myślniki
    .replace(/\s+/g, '-')
    // Usuń wielokrotne myślniki
    .replace(/-+/g, '-')
    // Usuń myślniki z początku i końca
    .replace(/^-+|-+$/g, '');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;  // ✅ Await params (Next.js 15)

    console.log('📥 Received update request for product:', id);
    console.log('📦 Body keys:', Object.keys(body));

    // Sprawdź czy produkt istnieje
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produkt nie znaleziony' },
        { status: 404 }
      );
    }

    // Przygotuj dane do aktualizacji
    const updateData: any = {};
    
    // ✅ Proste pola tekstowe
    if (body.title !== undefined && body.title !== null) {
      updateData.title = String(body.title);
      
      // ✅ KLUCZOWE: Automatycznie generuj slug z nowego title
      updateData.slug = generateSlug(body.title);
      console.log('🔗 Generated slug:', updateData.slug);
    }
    
    if (body.description !== undefined) {
      updateData.description = body.description ? String(body.description) : null;
    }
    if (body.price !== undefined && body.price !== null) {
      updateData.price = String(body.price);
    }
    if (body.category !== undefined) {
      updateData.category = body.category ? String(body.category) : null;
    }
    if (body.tags !== undefined) {
      updateData.tags = body.tags ? String(body.tags) : '';
    }
    
    // ✅ Boolean fields
    if (body.featured !== undefined) {
      updateData.featured = Boolean(body.featured);
    }
    if (body.active !== undefined) {
      updateData.active = Boolean(body.active);
    }

    // ✅ LOGIKA: Obsługa images z rozdzieleniem na image (główne) + images (pozostałe)
    if (body.images !== undefined && Array.isArray(body.images) && body.images.length > 0) {
      console.log('🖼️  Processing', body.images.length, 'images from frontend');
      
      // Głębokie czyszczenie - tylko dozwolone pola
      const cleanImages = body.images.map((img: any, index: number) => {
        const cleaned: any = {
          id: String(img.id || `img-${Date.now()}-${index}`),
          url: String(img.url || '').trim()
        };
        
        // Zachowaj isPrimary jeśli istnieje
        if (typeof img.isPrimary === 'boolean') {
          cleaned.isPrimary = img.isPrimary;
        }
        
        return cleaned;
      });
      
      // Walidacja URL
      const validImages = cleanImages.filter((img: any) => {
        const isValid = img.url && (
          img.url.startsWith('http://') || 
          img.url.startsWith('https://') ||
          img.url.startsWith('/')
        );
        if (!isValid) {
          console.warn('⚠️  Invalid image filtered out:', img);
        }
        return isValid;
      });
      
      if (validImages.length === 0) {
        console.warn('⚠️  No valid images after filtering');
        updateData.image = null;
        updateData.images = null;
      } else {
        // 🎯 KLUCZOWA LOGIKA: Rozdziel na główne + pozostałe
        
        // 1. Znajdź główne zdjęcie (isPrimary: true)
        let primaryImage = validImages.find((img: any) => img.isPrimary === true);
        
        // Jeśli nie ma głównego, ustaw pierwsze jako główne
        if (!primaryImage) {
          primaryImage = validImages[0];
          console.log('✅ No primary found, using first image as primary');
        }
        
        // 2. Pobierz pozostałe zdjęcia (wszystkie oprócz głównego)
        const otherImages = validImages.filter((img: any) => img.id !== primaryImage!.id);
        
        console.log('📸 Primary image:', primaryImage.url);
        console.log('🖼️  Other images:', otherImages.length);
        
        // 3. Zapisz do odpowiednich pól
        updateData.image = primaryImage.url;  // Główne zdjęcie jako string URL
        
        // Pozostałe zdjęcia jako JSON (bez pola isPrimary)
        if (otherImages.length > 0) {
          const finalOtherImages = otherImages.map((img: any) => ({
            id: img.id,
            url: img.url
          }));
          updateData.images = finalOtherImages;
          console.log('✅ Saved', finalOtherImages.length, 'additional images to images field');
        } else {
          updateData.images = null;
          console.log('✅ No additional images - images field set to null');
        }
      }
    } else if (body.images === null || (Array.isArray(body.images) && body.images.length === 0)) {
      // Użytkownik usunął wszystkie obrazy
      console.log('🗑️  User cleared all images');
      updateData.image = null;
      updateData.images = null;
    }

    // ✅ Usuń pola których Prisma nie akceptuje
    delete (updateData as any).id;
    delete (updateData as any).createdAt;
    delete (updateData as any).updatedAt;
    // NIE usuwaj slug - właśnie go zaktualizowaliśmy!

    // ✅ Usuń undefined wartości
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    console.log('💾 Final update data keys:', Object.keys(updateData));
    console.log('💾 image field:', updateData.image || 'NOT SET');
    console.log('💾 images field:', updateData.images ? `SET (${updateData.images.length} items)` : 'NOT SET');
    console.log('💾 slug field:', updateData.slug || 'NOT SET');

    // ✅ Sprawdź czy slug jest unikalny (pomijając aktualny produkt)
    if (updateData.slug) {
      const existingSlug = await prisma.product.findFirst({
        where: {
          slug: updateData.slug,
          id: { not: id }  // Pomijamy aktualny produkt
        }
      });

      if (existingSlug) {
        // Jeśli slug istnieje, dodaj timestamp
        const timestamp = Date.now();
        updateData.slug = `${updateData.slug}-${timestamp}`;
        console.log('⚠️  Slug collision detected, using:', updateData.slug);
      }
    }

    // Wykonaj aktualizację
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData
    });

    console.log('✅ Product updated successfully');
    console.log('✅ New slug:', updatedProduct.slug);
    
    return NextResponse.json(updatedProduct);

  } catch (error) {
    console.error('❌ ERROR during product update');
    console.error('❌ Error name:', (error as Error).name);
    console.error('❌ Error message:', (error as Error).message);
    
    // Prisma-specific error info
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('❌ Prisma error code:', (error as any).code);
      console.error('❌ Prisma error meta:', (error as any).meta);
      
      // Jeśli błąd dotyczy typu pola
      if ((error as any).message?.includes('Invalid value provided')) {
        console.error('');
        console.error('🔍 DIAGNOSIS: Field type mismatch detected');
        console.error('🔍 This usually means the Prisma schema expects a different type');
        console.error('🔍 Check that schema.prisma has:');
        console.error('🔍   image       String?');
        console.error('🔍   images      Json?       <-- Must be Json?, not String?');
        console.error('');
        console.error('🔍 If schema is correct, run:');
        console.error('🔍   npx prisma generate');
        console.error('🔍   (restart server)');
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Błąd podczas aktualizacji produktu',
        details: (error as Error).message,
        name: (error as Error).name
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Produkt nie znaleziony' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
    
  } catch (error) {
    console.error('Błąd podczas pobierania produktu:', error);
    return NextResponse.json(
      { error: 'Błąd podczas pobierania produktu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Błąd podczas usuwania produktu:', error);
    return NextResponse.json(
      { error: 'Błąd podczas usuwania produktu' },
      { status: 500 }
    );
  }
}