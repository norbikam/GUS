import Image from "next/image";
import Particles from "../components/Particles";
import Link from "next/link";

export default function SerwisPage() {
  return (
    <div className="relative w-full pt-24">
      {/* Subtelne gwiazdy w tle */}
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

      {/* Treść strony */}
      <main className="relative z-10 max-w-6xl mx-auto px-8 md:px-10 py-12 md:py-16 flex flex-col gap-10">
        <h1 className="text-4xl md:text-6xl text-white text-center">Serwis</h1>

        {/* Wstęp */}
        <section className="text-center">
          <p className="mt-4 text-lg md:text-2xl font-light md:px-10">
            Zapewniamy kompleksową opiekę serwisową nad Twoimi urządzeniami. Nasza dedykowana ekipa techniczna gwarantuje szybką reakcję i profesjonalne wsparcie, abyś mógł skupić się na tym, co najważniejsze – zadowoleniu Twoich klientów.
          </p>
        </section>

        {/* Separator */}
        <div className="w-full">
          <div className="mx-auto h-[2px] w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Gwarancja i wsparcie */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Karta: Gwarancja */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full">
              <h2 className="text-3xl mb-4">3-letnia gwarancja</h2>
              <p className="text-lg md:text-2xl font-light">
                Każde urządzenie zakupione w <b>GlowUpSkin</b> objęte jest <b>3-letnią gwarancją serwisową</b>. To nasza gwarancja spokoju i pewności, że Twoja inwestycja jest bezpieczna.
                <br />
                <br />
                Gwarancja obejmuje:
              </p>
              <ul className="mt-4 text-lg md:text-xl font-light space-y-2 list-disc list-inside">
                <li>Naprawy i wymianę uszkodzonych części</li>
                <li>Konserwację i przeglądy techniczne</li>
                <li>Wsparcie techniczne przez telefon i email</li>
                <li>Priorytetową obsługę serwisową</li>
              </ul>
            </div>
          </div>

          {/* Karta: Szybka reakcja */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full">
              <h2 className="text-3xl mb-4">Szybka reakcja</h2>
              <p className="text-lg md:text-2xl font-light">
                Rozumiemy, jak ważna jest ciągłość pracy Twojego salonu. Dlatego nasz zespół serwisowy reaguje <b>natychmiast</b> na każde zgłoszenie.
                <br />
                <br />
                Oferujemy:
              </p>
              <ul className="mt-4 text-lg md:text-xl font-light space-y-2 list-disc list-inside">
                <li>Telefoniczne wsparcie techniczne w czasie rzeczywistym</li>
                <li>Zdalną diagnostykę i rozwiązywanie problemów</li>
                <li>Serwis w miejscu instalacji urządzenia</li>
                <li>Zastępcze urządzenia na czas naprawy (opcjonalnie)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="mt-4 w-full">
          <div className="mx-auto h-[2px] w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Konsultant techniczny */}
        <section>
          <h2 className="text-4xl md:text-5xl text-center mb-8">Nasz konsultant techniczny</h2>
          
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
              <div>
                <h2 className="text-3xl text-center">Jacek Olszewski</h2>
                <Image 
                  src="/cooperations/jacek-olszewski.jpg" 
                  alt="Jacek Olszewski" 
                  width={400} 
                  height={400} 
                  className="mx-auto rounded-lg mt-4" 
                />
                <p className="text-center text-gray-300 mt-4">
                  Serwis
                </p>
              </div>
              <div className="flex justify-center align-middle content-center">
                <p className="mt-4 text-lg md:text-2xl font-light text-center">
                  {/* Jacek Olszewski to doświadczony konsultant techniczny specjalizujący się 
                  w sprzęcie medycznym dedykowanym branży kosmetologicznej i medycyny estetycznej. 
                  Dzięki wieloletniemu doświadczeniu w branży, zapewnia kompleksowe wsparcie 
                  techniczne oraz doradztwo w zakresie doboru i obsługi aparatury medycznej.
                  <br />
                  <br />
                  Jako specjalista techniczny, pomaga klientom w optymalizacji wykorzystania 
                  technologii medycznych, zapewniając najwyższe standardy bezpieczeństwa 
                  i efektywności zabiegów. Jego wiedza i praktyczne podejście sprawiają, 
                  że jest cenionym partnerem dla profesjonalistów z branży beauty i medycyny estetycznej. */}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="mt-4 w-full">
          <div className="mx-auto h-[2px] w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Proces serwisowy */}
        <section>
          <h2 className="text-4xl md:text-5xl text-center mb-8">Jak działa nasz serwis?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Krok 1 */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-6 h-full text-center">
                <div className="text-5xl font-bold text-[#d4af37] mb-4">1</div>
                <h3 className="text-2xl mb-3">Zgłoszenie</h3>
                <p className="text-lg font-light">
                  Skontaktuj się z nami telefonicznie lub mailowo. Opisz problem, a my natychmiast rozpoczniemy diagnostykę.
                </p>
              </div>
            </div>

            {/* Krok 2 */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-6 h-full text-center">
                <div className="text-5xl font-bold text-[#d4af37] mb-4">2</div>
                <h3 className="text-2xl mb-3">Diagnostyka</h3>
                <p className="text-lg font-light">
                  Nasz zespół przeprowadzi zdalną lub stacjonarną diagnostykę, aby dokładnie określić przyczynę problemu.
                </p>
              </div>
            </div>

            {/* Krok 3 */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-6 h-full text-center">
                <div className="text-5xl font-bold text-[#d4af37] mb-4">3</div>
                <h3 className="text-2xl mb-3">Naprawa</h3>
                <p className="text-lg font-light">
                  Wykonamy profesjonalną naprawę w najkrótszym możliwym czasie, aby Twoje urządzenie działało jak nowe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-8">
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent inline-block">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm px-10 py-6">
              <h3 className="text-2xl md:text-3xl mb-4">Potrzebujesz wsparcia technicznego?</h3>
              <p className="text-lg font-light mb-6">
                Skontaktuj się z naszym zespołem serwisowym już dziś!
              </p>
              <Link
                href="/kontakt"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#f7e199] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
