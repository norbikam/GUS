import { products } from "@/app/products";
import Link from "next/link";
import Image from "next/image";

export default function KatalogPage() {
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
      <h1 className="text-4xl md:text-6xl text-white uppercase">
        Urządzenia
      </h1>
    </div>
  </section>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-10 pt-30">
        
      {products.map((product) => (
        <Link key={product.title} href={`/katalog/${product.slug}`}>
          <div className="border rounded overflow-hidden shadow hover:shadow-lg transition items-center justify-center flex flex-col text-center">
            <Image src={product.image} alt={product.title} height={400} width={300}  />
                <div className="py-4">
                <h2 className="text-xl font-bold border-t">{product.title}</h2>
                <p className="text-gray-600 border-b">{product.price}</p>  
            </div>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
}
