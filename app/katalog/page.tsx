import { products } from "../products";
import Link from "next/link";
import Image from "next/image";

export default function KatalogPage() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-10 pt-30">
      {products.map((product) => (
        <Link key={product.id} href={`/katalog/${product.slug}`}>
          <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition items-center justify-center flex flex-col text-center">
            <Image src={product.image} alt={product.title} width={300} height={400} />
            <div className="p-4">
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="text-gray-600">{product.price}</p>  
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
