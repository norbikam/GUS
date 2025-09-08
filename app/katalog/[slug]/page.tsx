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
      <section className="relative w-screen h-[30vh] overflow-hidden mainvideobg">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/bgsmokecoloredcompressed.mp4" type="video/mp4" />
          Twoja przeglądarka nie wspiera odtwarzania wideo.
        </video>

        {/* Overlay to darken video for readability */}
        <div className="absolute inset-0 bg-black/50"/>

        {/* Centered Text */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 text-center pb-10">
          <h1 className="text-[3vw] text-white uppercase">
            {product.title}
          </h1>
        </div>
      </section>
    
      <div className="flex flex-col p-10 pt-20 gap-10 md:grid grid-cols-1 md:grid-cols-2 ">
        <div className="row-span-2">
          <Image 
            src={product.image} 
            alt={product.title} 
            width={800} 
            height={500}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mt-6">{product.title}</h1>
          <br/>
          
          {/* Pokaż kategorię jeśli istnieje */}
          {product.category && (
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {product.category}
            </span>
          )}
          
          {/* Pokaż badge "Polecane" jeśli produkt jest featured */}
          {product.featured && (
            <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-2">
              Polecane
            </span>
          )}

          <div className="flex flex-col md:grid grid-cols-2">
            <p>Możliwość finansowania</p>
            <p className="text-left md:text-center">Dostępne szkolenia</p>
            <p className="text-2xl text-yellow-600 mt-6">{product.price}</p>

            <a
              href="tel:+48510255279"
              className="mt-10 inline-block bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition text-center"
            >
              Zadzwoń i zamów
            </a>
            <a
              href="https://wa.me/48510255279?text=Hej%2C%20chcia%C5%82bym%20zam%C3%B3wi%C4%87%20produkt%20z%20katalogu.%20Czy%20mo%C5%BCesz%20mi%20pom%C3%B3c%3F"
              className="mt-10 inline-block bg-green-600/90 text-gray-50 px-6 py-3 rounded-lg hover:bg-green-600 transition text-center col-2"
            >
              Napisz na WhatsApp
            </a>
          </div>
        </div>
        <div className="col-2">
          {/* Wyświetl opis jako Markdown */}
          <ReactMarkdown>{product.description || ''}</ReactMarkdown> 
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+48510255279"
              className="inline-block bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition text-center w-full md:w-auto"
            >
              Zadzwoń i zamów
            </a>
            <a
              href="https://wa.me/48510255279?text=Hej%2C%20chcia%C5%82bym%20zam%C3%B3wi%C4%87%20produkt%20z%20katalogu.%20Czy%20mo%C5%BCesz%20mi%20pom%C3%B3c%3F"
              className="inline-block bg-green-600/90 text-gray-50 px-6 py-3 rounded-lg hover:bg-green-600 transition text-center w-full md:w-auto"
            >
              Napisz na WhatsApp
            </a>
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
