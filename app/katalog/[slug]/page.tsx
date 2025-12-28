import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { prisma } from '@/lib/prisma';
import ProductGallery from "@/app/components/ProductGallery";
import { parseImages } from "@/app/admin/components/prisma-helpers";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import YouTubeEmbed from "@/app/components/YouTubeEmbed";
import PdfViewer from "@/app/components/PdfViewer";

type Props = {
  params: Promise<{ slug: string }>;
};

// Funkcja do pobierania produktu z bazy danych
async function getProductBySlug(slug: string): Promise<Product | null> {
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

// Funkcja do pobierania losowych produktów (oprócz aktualnego)
async function getRandomProducts(currentSlug: string, amount: number = 4): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        active: true,
        NOT: {
          slug: currentSlug
        }
      },
      take: amount * 2, // Pobierz więcej, aby mieć z czego losować
    });
    
    // Losowo posortuj i zwróć określoną liczbę
    return products
      .sort(() => Math.random() - 0.5)
      .slice(0, amount);
  } catch (error) {
    console.error('Błąd podczas pobierania produktów:', error);
    return [];
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  
  // Pobierz produkt z bazy danych
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  // Pobierz losowe produkty do wyświetlenia
  const relatedProducts = await getRandomProducts(slug, 4);

  // ✅ Parsuj images z JsonValue
  const additionalImages = parseImages(product.images);

  return (
    <div>
      <div className="flex flex-col md:grid md:grid-cols-2 w-full justify-center items-stretch font-light text-center px-0 p-10 pt-20 gap-10">
        
        {/* ✅ NOWA GALERIA - lewa kolumna */}
        <div className="flex flex-col items-center gap-6 px-6 md:pl-2 pb-0">
          <ProductGallery
            mainImage={product.image || '/placeholder.png'}
            additionalImages={additionalImages}
            productTitle={product.title}
          />
        </div>

        {/* Prawa kolumna - detale produktu */}
        <div className="relative h-full flex flex-col justify-center text-left p-10 md:pl-10 md:pt-16 md:pb-10">
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
        </div>

        <div className="col-span-2">
          {product.pdfUrl && <PdfViewer pdfUrl={product.pdfUrl}/>}
        </div>

        {/* Opis produktu */}
        {!product.pdfUrl && <div className="md:col-span-2 px-6">
          <div className="mt-4 prose prose-invert max-w-none text-gray-100 text-left">
            <ReactMarkdown>{product.description ?? ''}</ReactMarkdown>
          </div>
        </div>}

        {/* 👈 DODAJ TEN FRAGMENT TUTAJ */}
        {product.youtubeUrl && (
          <div className="md:col-span-2 px-6 mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Zobacz produkt w akcji</h2>
            <div className="max-w-4xl mx-auto">
              <YouTubeEmbed url={product.youtubeUrl} title={product.title} />
            </div>
          </div>
        )}  

        {/* Inne produkty - RENDEROWANE Z BAZY DANYCH */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold mt-6 text-center">Zobacz inne produkty</h1>
          
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 px-4">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/katalog/${relatedProduct.slug}`}>
                  <div className="overflow-hidden transition flex flex-col text-center h-full hover:scale-105 duration-300">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      height={400}
                      width={300}
                      className="object-cover w-full rounded-lg"
                    />
                    <div className="flex flex-col justify-between flex-grow p-4">
                      <h2 className="text-xl font-bold min-h-[56px]">{relatedProduct.title}</h2>
                      <p className="text-yellow-600 border-t border-white/20 pt-2 mt-2">{relatedProduct.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-4">Brak innych produktów do wyświetlenia</p>
          )}
        </div>
      </div>
    </div>
  );
}
