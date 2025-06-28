// test-api.mjs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testAPI() {
  try {
    console.log('🔌 Testujemy API...');
    
    const count = await prisma.product.count();
    console.log(`📊 Liczba produktów: ${count}`);
    
    const products = await prisma.product.findMany({
      take: 3
    });
    
    console.log('📦 Pierwsze 3 produkty:');
    products.forEach(p => {
      console.log(`- ${p.title} (${p.category})`);
    });
    
  } catch (error) {
    console.error('❌ Błąd:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPI();
