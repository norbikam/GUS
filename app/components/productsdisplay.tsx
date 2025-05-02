import Image from "next/image";
import Link from "next/link";
import { products } from "@/app/products";

type ProductsDisplayProps = {
  amount: number;
};

export function ProductsDisplay({amount}: ProductsDisplayProps) {
    return(
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10 pt-0 w-full">
        {products.slice(0, amount).map((product) => (
          <Link key={product.title} href={`/katalog/${product.slug}`}>
            <div className="overflow-hidden shadow hover:shadow-lg transition items-center justify-center flex flex-col text-center">
              <Image src={product.image} alt={product.title} height={400} width={300}  />
              <div className="py-4">
                <h2 className="text-xl font-bold pt-1">{product.title}</h2>
                <p className="text-gray-600 border-b">{product.price}</p>  
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
}