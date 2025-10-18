import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function addCategories() {
  console.log('🚀 Dodaję kategorie do produktów...\n');
  
  try {
    const products = await prisma.product.findMany();
    
    for (const product of products) {
      const category = categoryMap[product.slug] || 'inne';
      const featured = featuredSlugs.includes(product.slug);
      
      await prisma.product.update({
        where: { id: product.id },
        data: {
          category: category,
          featured: featured,
          tags: product.tags || ''
        }
      });
      
      console.log(`✅ ${product.title}`);
      console.log(`   Kategoria: ${category}, Polecany: ${featured ? 'TAK' : 'NIE'}\n`);
    }
    
    console.log('🎉 Zakończono! Wszystkie produkty mają kategorie.\n');
    
    // Pokaż statystyki
    const stats = await prisma.product.groupBy({
      by: ['category'],
      _count: true
    });
    
    console.log('📊 Statystyki według kategorii:');
    stats.forEach(stat => {
      console.log(`   ${stat.category}: ${stat._count}`);
    });
    
  } catch (error) {
    console.error('❌ Błąd:', error);
  }
}

addCategories()
  .finally(async () => {
    await prisma.$disconnect();
  });
