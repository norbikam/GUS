import Image from "next/image";
import Particles from "../components/Particles";
import Link from "next/link";

export default function AmbasadorzyPage() {
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
        <h1 className="text-4xl md:text-6xl text-white text-center">Ambasadorzy</h1>

        {/* Wstęp */}
        <section className="text-center">
          <p className="mt-4 text-lg md:text-2xl font-light md:px-10">
            Współpracujemy z najlepszymi ekspertami w dziedzinie medycyny estetycznej i kosmetologii. 
            Nasi ambasadorzy to uznane autorytety, które dzielą się swoją wiedzą, doświadczeniem 
            i pasją do doskonałości w branży beauty.
          </p>
        </section>

        {/* Separator */}
        <div className="w-full">
          <div className="mx-auto h-[2px] w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Co to znaczy być ambasadorem */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Karta: Nasza misja */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full">
              <h2 className="text-3xl mb-4">Nasza misja</h2>
              <p className="text-lg md:text-2xl font-light">
                W <b>GlowUpSkin</b> wierzymy, że sukces w branży beauty wymaga nie tylko 
                najlepszego sprzętu, ale także <b>wiedzy i doświadczenia ekspertów</b>.
                <br />
                <br />
                Dlatego nawiązaliśmy współpracę z wybitnymi specjalistami, którzy:
              </p>
              <ul className="mt-4 text-lg md:text-xl font-light space-y-2 list-disc list-inside">
                <li>Testują i rekomendują nasze urządzenia</li>
                <li>Dzielą się swoją wiedzą podczas szkoleń</li>
                <li>Wspierają rozwój branży medycyny estetycznej</li>
                <li>Inspirują do osiągania najwyższych standardów</li>
              </ul>
            </div>
          </div>

          {/* Karta: Korzyści współpracy */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full">
              <h2 className="text-3xl mb-4">Korzyści współpracy</h2>
              <p className="text-lg md:text-2xl font-light">
                Współpraca z naszymi ambasadorami to gwarancja, że oferujemy produkty 
                <b> przetestowane przez najlepszych</b>.
                <br />
                <br />
                Dzięki nim zapewniamy:
              </p>
              <ul className="mt-4 text-lg md:text-xl font-light space-y-2 list-disc list-inside">
                <li>Najwyższe standardy jakości urządzeń</li>
                <li>Profesjonalne szkolenia i wsparcie</li>
                <li>Dostęp do sprawdzonych protokołów zabiegowych</li>
                <li>Ciągły rozwój i innowacje w ofercie</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="mt-4 w-full">
          <div className="mx-auto h-[2px] w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Nasi ambasadorzy */}
        <section>
          <h2 className="text-4xl md:text-5xl text-center mb-8">Poznaj naszych ambasadorów</h2>

          <div className="grid grid-cols-1 gap-8">
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
              <div>
                <h2 className="text-3xl text-center">Joanna Majdaniuk</h2>
                <Image 
                  src="/cooperations/joanna-majdaniuk.jpeg" 
                  alt="Joanna Majdaniuk" 
                  width={400} 
                  height={400} 
                  className="mx-auto rounded-lg mt-4" 
                />
                <p className="text-center text-gray-300 mt-4">
                  Ambasadorka marki<br />
                  Ekspertka z ogromnym doświadczeniem w medycynie estetycznej<br />
                  Specjalistka od makijażu permanentnego i ceniona szkoleniowiec
                </p>
              </div>
              <div className="flex justify-center align-middle content-center">
                <p className="mt-4 text-lg md:text-2xl font-light text-center">
                  Joanna Majdaniuk to ekspertka z ogromnym doświadczeniem w medycynie estetycznej, 
                  specjalistka od makijażu permanentnego oraz ceniona szkoleniowiec. Prowadzi 
                  &quot;Permanent make up & Aesthetic by Joanna Majdaniuk&quot; – centrum szkoleniowe 
                  specjalizujące się w medycynie estetycznej i makijażu permanentnym.
                  <br />
                  <br />
                  Jest certyfikowaną linergistką na poziomie Master, która każdego dnia doskonali 
                  swoje umiejętności. Specjalizuje się w zabiegach autologii, radiofrekwencji 
                  mikroigłowej oraz autorskiej technice wypełniania ust. Jej wiedza, precyzja 
                  i indywidualne podejście do każdego klienta sprawiają, że osiąga spektakularne, 
                  naturalne efekty. Jako ambasadorka GlowUpSkin, łączy pasję do nowoczesnych 
                  technologii z najwyższymi standardami jakości.
                </p>
              </div>
            </div>
          </div>

          </div>
        </section>

        {/* Separator */}
        <div className="mt-4 w-full">
          <div className="mx-auto h-[2px] w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Dołącz do nas */}
        <section>
          <h2 className="text-4xl md:text-5xl text-center mb-8">Chcesz zostać ambasadorem?</h2>
          
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8">
              <p className="text-lg md:text-2xl font-light text-center mb-6">
                Poszukujemy ekspertów, którzy podzielają naszą pasję do doskonałości 
                i chcą rozwijać branżę medycyny estetycznej. Jeśli jesteś doświadczonym 
                specjalistą i chciałbyś dołączyć do naszego zespołu ambasadorów, 
                skontaktuj się z nami!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                {/* Wymagania */}
                <div className="text-center">
                  <h3 className="text-xl mb-2 font-semibold">Pasja</h3>
                  <p className="text-lg font-light">
                    Zaangażowanie w rozwój branży i dzielenie się wiedzą z innymi
                  </p>
                </div>

                {/* Wymagania */}
                <div className="text-center">
                  <h3 className="text-xl mb-2 font-semibold">Współpraca</h3>
                  <p className="text-lg font-light">
                    Gotowość do testowania urządzeń i prowadzenia szkoleń
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-8">
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent inline-block">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm px-10 py-6">
              <h3 className="text-2xl md:text-3xl mb-4">Zainteresowany współpracą?</h3>
              <p className="text-lg font-light mb-6">
                Skontaktuj się z nami i dołącz do grona ekspertów GlowUpSkin!
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
