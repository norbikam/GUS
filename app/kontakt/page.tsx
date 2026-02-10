"use client";

import { useState } from "react";
import Particles from "../components/Particles";

// Proste ikony SVG dla lepszej czytelności
const Icons = {
  Phone: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  WhatsApp: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.304-5.291c0-5.449 4.432-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.894a9.825 9.825 0 012.893 6.994c-.003 5.45-4.436 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
};

export default function ContactPage() {
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
      setMessage("Dziękujemy! Wiadomość została wysłana pomyślnie.");
      setError(false);
      (event.target as HTMLFormElement).reset();
    } else {
      setMessage("Wystąpił błąd podczas wysyłania. Spróbuj ponownie.");
      setError(true);
    }
  };

  // Styl inputów
  const inputClass = "w-full border border-white/10 bg-white/5 p-4 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all duration-300";

  // Styl przycisków kontaktowych
  const contactBtnClass = "flex items-center justify-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all duration-300 group";

  return (
    <div className="relative w-full pt-24 min-h-screen bg-[#050505] text-gray-200">
      
      {/* Tło Particle */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-45 md:opacity-55">
        <Particles
          className="w-full h-full"
          particleCount={120}
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

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16 flex flex-col gap-12">
        
        {/* Nagłówek */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 pb-2">
            Skontaktuj się z nami
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Jesteśmy tu, aby odpowiedzieć na Twoje pytania i pomóc w doborze najlepszych rozwiązań dla Twojego salonu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEWA KOLUMNA: Dane kontaktowe */}
          <section className="h-full">
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent h-full">
              <div className="rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-10 h-full border border-white/5 flex flex-col justify-between">
                
                <div>
                  <h2 className="text-2xl md:text-3xl font-light text-[#d4af37] mb-6">Hurtownia GlowUpSkin Medic</h2>
                  <p className="text-gray-300 font-light leading-relaxed mb-8">
                    Nasi profesjonalni konsultanci przygotują najlepszą ofertę produktów oraz najkorzystniejsze rozwiązania związane z finansowaniem sprzętu.
                  </p>

                  <div className="space-y-6">
                    {/* Główny kontakt */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white">Biuro Obsługi Klienta</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center gap-3 hover:text-[#d4af37] transition-colors">
                          <span className="text-[#d4af37]"><Icons.Phone/></span>
                          <a href="tel:+48510255279">+48 510 255 279</a>
                        </li>
                        <li className="flex items-center gap-3 hover:text-[#d4af37] transition-colors">
                          <span className="text-[#d4af37]"><Icons.WhatsApp/></span>
                          <a href="https://wa.me/48510255279">+48 510 255 279</a>
                        </li>
                        <li className="flex items-center gap-3 hover:text-[#d4af37] transition-colors">
                          <span className="text-[#d4af37]"><Icons.Mail/></span>
                          <a href="mailto:kontakt@gus-medic.pl">kontakt@gus-medic.pl</a>
                        </li>
                      </ul>
                    </div>

                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Specjalista */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white">Specjalista ds. Sprzedaży</h3>
                      <p className="text-[#d4af37]">Tomasz Kwiatkowski</p>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center gap-3 hover:text-[#d4af37] transition-colors">
                          <span className="text-[#d4af37]"><Icons.Phone/></span>
                          <a href="tel:+48512667434">+48 512 667 434</a>
                        </li>
                        <li className="flex items-center gap-3 hover:text-[#d4af37] transition-colors">
                          <span className="text-[#d4af37]"><Icons.Mail/></span>
                          <a href="mailto:t.kwiatkowski@gus-medic.pl">t.kwiatkowski@gus-medic.pl</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Dane firmowe footer */}
                <div className="mt-10 pt-6 border-t border-white/10 text-sm text-gray-500">
                  <p>Robert Morawski</p>
                  <p>NIP: 839-255-66-23</p>
                </div>

              </div>
            </div>
          </section>

          {/* PRAWA KOLUMNA: Formularz */}
          <section>
             {/* Szybkie przyciski */}
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <a href="tel:+48510255279" className={contactBtnClass}>
                <Icons.Phone /> <span className="font-medium">Zadzwoń</span>
              </a>
              <a href="https://wa.me/48510255279" className={contactBtnClass}>
                <Icons.WhatsApp /> <span className="font-medium">WhatsApp</span>
              </a>
              <a href="mailto:kontakt@gus-medic.pl" className={contactBtnClass}>
                <Icons.Mail /> <span className="font-medium">Napisz</span>
              </a>
            </div>

            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent">
              <div className="rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-10 border border-white/5">
                <form className="w-full space-y-4" onSubmit={onSubmit}>
                  <h2 className="text-2xl font-light mb-6">Napisz wiadomość</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="first_name" type="text" placeholder="Imię" className={inputClass} required />
                    <input name="last_name" type="text" placeholder="Nazwisko" className={inputClass} required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input name="email" type="email" placeholder="E-mail" className={inputClass} required />
                     <input name="phone" type="tel" placeholder="Telefon" className={inputClass} required />
                  </div>

                  <textarea 
                    name="message" 
                    placeholder="W czym możemy Ci pomóc?" 
                    className={`${inputClass} h-32 resize-none`} 
                    required
                  ></textarea>
                  
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#f7e199] text-gray-900 font-bold rounded-lg shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.23)] hover:scale-[1.02] transition-all duration-300 transform text-lg"
                  >
                    Wyślij wiadomość
                  </button>

                  {message && (
                    <div className={`mt-4 p-4 rounded-lg text-center text-sm font-medium border ${error ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-green-500/10 border-green-500/30 text-green-400"}`}>
                      {message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}