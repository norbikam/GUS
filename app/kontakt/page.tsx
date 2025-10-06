"use client";

import { useState } from "react";

import Particles from "../components/Particles";

export default function KatalogPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    formData.append("access_key", "8e25ac27-84df-4f70-9120-5b852a0e458a");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      setMessage("Wiadomość została wysłana!");
      setError(false);
      (event.target as HTMLFormElement).reset();
    } else {
      setMessage("Wystąpił błąd. Spróbuj ponownie.");
      setError(true);
    }
  };
  return (
    <div className="relative w-full pt-24">
      {/* Subtelne gwiazdki w tle (jak na O nas / Home) */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-45 md:opacity-55">
        <Particles
          className="w-full h-full"
          particleCount={260}
          particleSpread={9}
          speed={0.006}
          particleColors={["#ffffff", "#f7e199", "#d4af37"]}
          alphaParticles={false}
          particleBaseSize={70}
          sizeRandomness={0.45}
          cameraDistance={22}
          moveParticlesOnHover={false}
        />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-8 md:px-10 py-12 md:py-16 flex flex-col gap-10">
        <h1 className="text-4xl md:text-6xl text-white text-center">Kontakt</h1>

        {/* Jedna karta glass na górze z przyciskami na dole */}
        <section className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
          <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full flex flex-col">
            <h2 className="text-3xl">Hurtownia kosmetyczna GlowUpSkin Medic</h2>
            <p className="mt-4 text-lg font-light">
              Zapraszamy serdecznie do kontaktu. Postaramy się odpowiedzieć na wszystkie pytania, które Państwa nurtują. Nasi profesjonalni konsultanci przygotują najlepszą ofertę produktów oraz najkorzystniejsze rozwiązania związane z finansowaniem sprzętu.
            </p>
            <h3 className="text-2xl mt-6">Dane kontaktowe</h3>
            <ul className="mt-2 text-lg font-light space-y-1">
              <li>Telefon: +48 510 255 279</li>
              <li>E-mail: glowupskinpl@gmail.com</li>
              <li>WhatsApp: +48 510 255 279</li>
              <li className="opacity-50">---</li>
              <li>Robert Morawski</li>
              <li>ul. Perłowa 13a</li>
              <li>76-270 Ustka</li>
              <li>NIP: 839-255-66-23</li>
            </ul>
            {/* Przyciski na samym dole karty, równe rozmiary */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href="tel:+48510255279" className="h-12 flex items-center justify-center bg-yellow-500 text-gray-800 rounded-lg hover:bg-yellow-600 transition w-full text-base md:text-lg">Zadzwoń</a>
              <a href="https://wa.me/48510255279?text=Hej%2C%20chcia%C5%82bym%20zam%C3%B3wi%C4%87%20produkt%20z%20katalogu.%20Czy%20mo%C5%BCesz%20mi%20pom%C3%B3c%3F" className="h-12 flex items-center justify-center bg-yellow-500 text-gray-800 rounded-lg hover:bg-yellow-600 transition w-full text-base md:text-lg">WhatsApp</a>
              <a href="mailto:glowupskinpl@gmail.com" className="h-12 flex items-center justify-center bg-yellow-500 text-gray-800 rounded-lg hover:bg-yellow-600 transition w-full text-base md:text-lg">E‑mail</a>
            </div>
          </div>
        </section>

        {/* Karta z formularzem */}
        <section className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
          <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8">
            <form className="w-full" onSubmit={onSubmit}>
              <h2 className="text-3xl">Formularz kontaktowy</h2>
              <div className="flex flex-col md:grid grid-cols-2 gap-4 mt-4 w-full">
                <input name="first_name" type="text" placeholder="Imię" className="border border-white/10 bg-black/20 p-3 rounded" required />
                <input name="last_name" type="text" placeholder="Nazwisko" className="border border-white/10 bg-black/20 p-3 rounded" required />
                <input name="email" type="email" placeholder="E-mail" className="border border-white/10 bg-black/20 p-3 rounded" required />
                <input name="phone" type="tel" placeholder="Telefon" className="border border-white/10 bg-black/20 p-3 rounded" required />
              </div>
              <textarea name="message" placeholder="Wiadomość" className="border border-white/10 bg-black/20 p-3 rounded mt-4 w-full h-32 resize-none" required></textarea>
              <button type="submit" className="mt-4 bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition w-full">Wyślij</button>

              {message && (
                <div className={`mt-4 p-4 rounded-lg text-center transition ${error ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
