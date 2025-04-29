import { products } from "@/app/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

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
    
    <div className="p-10 pt-20 gap-10 grid grid-cols-1 md:grid-cols-2">
      <Image src={product.image} alt={product.title} width={800} height={500} />
      <div>
        <h1 className="text-3xl font-bold mt-6">{product.title}</h1>
        <br/>
        <ReactMarkdown>{product.description}</ReactMarkdown>
        <p>Możliwość płatności ratalnej do 12 rat 0%</p>
        <p className="text-2xl text-yellow-600 mt-6">{product.price}</p>

        <a
          href="tel:+48510255279"
          className="mt-10 inline-block bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
        >
          Zadzwoń i zamów
        </a>
      </div>
    </div>
    </div>
  );
}
