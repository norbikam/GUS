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
    
      <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-center items-stretch font-light text-center px-0 p-10 pt-20 gap-10">
        <div className="p-6 pl-0 pb-0">
          <div className="relative w-full pt-[56.25%] md:min-h-[420px] rounded-lg overflow-hidden">
            <Image src={product.image} alt={product.title} fill className="object-contain" />
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
              className="inline-block bg-green-600/90 text-gray-50 px-6 py-3 rounded-lg hover:bg-green-600 transition text-center w-full sm:w-auto"
            >
              Napisz na WhatsApp
            </a>
          </div>
          {/* 4) Opis */}
          <div className="mt-8 prose prose-invert max-w-none">
            <ReactMarkdown>{product.description || ''}</ReactMarkdown>
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
