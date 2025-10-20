import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ReactMarkdown from 'react-markdown';
import ProductGallery from '@/app/components/ProductGallery';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug }
  });

  return product;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  // Przygotuj tablicę zdjęć - główne + dodatkowe
  const allImages = [product.image, ...(product.images || [])].filter(Boolean);

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-yellow-500 transition">
            Strona główna
          </Link>
          <span>/</span>
          <Link href="/katalog" className="hover:text-yellow-500 transition">
            Katalog
          </Link>
          <span>/</span>
          <span className="text-gray-200">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galeria zdjęć */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={allImages} title={product.title} />
          </div>

          {/* Informacje o produkcie */}
          <div className="space-y-6">
            {/* Kategoria i status */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.category && (
                <Link
                  href={`/katalog?category=${product.category}`}
                  className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm hover:bg-blue-500/30 transition"
                >
                  {product.category}
                </Link>
              )}
              {product.featured && (
                <span className="inline-flex items-center px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                  ⭐ Polecane
                </span>
              )}
            </div>

            {/* Tytuł */}
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {product.title}
            </h1>

            {/* Cena */}
            <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl">
              <div className="text-sm text-gray-400 mb-2">Cena</div>
              <div className="text-4xl font-bold text-yellow-500">
                {product.price}
              </div>
            </div>

            {/* Przyciski akcji */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/kontakt"
                className="flex-1 min-w-[200px] bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg transition text-center"
              >
                Zapytaj o produkt
              </Link>
              <button className="p-4 bg-gray-900/30 hover:bg-gray-900/50 border border-white/10 rounded-lg transition">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Opis produktu */}
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown>{product.description || 'Brak opisu'}</ReactMarkdown>
            </div>

            {/* Tagi */}
            {product.tags && (
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-sm text-gray-400 mb-3">Tagi</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.split(',').map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-900/30 border border-white/10 rounded-full text-sm text-gray-300"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Sekcja podobnych produktów (opcjonalnie) */}
        {/* Możesz tutaj dodać sekcję z podobnymi produktami */}
      </div>
    </div>
  );
}
