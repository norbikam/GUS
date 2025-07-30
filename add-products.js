const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Produkt 1", slug: "produkt-1", price: 99.99 },
      { name: "Produkt 2", slug: "produkt-2", price: 199.99 },
      { name: "Produkt 3", slug: "produkt-3", price: 299.99 },
      // Dodaj swoje produkty tutaj
    ]
  })
  console.log("Produkty dodane!")
}

main().finally(() => prisma.$disconnect())