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
            {/* Dr Michał Ekkert */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
                <div className="relative flex flex-col items-center">
                  <h2 className="text-3xl text-center">Dr n. med. Michał Ekkert</h2>
                  <div className="relative mt-4">
                    <Image
                      src="/cooperations/michal-ekkert.jpeg"
                      alt="Dr n. med. Michał Ekkert"
                      width={400}
                      height={400}
                      className="mx-auto rounded-lg"
                    />
                    <Image
                      src="/cooperations/michal-ekkert-qr.webp"
                      alt="Kod QR – Dr n. med. Michał Ekkert"
                      width={100}
                      height={100}
                      className="absolute top-2 left-2 rounded-md border border-white/30 shadow-lg"
                    />
                  </div>
                  <p className="text-center text-gray-300 mt-4">
                    Ekspert laseroterapii<br />
                    Wykształcenie i kwalifikacje akademickie<br />
                    Główny ekspert szkoleniowy
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <p className="mt-4 text-lg md:text-2xl font-light text-center">
                    Dr Michał Ekkert, absolwent Śląskiej Akademii Medycznej i doktor nauk medycznych, 
                    od ponad 25 lat łączy praktykę kliniczną z działalnością naukową i dydaktyczną. 
                    Kierownik studiów podyplomowych z zakresu medycyny estetycznej dla lekarzy. 
                    Jest założycielem Instytutu Kosmetologii i Badań Leków, gdzie prowadzi szkolenia 
                    i projekty badawcze w zakresie medycyny estetycznej i laseroterapii.
                    <br />
                    <br />
                    Jako główny ekspert szkoleniowy Glowupskin, realizuje autorskie programy edukacyjne 
                    dla lekarzy i kosmetologów, obejmujące m.in. laseroterapię frakcyjną, pikosekundową 
                    oraz terapie z wykorzystaniem technologii INDIBA® 448 kHz. Łącząc wiedzę akademicką 
                    z praktyką kliniczną, dr Ekkert promuje bezpieczne i świadome podejście do medycyny 
                    estetycznej.
                  </p>
                </div>
              </div>
            </div>

            {/* Edyta Babula-Frątczak */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
                <div>
                  <h2 className="text-3xl text-center">Edyta Babula-Frątczak</h2>
                  <Image 
                    src="/cooperations/edyta-babula-fratczak.jpeg" 
                    alt="Edyta Babula-Frątczak" 
                    width={400} 
                    height={400} 
                    className="mx-auto rounded-lg mt-4" 
                  />
                  <p className="text-center text-gray-300 mt-4">
                    Ekspert, dydaktyk<br />
                    Założycielka Warszawskiej Szkoły<br />
                    Medycyny Estetycznej i Kosmetologii
                  </p>
                </div>
                <div className="flex justify-center align-middle content-center">
                  <p className="mt-4 text-lg md:text-2xl font-light text-center">
                    Edyta Babula-Frątczak to ceniony autorytet w branży kosmetologicznej i medycyny 
                    estetycznej. Posiada unikalne, interdyscyplinarne wykształcenie, łączące 
                    specjalizację w marketingu z zaawansowaną kosmetologią, co pozwala jej na 
                    holistyczne podejście do rozwoju biznesu i edukacji w sektorze beauty.
                    <br />
                    <br />
                    Jako właściciel i główny dydaktyk Warszawskiej Szkoły Medycyny Estetycznej 
                    i Kosmetologii, Edyta jest pionierem w kreowaniu innowacyjnych programów 
                    edukacyjnych. Jej misją jest nie tylko przekazywanie wiedzy, ale i wdrażanie 
                    najwyższych standardów zawodowych, co czyni ją liderem w kształtowaniu przyszłych 
                    pokoleń specjalistów.
                  </p>
                </div>
              </div>
            </div>

            {/* Anna Goc */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
                <div>
                  <h2 className="text-3xl text-center">Anna Goc</h2>
                  <Image 
                    src="/cooperations/anna-goc.jpg" 
                    alt="Anna Goc" 
                    width={400} 
                    height={400} 
                    className="mx-auto rounded-lg mt-4" 
                  />
                  <p className="text-center text-gray-300 mt-4">
                    Absolwentka Śląskiego Uniwersytetu Medycznego<br />
                    w Katowicach na kierunku Kosmetologia<br />
                    Specjalistka peelingów chemicznych i terapii anti-aging
                  </p>
                </div>
                <div className="flex justify-center align-middle content-center">
                  <p className="mt-4 text-lg md:text-2xl font-light text-center">
                    Doświadczenie zawodowe zdobywała, pracując w wiodących firmach branży kosmetycznej 
                    i medycyny estetycznej, ze szczególnym naciskiem na nowoczesne technologie high-tech. 
                    Jako szkoleniowiec w firmie specjalizującej się w innowacyjnych urządzeniach do 
                    modelowania sylwetki i regeneracji skóry, doskonaliła praktyczne umiejętności 
                    w zakresie pracy z zaawansowanymi technologiami.
                    <br />
                    <br />
                    Specjalizuje się w peelingach chemicznych oraz terapiach anti-aging, łącząc wiedzę 
                    naukową z doświadczeniem praktycznym. W pracy stawia na indywidualne podejście do 
                    Pacjenta i kompleksowe planowanie terapii, które pozwala uzyskać naturalne i 
                    długotrwałe efekty. Nieustannie poszerza swoją wiedzę, uczestnicząc w szkoleniach 
                    i konferencjach branżowych.
                  </p>
                </div>
              </div>
            </div>

            {/* Sławomir Sobusiak */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
                <div>
                  <h2 className="text-3xl text-center">Sławomir Sobusiak</h2>
                  <Image 
                    src="/cooperations/slawomir-sobusiak.jpg" 
                    alt="Sławomir Sobusiak" 
                    width={400} 
                    height={400} 
                    className="mx-auto rounded-lg mt-4" 
                  />
                  <p className="text-center text-gray-300 mt-4">
                    Ekspert w dziedzinie medycyny estetycznej<br />
                    Wykładowca na studiach podyplomowych<br />
                    Prelegent kongresów branżowych
                  </p>
                </div>
                <div className="flex justify-center align-middle content-center">
                  <p className="mt-4 text-lg md:text-2xl font-light text-center">
                    Sławomir Sobusiak to uznany ekspert w dziedzinie medycyny estetycznej z ponad 
                    20-letnim doświadczeniem w branży sprzętu medycznego. Od 2002 roku dzieli się 
                    swoją wiedzą jako wykładowca na studiach podyplomowych oraz prelegent na licznych 
                    kongresach i konferencjach branżowych.
                    <br />
                    <br />
                    Jest specjalistą w zakresie aparatów medycznych wykorzystywanych w medycynie 
                    estetycznej, ginekologii estetycznej oraz fizjoterapii. Jako praktyk i autorytet 
                    w dziedzinie technik łączonych, posiada unikalne kompetencje w zakresie rodzajów 
                    i parametrów laserów, umiejętnie łącząc różne metody w celu osiągnięcia optymalnych 
                    efektów zabiegowych.
                  </p>
                </div>
              </div>
            </div>

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

            {/* Alan Dąbrowski */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
                <div>
                  <h2 className="text-3xl text-center">Alan Dąbrowski</h2>
                  <Image 
                    src="/cooperations/alan-dabrowski.png" 
                    alt="Alan Dąbrowski" 
                    width={400} 
                    height={400} 
                    className="mx-auto rounded-lg mt-4" 
                  />
                  <p className="text-center text-gray-300 mt-4">
                    Założyciel Alan Dąbrowski Academy<br />
                    Jedyny polski trener akredytowany<br />
                    w brytyjskiej organizacji Beauty ITEC
                  </p>
                </div>
                <div className="flex justify-center align-middle content-center">
                  <p className="mt-4 text-lg md:text-2xl font-light text-center">
                    Alan Dąbrowski to uznany ekspert i wizjoner w dziedzinie edukacji kosmetologicznej. 
                    Jako założyciel Alan Dąbrowski Academy, stworzył miejsce oferujące edukację zawodową 
                    na najwyższym poziomie w Polsce i na świecie.
                    <br />
                    <br />
                    Jest jedynym polskim trenerem zrzeszonym i akredytowanym w brytyjskiej rządowej 
                    organizacji Beauty ITEC, co gwarantuje międzynarodowe standardy edukacji oraz dyplomy 
                    akceptowane w 39 krajach świata. W swojej Akademii łączy nowoczesne technologie 
                    stosowane w Galligan Beauty College oraz Greas Point Studio z unikalnym podejściem 
                    opartym na misji &quot;być Mistrzem&quot;.
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
