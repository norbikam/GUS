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
        kontakt
      </h1>
    </div>
  </section>
    <div className="flex flex-col md:grid grid-cols-2 gap-10 p-10 pt-20">
        <div>
            <h1 className="text-4xl">Hurtownia kosmetyczna GlowUp Machine</h1>
            <p>Zapraszamy serdecznie do kontaktu. Postaramy się odpowiedzieć na wszystkie pytania, które Państwa nurtują. Nasi profesjonalni konsultanci przygotują najlepszą ofertę produktów oraz najkorzystniejsze rozwiązania związane z finansowaniem sprzętu.</p>
            <br></br>
            <h1 className="text-3xl mt-6">Dane kontaktowe:</h1>
            <ul className="text-lg font-light">
                <li>Telefon: +48 510 255 279</li>
                <li>E-mail: glowupskinpl@gmail.com</li>
                <li>WhatsApp: +48 510 255 279</li>
                <li>---</li>
                <li>Robert Morawski</li>
                <li>ul. Perłowa 13a</li>
                <li>76-270 Ustka</li>
                <li>NIP: 839-255-66-23</li>
            </ul>
        </div>
    </div>
    </div>
  );
}
