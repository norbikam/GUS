import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productsWithCategories = [
  {
    title: "Morpheus-8",
    slug: "morpheus",
    category: "mikronakłuwanie",
    tags: "rf, mikronakłuwanie, odmładzanie",
    featured: true,
    active: true,
    price: "9 900zł",
    image: "/products/morpheus.webp",
    description: `Morpheus 8 to najnowsze, zaawansowane technologicznie urządzenie do pielęgnacji skóry...`
  },
  {
    title: "Frax Ultra Laser Frakcyjny Hybrydowy Er.-YAG / Co2",
    slug: "Frax-Ultra",
    category: "laser",
    tags: "laser, frakcyjny, co2, er-yag",
    featured: true,
    active: true,
    price: "39 000zł",
    image: "/products/FraxUltra.webp",
    description: `Frax Ultra ER-YAG – Laser Frakcyjny...`
  },
  {
    title: "VENOM – Laser hybrydowy 2 w 1 – Diodowy + Nd:Yag",
    slug: "Venom",
    category: "laser",
    tags: "laser, depilacja, tatuaże, pico",
    featured: true,
    active: true,
    price: "39 000 zł",
    image: "/products/venom.webp",
    description: `VENOM – Laser Hybrydowy 2 w 1...`
  },
  {
    title: "ANGELO Laser CO2",
    slug: "Angelo",
    category: "laser",
    tags: "laser, co2, ginekologia",
    featured: false,
    active: true,
    price: "34 900 zł",
    image: "/products/Angelo.webp",
    description: `ANGELO – Laser CO2...`
  },
  {
    title: "HiFUSONIX + Liposonix (niechirurgiczny lifting + spalanie tłuszczu)",
    slug: "HiFUSONIX",
    category: "hifu",
    tags: "hifu, lifting, modelowanie, ultradźwięki",
    featured: true,
    active: true,
    price: "19 900 zł",
    image: "/products/hifu.webp",
    description: `HiFUSONIX + Liposonix...`
  },
  {
    title: "Hot and Cold Plasma 6W1",
    slug: "HotandColdPlasma",
    category: "plazma",
    tags: "plazma, włosy, odmładzanie",
    featured: false,
    active: true,
    price: "29 900 zł",
    image: "/products/hotandcoldplasma.webp",
    description: `Hot and Cold Plasma 6W1...`
  },
  {
    title: "Laser Picosekundowy Aura XPL ULTIMATE 1200MJ",
    slug: "AuraXPL",
    category: "laser",
    tags: "laser, pico, tatuaże, przebarwienia",
    featured: true,
    active: true,
    price: "32 900 zł",
    image: "/products/PicoLaser.webp",
    description: `Laser Picosekundowy Aura XPL...`
  },
  {
    title: "EternaSilk Laser 808nm do usuwania owłosienia -bezbolesny",
    slug: "EternaSilk",
    category: "depilacja",
    tags: "laser, depilacja, 808nm",
    featured: true,
    active: true,
    price: "14 900 zł",
    image: "/products/EternaSilk.webp",
    description: `EternaSilk 808nm...`
  },
  {
    title: "Velure 1927nm - Laser Tulowy",
    slug: "Velure",
    category: "laser",
    tags: "laser, tulowy, odmładzanie, przebarwienia",
    featured: false,
    active: true,
    price: "49 900 zł",
    image: "/products/velure.webp",
    description: `Velure™ 1927...`
  },
  {
    title: "DermaPen 4.0",
    slug: "Dermapen",
    category: "mikronakłuwanie",
    tags: "dermapen, mikronakłuwanie",
    featured: false,
    active: true,
    price: "3 500 zł",
    image: "/products/dermapen.webp",
    description: `Dermapen 4...`
  },
  {
    title: "LUMIGLAM 1927nm – Laser frakcyjny Thulium",
    slug: "lumiglam-1927",
    category: "laser",
    tags: "laser, thulium, frakcyjny, przebarwienia",
    featured: false,
    active: true,
    price: "45 900 zł",
    image: "/products/lumiglam.webp",
    description: `LUMIGLAM 1927 nm...`
  }
];

async function main() {
  console.log('🚀 Rozpoczynam migrację produktów...');
  
  try {
    // Usuń wszystkie istniejące produkty (opcjonalnie)
    // await prisma.product.deleteMany({});
    // console.log('🗑️  Usunięto stare produkty');

    // Dodaj nowe produkty z kategoriami
    for (const product of productsWithCategories) {
      const exists = await prisma.product.findUnique({
        where: { slug: product.slug }
      });

      if (exists) {
        // Zaktualizuj istniejący produkt
        await prisma.product.update({
          where: { slug: product.slug },
          data: product
        });
        console.log(`✅ Zaktualizowano: ${product.title}`);
      } else {
        // Utwórz nowy produkt
        await prisma.product.create({
          data: product
        });
        console.log(`✨ Utworzono: ${product.title}`);
      }
    }

    console.log('\n🎉 Migracja zakończona pomyślnie!');
    
    // Pokaż statystyki
    const stats = await prisma.product.groupBy({
      by: ['category'],
      _count: true
    });
    
    console.log('\n📊 Statystyki produktów według kategorii:');
    stats.forEach(stat => {
      console.log(`   ${stat.category}: ${stat._count} produktów`);
    });

  } catch (error) {
    console.error('❌ Błąd podczas migracji:', error);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
