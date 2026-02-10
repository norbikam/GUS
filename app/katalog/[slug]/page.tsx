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
import FinancingPartner from "@/app/components/FinancingPartner";
import Particles from "@/app/components/Particles"; // Upewnij się, że ścieżka jest poprawna

type Props = {
  params: Promise<{ slug: string }>;
};

// --- Ikony SVG ---
const Icons = {
  Phone: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  WhatsApp: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.304-5.291c0-5.449 4.432-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.894a9.825 9.825 0 012.893 6.994c-.003 5.45-4.436 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
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

// Funkcja do pobierania losowych produktów
async function getRandomProducts(currentSlug: string, amount: number = 4): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        active: true,
        NOT: {
          slug: currentSlug
        }
      },
      take: amount * 2,
    });
    
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
  
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const relatedProducts = await getRandomProducts(slug, 4);
  const additionalImages = parseImages(product.images);

  // Styl przycisku CTA
  const ctaBtnClass = "flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#f7e199] text-gray-900 font-bold rounded-lg shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.23)] hover:scale-[1.02] transition-all duration-300 transform text-lg";

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-gray-200 selection:bg-[#d4af37] selection:text-black">
      
      {/* Tło Particle i Ambient Light */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-45 md:opacity-55">
        <Particles
          className="w-full h-full"
          particleCount={100}
          particleSpread={10}
          speed={0.005}
          particleColors={["#ffffff", "#f7e199", "#d4af37"]}
          particleBaseSize={60}
          sizeRandomness={0.5}
          moveParticlesOnHover={false}
        />
      </div>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#d4af37]/5 rounded-full blur-[120px]" />
      </div>

      {/* --- GŁÓWNA TREŚĆ --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 flex flex-col gap-16">
        
        {/* SEKCJA HERO: Galeria + Detale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEWA STRONA: Galeria */}
          <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
            <ProductGallery
              mainImage={product.image || '/placeholder.png'}
              additionalImages={additionalImages}
              productTitle={product.title}
            />
          </div>

          {/* PRAWA STRONA: Opis i CTA */}
          <div className="flex flex-col h-full justify-center space-y-8">
            <div>
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-[#d4af37] uppercase border border-[#d4af37]/30 rounded-full bg-[#d4af37]/10">
                {product.category || "Urządzenie Premium"}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                {product.title}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#d4af37] to-transparent mt-6 rounded-full" />
            </div>

            {/* Cena (opcjonalnie) */}
            {/* <p className="text-3xl text-[#d4af37] font-light">{product.price}</p> */}

            <p className="text-lg text-gray-400 font-light leading-relaxed">
              Zapewnij swojemu salonowi przewagę dzięki najnowszej technologii. Skontaktuj się z nami, aby poznać szczegóły oferty i możliwości finansowania.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="tel:+48510255279" className={ctaBtnClass}>
                <Icons.Phone />
                Zadzwoń i zamów
              </a>
              <a
                href={`https://wa.me/48510255279?text=Dzień%20dobry%2C%20jestem%20zainteresowany%20produktem%3A%20${encodeURIComponent(product.title)}`}
                className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/10 text-white font-bold rounded-lg hover:bg-white/20 hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300 text-lg"
              >
                <Icons.WhatsApp />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* SEKCJA TREŚCI: PDF Viewer LUB Opis Markdown */}
        <div className="grid grid-cols-1 gap-12 mt-8">
           {/* Jeśli jest PDF */}
           {product.pdfUrl && (
            <div className="w-full flex flex-col gap-6">
              <h2 className="text-3xl font-light text-center md:text-left text-white">Specyfikacja i Broszura</h2>
              <div className="w-full h-full min-h-[600px] md:min-h-[800px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                 <PdfViewer pdfUrl={product.pdfUrl} />
              </div>
              {/* Ukryty opis dla SEO gdy jest PDF */}
              <div className="hidden">{product.description}</div>
            </div>
           )}

           {/* Jeśli NIE MA PDF -> Pokaż ładny Markdown */}
           {!product.pdfUrl && (
             <div className="w-full max-w-4xl mx-auto">
                <div className="prose prose-lg prose-invert max-w-none prose-headings:text-[#d4af37] prose-headings:font-light prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300">
                  <ReactMarkdown>{product.description ?? ''}</ReactMarkdown>
                </div>
             </div>
           )}
        </div>

        {/* SEKCJA VIDEO */}
        {product.youtubeUrl && (
          <div className="w-full max-w-5xl mx-auto mt-8 p-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent">
             <div className="rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-sm p-6 md:p-10 border border-white/5">
                <h2 className="text-3xl font-light mb-8 text-center text-white">Zobacz produkt w akcji</h2>
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <YouTubeEmbed url={product.youtubeUrl} title={product.title} />
                </div>
             </div>
          </div>
        )}

        <div className="w-full">
           <FinancingPartner />
        </div>
        
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

        {/* SEKCJA: INNE PRODUKTY */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
             <h2 className="text-3xl font-light text-white">Zobacz inne produkty</h2>
             <Link href="/katalog" className="text-[#d4af37] hover:text-white transition-colors text-sm uppercase tracking-wider font-semibold">
                Wróć do katalogu &rarr;
             </Link>
          </div>
          
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/katalog/${relatedProduct.slug}`} className="group h-full">
                  <div className="relative h-full flex flex-col bg-[#111] border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#d4af37]/40 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-white/5 to-transparent overflow-hidden p-4">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-grow p-5 bg-[#0a0a0a]">
                      <h2 className="text-base font-medium text-gray-200 group-hover:text-[#d4af37] transition-colors line-clamp-2">
                        {relatedProduct.title}
                      </h2>
                      <div className="mt-4 pt-4 border-t border-white/5 w-full text-center">
                          <span className="text-xs text-gray-500 group-hover:text-white transition-colors uppercase tracking-widest">Szczegóły</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic py-10">Brak innych produktów do wyświetlenia</p>
          )}
        </div>

      </div>
    </div>
  );
}