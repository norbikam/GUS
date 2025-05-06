"use client";

import { useState } from "react";

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
            <h1 className="text-4xl">Hurtownia kosmetyczna GlowUpSkin Medic</h1>
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
        <div className="grid items-center justify-center text-center w-full">
        <a
              href="tel:+48510255279"
              className="mt-10 inline-block bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition w-full md:w-auto"
            >
              Zadzwoń
            </a>
            <a
              href="https://wa.me/48510255279?text=Hej%2C%20chcia%C5%82bym%20zam%C3%B3wi%C4%87%20produkt%20z%20katalogu.%20Czy%20mo%C5%BCesz%20mi%20pom%C3%B3c%3F"
              className="mt-10 inline-block bg-green-600/90 text-gray-50 px-6 py-3 rounded-lg hover:bg-green-600 transition w-full md:w-auto"
            >
              Napisz na WhatsApp
            </a>
            <a
              href="mailto:glowupskinpl@gmail.com"
              className="mt-10 inline-block bg-blue-600/90 text-gray-50 px-6 py-3 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
            >
              Wyślij maila
            </a>
          </div>
          <div className="flex flex-col items-center justify-center text-center col-span-2">
          <form className="md:w-full md:px-20" onSubmit={onSubmit}>
      <h1 className="text-3xl mt-6">Formularz kontaktowy</h1>
      <div className="flex flex-col md:grid grid-cols-2 gap-4 mt-4 w-full">
        <input name="first_name" type="text" placeholder="Imię" className="border p-2 rounded" required />
        <input name="last_name" type="text" placeholder="Nazwisko" className="border p-2 rounded" required />
        <input name="email" type="email" placeholder="E-mail" className="border p-2 rounded" required />
        <input name="phone" type="tel" placeholder="Telefon" className="border p-2 rounded" required />
      </div>
      <textarea name="message" placeholder="Wiadomość" className="border p-2 rounded mt-4 w-full h-32 resize-none" required></textarea>
      <button type="submit" className="mt-4 bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition w-full">Wyślij</button>

      {message && (
        <div
          className={`mt-4 p-4 rounded-lg text-center transition ${
            error ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          {message}
        </div>
      )}
    </form>
          </div>
    </div>
    </div>
  );
}
