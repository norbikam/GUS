import { products } from "../../products";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function ProductPage({ params }: { params: { slug: string } }) {
    const product = products.find((p) => p.slug === params.slug);
  
    if (!product) return notFound();

  return (
    <div className="p-10 flex justify-center items-center gap-10">
      <Image src={product.image} alt={product.title} width={800} height={500} />
      <div>
      <h1 className="text-3xl font-bold mt-6">{product.title}</h1>
      <p className="text-gray-700 mt-4">{product.description}</p>
      <p className="text-2xl text-yellow-600 mt-6">{product.price}</p>

      <a
        href="tel:+48123456789"
        className="mt-10 inline-block bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
      >
        Zadzwoń i zamów
      </a>
      </div>
    </div>
  );
}
