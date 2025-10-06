import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ProductsDisplay } from "@/app/components/productsdisplay";
import { prisma } from '@/lib/prisma';

type Props = {
  params: Promise<{ slug: string }>;
};

// Funkcja do pobierania produktu z bazy danych
async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: slug,
        active: true
      }
    });
    return product;
  } catch (error) {
    console.error('Błąd podczas pobierania produktu:', error);
    return null;
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  
  // Pobierz produkt z bazy danych
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <div className="flex flex-col md:grid md:grid-cols-2 w-full justify-center items-stretch font-light text-center px-0 p-10 pt-20 gap-10">
        <div className="p-6 md:pl-2 pb-0">
          <div className="relative flex w-full rounded-lg overflow-hidden items-center justify-center">
            <Image
                        src={product.image}
                        alt={product.title}
                        height={400}
                        width={300}
                        className="object-cover w-full md:w-[80%]"
                      />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent" />
          </div>
        </div>
        <div className="relative h-full flex flex-col justify-center text-left p-10 md:pl-10">
          <span aria-hidden className="hidden md:block absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          {/* 1) Nazwa */}
          <h1 className="text-3xl md:text-5xl font-bold">{product.title}</h1>
          {/* 2) Cena */}
          <p className="text-2xl text-yellow-600 mt-4">{product.price}</p>
          {/* 3) Przyciski */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+48510255279"
              className="inline-block bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition text-center w-full sm:w-auto"
            >
              Zadzwoń i zamów
            </a>
            <a
              href="https://wa.me/48510255279?text=Hej%2C%20chcia%C5%82bym%20zam%C3%B3wi%C4%87%20produkt%20z%20katalogu.%20Czy%20mo%C5%BCesz%20mi%20pom%C3%B3c%3F"
              className="inline-block bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition text-center w-full sm:w-auto"
            >
              Napisz na WhatsApp
            </a>
          </div>
          {/* 4) Opis (wymuś jasny tekst) */}
          <div className="mt-8 prose prose-invert max-w-none text-gray-100">
            //<ReactMarkdown>{product.description || ''}</ReactMarkdown>
{product.description || ''}
          </div>
        </div>
        
        <div className="col-span-2">
          <h1 className="text-3xl font-bold mt-6 text-center">Zobacz inne produkty</h1>
          <ProductsDisplay amount={4} />
        </div>
      </div>
    </div>
  );
}