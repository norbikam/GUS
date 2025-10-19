import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mapowanie slug -> kategoria
const categoryMap = {
  'morpheus': 'mikronakłuwanie',
  'Frax-Ultra': 'laser',
  'Venom': 'laser',
  'Angelo': 'laser',
  'HiFUSONIX': 'hifu',
  'HotandColdPlasma': 'plazma',
  'AuraXPL': 'laser',
  'EternaSilk': 'depilacja',
  'Velure': 'laser',
  'Dermapen': 'mikronakłuwanie',
  'lumiglam-1927': 'laser'
};

// Które produkty są polecane
const featuredSlugs = ['morpheus', 'Frax-Ultra', 'Venom', 'HiFUSONIX', 'AuraXPL', 'EternaSilk'];

export async function POST() {
  try {
    console.log('🚀 Rozpoczynam aktualizację kategorii...');
    
    // Pobierz wszystkie produkty
    const products = await prisma.product.findMany();
    
    const updates = [];
    
    for (const product of products) {
      const category = categoryMap[product.slug] || 'inne';
      const featured = featuredSlugs.includes(product.slug);
      
      await prisma.product.update({
        where: { id: product.id },
        data: {
          category: category,
          featured: featured,
          tags: product.tags || `${category}, urządzenie kosmetyczne`
        }
      });
      
      updates.push({
        title: product.title,
        slug: product.slug,
        category: category,
        featured: featured
      });
    }
    
    // Pokaż statystyki
    const stats = await prisma.product.groupBy({
      by: ['category'],
      _count: true
    });
    
    console.log('✅ Aktualizacja zakończona!');
    
    return NextResponse.json({
      success: true,
      message: '✅ Kategorie zostały zaktualizowane!',
      updated: updates.length,
      products: updates,
      stats: stats
    });
    
  } catch (error) {
    console.error('❌ Błąd podczas aktualizacji:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
