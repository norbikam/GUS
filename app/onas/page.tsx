"use client";

import React from "react";
import Image from "next/image";
import Particles from "../components/Particles";
import FinancingPartner from "../components/FinancingPartner";

// --- DANE EKSPERTÓW ---
// Tutaj możesz łatwo dodawać, usuwać lub odkomentowywać osoby.
const expertsData = [
  // {
  //   name: "Dr n. med. Michał Ekkert",
  //   image: "/cooperations/michal-ekkert.jpeg",
  //   role: (
  //     <>
  //       Właściciel placówki szkoleniowej <br /> Ekspert laseroterapii <br /> Wykształcenie i kwalifikacje akademickie <br /> Szkolenia
  //     </>
  //   ),
  //   description: (
  //     <>
  //       Dr Michał Ekkert, absolwent Śląskiej Akademii Medycznej i doktor nauk medycznych, od ponad 25 lat łączy praktykę kliniczną z działalnością naukową i dydaktyczną. Kierownik studiów podyplomowych z zakresu medycyny estetycznej dla lekarzy. Jest założycielem Instytutu Kosmetologii i Badań Leków, gdzie prowadzi szkolenia i projekty badawcze w zakresie medycyny estetycznej i laseroterapii.
  //       <br /><br />
  //       Jako główny ekspert szkoleniowy Glowupskin, realizuje autorskie programy edukacyjne dla lekarzy i kosmetologów, obejmujące m.in. laseroterapię frakcyjną, pikosekundową oraz terapie z wykorzystaniem technologii INDIBA® 448 kHz. Łącząc wiedzę akademicką z praktyką kliniczną, dr Ekkert promuje bezpieczne i świadome podejście do medycyny estetycznej.
  //     </>
  //   ),
  //   extraImage: "/cooperations/michal-ekkert-qr.webp", // Opcjonalny QR kod
  // },
  {
    name: "Edyta Babula-Frątczak",
    image: "/cooperations/edyta-babula-fratczak.jpeg",
    role: (
      <>
        Ekspert, dydaktyk, założycielka Warszawskiej Szkoły Medycyny Estetycznej i Kosmetologii<br />Ekspert, Szkolenia
      </>
    ),
    description: (
      <>
        Edyta Babula-Frątczak to ceniony autorytet w branży kosmetologicznej i medycyny estetycznej. Posiada unikalne, interdyscyplinarne wykształcenie, łączące specjalizację w marketingu z zaawansowaną kosmetologią.
        <br /><br />
        Jako właściciel i główny dydaktyk Warszawskiej Szkoły Medycyny Estetycznej i Kosmetologii, Edyta jest pionierem w kreowaniu innowacyjnych programów edukacyjnych. Jej misją jest nie tylko przekazywanie wiedzy, ale i wdrażanie najwyższych standardów zawodowych.
      </>
    ),
  },
  {
    name: "Anna Goc",
    image: "/cooperations/anna-goc.jpg",
    role: "Absolwentka Śląskiego Uniwersytetu Medycznego w Katowicach na kierunku Kosmetologia",
    description: (
      <>
        Doświadczenie zawodowe zdobywała, pracując w wiodących firmach branży kosmetycznej i medycyny estetycznej. Specjalizuje się w peelingach chemicznych oraz terapiach anti-aging, łącząc wiedzę naukową z doświadczeniem praktycznym.
        <br /><br />
        Nieustannie poszerza swoją wiedzę, uczestnicząc w szkoleniach i konferencjach branżowych. Z pasją łączy nowoczesne technologie z klasycznymi metodami pielęgnacji.
      </>
    ),
  },
  {
    name: "Tomasz Kwiatkowski",
    image: "/cooperations/tomasz-kwiatkowski.png",
    role: (
      <>
        Specjalista Hi-Tech<br />
        Szkoleniowiec i Konsultant Technologii Medycznych<br />
        Ekspert Medycyny Estetycznej
      </>
    ),
    description: (
      <>
        Tomasz Kwiatkowski to specjalista Hi-Tech z ponad 20-letnim doświadczeniem w medycynie. Na co dzień współpracuje z gabinetami kosmetologicznymi oraz klinikami medycyny estetycznej, wspierając ich zespoły w podnoszeniu kwalifikacji.
        <br /><br />
        Prywatnie – pasjonat fotografii przyrodniczej, off-roadu oraz motoryzacji.
      </>
    ),
  },
  {
    name: "Alan Dąbrowski",
    image: "/cooperations/alan-dabrowski.png",
    role: "Założyciel Alan Dąbrowski Academy, jedyny polski trener akredytowany w brytyjskiej organizacji Beauty ITEC",
    description: (
      <>
        Alan Dąbrowski to uznany ekspert i wizjoner w dziedzinie edukacji kosmetologicznej. Jako założyciel Alan Dąbrowski Academy, stworzył miejsce oferujące edukację zawodową na najwyższym poziomie.
        <br /><br />
        Jest jedynym polskim trenerem zrzeszonym i akredytowanym w brytyjskiej rządowej organizacji Beauty ITEC, co gwarantuje międzynarodowe standardy edukacji.
      </>
    ),
  },
  // --- ZAKOMENTOWANI EKSPERCI (Odkomentuj aby pokazać) ---
  /*
  {
    name: "Sławomir Sobusiak",
    image: "/cooperations/slawomir-sobusiak.jpg",
    role: "Ekspert w dziedzinie medycyny estetycznej, wykładowca, prelegent",
    description: "Sławomir Sobusiak to uznany ekspert..."
  },
  {
    name: "Magda Batraniec",
    image: "/cooperations/magda-batraniec.jpeg",
    role: "Specjalistka ds. Strategii i Komunikacji GUS Medic",
    description: "Magda Batraniec to jedna z kluczowych ekspertek..."
  },
  */
];

export default function OnasPage() {
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

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16 flex flex-col gap-16">
        
        {/* NAGŁÓWEK GŁÓWNY */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffedb3] to-[#d4af37] font-light">
            O nas
          </h1>
          <div className="h-[1px] w-24 mx-auto bg-[#d4af37]" />
          <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed">
            Jesteśmy firmą zajmującą się sprzedażą najwyższej klasy urządzeń dla salonów medycyny estetycznej. 
            Nasza oferta obejmuje szeroki zakres asortymentu sprzętu, który pomoże Ci zapewnić najwyższy poziom usług dla Twoich klientów.
          </p>
        </section>

        {/* FILOZOFIA I OFERTA (GLASS CARDS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Karta: Filozofia */}
          <div className="group p-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:via-[#d4af37]/20 transition-all duration-500">
            <div className="rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-md p-8 h-full border border-white/5">
              <h2 className="text-3xl text-[#d4af37] mb-6 font-light">Nasza filozofia</h2>
              <div className="text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  W <b className="text-white">GlowUpSkin</b> łączymy jakość z dostępnością. Oferujemy urządzenia w różnych klasach cenowych, tak by zarówno profesjonaliści oczekujący <b className="text-white">najwyższej precyzji</b>, jak i osoby poszukujące rozsądnych cen, mogły znaleźć u nas idealne rozwiązanie.
                </p>
                <p>
                  Nieustannie dostosowujemy ofertę do dynamicznych potrzeb rynku, wprowadzając produkty i formuły, które stanowią odpowiedź na najnowsze osiągnięcia branży.
                </p>
                <p>
                  Naszym celem jest, abyś znalazł u nas wszystko, co sprawi, że Twój salon będzie <b className="text-white">nowoczesny, ekskluzywny i profesjonalny</b>.
                </p>
              </div>
            </div>
          </div>

          {/* Karta: Oferta */}
          <div className="group p-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:via-[#d4af37]/20 transition-all duration-500">
            <div className="rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-md p-8 h-full border border-white/5">
              <h2 className="text-3xl text-[#d4af37] mb-6 font-light">Nasza oferta</h2>
              <div className="text-gray-300 font-light leading-relaxed space-y-4">
                <p>
                  Zapewniamy starannie wyselekcjonowane, najwyższej jakości urządzenia, które gwarantują skuteczność i niezawodność w Twoim salonie.
                </p>
                <p>
                  Każda zakupiona u nas aparatura objęta jest <b className="text-white">3-letnią gwarancją serwisową</b>, co daje Ci spokój i bezpieczeństwo. Dostarczamy sprzęt bezpośrednio do Twojego salonu.
                </p>
                <p>
                  Dodatkowo, oferujemy szkolenia z obsługi prowadzone <b className="text-white">na miejscu</b>, abyś Ty i Twój zespół mogli w pełni wykorzystać potencjał urządzeń od pierwszego dnia.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FinancingPartner />

        {/* Separator */}
        <div className="w-full py-8">
          <div className="mx-auto h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
        </div>

        {/* SEKCJA WSPÓŁPRACE */}
        <section className="flex flex-col gap-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light mb-4">Współprace i Eksperci</h1>
            <p className="text-gray-400">Ludzie, którzy tworzą jakość GlowUpSkin</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {expertsData.map((expert, index) => (
              <div key={index} className="p-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                <div className="rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md p-6 md:p-10 h-full border border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* LEWA STRONA: Zdjęcie + Rola */}
                    <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center">
                      <h2 className="text-2xl md:text-3xl text-center mb-6 text-[#d4af37] font-light md:hidden">
                        {expert.name}
                      </h2>
                      
                      <div className="relative w-full max-w-[300px] aspect-square rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
                        <Image
                          src={expert.image}
                          alt={expert.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* QR Code jeśli istnieje */}
                        {/* {expert.extraImage && (
                          <div className="absolute top-3 left-3 w-24 h-24 bg-white p-1 rounded-lg shadow-lg">
                            <Image
                              src={expert.extraImage}
                              alt="QR Code"
                              width={100}
                              height={100}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )} */}
                      </div>
                      
                      <div className="mt-6 text-center text-sm md:text-base text-gray-400 border-t border-white/10 pt-4 w-full">
                        {expert.role}
                      </div>
                    </div>

                    {/* PRAWA STRONA: Opis */}
                    <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-center text-center md:text-left">
                       <h2 className="text-3xl md:text-4xl mb-6 text-[#d4af37] font-light hidden md:block">
                        {expert.name}
                      </h2>
                      <div className="text-gray-300 text-lg font-light leading-relaxed">
                        {expert.description}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}