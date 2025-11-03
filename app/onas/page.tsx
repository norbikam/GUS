import Image from "next/image";
import Particles from "../components/Particles";

export default function OnasPage() {
  return (
    <div className="relative w-full pt-24">
      {/* Subtelne gwiazdy w tle jak na stronie głównej */}
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
        <h1 className="text-4xl md:text-6xl text-white text-center">O nas</h1>

        {/* Wstęp */}
        <section className="text-center">
          <p className="mt-4 text-lg md:text-2xl font-light md:px-10">
            Jesteśmy firmą zajmującą się sprzedażą najwyższej klasy urządzeń dla salonów medycyny estetycznej. Nasza oferta obejmuje szeroki zakres asortymentu sprzętu, który pomoże Ci zapewnić najwyższy poziom usług dla Twoich klientów.          </p>
        </section>

      {/* Dwie karty (glassmorphism) jak na wariancie 2 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Karta: misja */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full">
              <h2 className="text-3xl">Nasza filozofia</h2>
              <p className="mt-4 text-lg md:text-2xl font-light">
                W <b>GlowUpSkin</b> łączymy jakość z dostępnością. Oferujemy urządzenia w różnych klasach cenowych, tak by zarówno profesjonaliści oczekujący <b>najwyższej precyzji</b>, jak i osoby poszukujące rozsądnych cen, mogły znaleźć u nas <b>idealne rozwiązanie</b>.
                <br />
                <br />
                Nieustannie dostosowujemy ofertę do dynamicznych potrzeb rynku, wprowadzając produkty i formuły, które stanowią odpowiedź na najnowsze osiągnięcia branży.
                <br />
                <br />
                Naszym celem jest, abyś znalazł u nas wszystko, co sprawi, że Twój salon będzie <b>nowoczesny, ekskluzywny i profesjonalny</b>.
              </p>
            </div>
          </div>

          {/* Karta: oferta */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full">
              <h2 className="text-3xl">Nasza oferta</h2>
              <p className="mt-4 text-lg md:text-2xl font-light">
                Zapewniamy starannie wyselekcjonowane, najwyższej jakości urządzenia, które gwarantują skuteczność i niezawodność w Twoim salonie.
                <br />
                <br />
                Każda zakupiona u nas aparatura objęta jest <b>3-letnią gwarancją serwisową</b>, co daje Ci spokój i bezpieczeństwo. Dostarczamy sprzęt bezpośrednio do Twojego salonu.
                <br />
                <br />
                Dodatkowo, oferujemy szkolenia z obsługi prowadzone <b>na miejscu</b>, abyś Ty i Twój zespół mogli w pełni wykorzystać potencjał urządzeń od pierwszego dnia. To kompleksowe wsparcie zapewnia pełny komfort użytkowania.
              </p>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="mt-8 w-full">
          <div className="mx-auto h-[2px] w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        <section className="grid grid-cols-1 gap-8">
          <h1 className="text-5xl text-center">Współprace</h1>

          {/* Współpraca */}
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
                  Ekspert laseroterapii <br /> Wykształcenie i kwalifikacje akademickie <br /> Szkolenia
                </p>
              </div>
              <div className="flex justify-center items-center">
                <p className="mt-4 text-lg md:text-2xl font-light text-center">
                  Dr Michał Ekkert, absolwent Śląskiej Akademii Medycznej i doktor nauk medycznych, od ponad 25 lat łączy praktykę kliniczną z działalnością naukową i dydaktyczną. Kierownik studiów podyplomowych z zakresu medycyny estetycznej dla lekarzy. Jest założycielem Instytutu Kosmetologii i Badań Leków, gdzie prowadzi szkolenia i projekty badawcze w zakresie medycyny estetycznej i laseroterapii.
                  <br />
                  <br />
                  Jako główny ekspert szkoleniowy Glowupskin, realizuje autorskie programy edukacyjne dla lekarzy i kosmetologów, obejmujące m.in. laseroterapię frakcyjną, pikosekundową oraz terapie z wykorzystaniem technologii INDIBA® 448 kHz. Łącząc wiedzę akademicką z praktyką kliniczną, dr Ekkert promuje bezpieczne i świadome podejście do medycyny estetycznej, kładąc nacisk na indywidualne podejście do pacjenta, nowoczesne technologie i najwyższe standardy etyki zawodowej.
                </p>
              </div>
            </div>
          </div>

          {/* Współpraca */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
            <div>
              <h2 className="text-3xl text-center">Edyta Babula-Frątczak</h2>
              <Image src="/cooperations/edyta-babula-fratczak.jpeg" alt="Edyta Babula-Frątczak" width={400} height={400} className="mx-auto rounded-lg mt-4" />
              <p className="text-center text-gray-300"><br></br>Ekspert, dydaktyk, założycielka Warszawskiej Szkoły Medycyny Estetycznej i Kosmetologii<br/>Ekspert, Szkolenia</p>
              </div>
              <div className="flex justify-center align-middle content-center">
              <p className="mt-4 text-lg md:text-2xl font-light text-center">
                Edyta Babula-Frątczak to ceniony autorytet w branży kosmetologicznej i medycyny estetycznej. Posiada unikalne, interdyscyplinarne wykształcenie, łączące specjalizację w marketingu z zaawansowaną kosmetologią, co pozwala jej na holistyczne podejście do rozwoju biznesu i edukacji w sektorze beauty.
                <br />
                <br />
                Jako właściciel i główny dydaktyk Warszawskiej Szkoły Medycyny Estetycznej i Kosmetologii, Edyta jest pionierem w kreowaniu innowacyjnych programów edukacyjnych. Jej misją jest nie tylko przekazywanie wiedzy, ale i wdrażanie najwyższych standardów zawodowych, co czyni ją liderem w kształtowaniu przyszłych pokoleń specjalistów.
                </p>
                </div>
            </div>
          </div>

          {/* Współpraca */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
              <div>
              <h2 className="text-3xl text-center">Anna Goc</h2>
              <Image src="/cooperations/anna-goc.jpg" alt="Anna Goc" width={400} height={400} className="mx-auto rounded-lg mt-4" />
              <p className="text-center text-gray-300"><br></br>Absolwentka Śląskiego Uniwersytetu Medycznego w Katowicach na kierunku Kosmetologia</p>
              </div>
              <div className="justify-center align-middle content-center">
              <p className="mt-4 text-lg md:text-2xl font-light text-center">
                Doświadczenie zawodowe zdobywała, pracując w wiodących firmach branży kosmetycznej i medycyny estetycznej, ze szczególnym naciskiem na nowoczesne technologie high-tech. Jako szkoleniowiec w firmie specjalizującej się w innowacyjnych urządzeniach do modelowania sylwetki i regeneracji skóry, doskonaliła praktyczne umiejętności w zakresie pracy z zaawansowanymi technologiami.                <br />
                <br />
                Specjalizuje się w peelingach chemicznych oraz terapiach anti-aging, łącząc wiedzę naukową z doświadczeniem praktycznym. W pracy stawia na indywidualne podejście do Pacjenta i kompleksowe planowanie terapii, które pozwala uzyskać naturalne i długotrwałe efekty.                
                <br/>
                <br/>
                Nieustannie poszerza swoją wiedzę, uczestnicząc w szkoleniach i konferencjach branżowych. Z pasją łączy nowoczesne technologie z klasycznymi metodami pielęgnacji, tworząc skuteczne, spersonalizowane rozwiązania dla każdego Pacjenta.
                </p>
              </div>
            </div>
          </div>

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
              <p className="text-center text-gray-300">
                <br />
                Ekspert w dziedzinie medycyny estetycznej, wykładowca na studiach podyplomowych, prelegent kongresów branżowych<br/>Ekspert
              </p>
            </div>
            <div className="flex justify-center align-middle content-center">
              <p className="mt-4 text-lg md:text-2xl font-light text-center">
                Sławomir Sobusiak to uznany ekspert w dziedzinie medycyny estetycznej z ponad 20-letnim doświadczeniem w branży sprzętu medycznego. Od 2002 roku dzieli się swoją wiedzą jako wykładowca na studiach podyplomowych oraz prelegent na licznych kongresach i konferencjach branżowych.
                <br />
                <br />
                Jest specjalistą w zakresie aparatów medycznych wykorzystywanych w medycynie estetycznej, ginekologii estetycznej oraz fizjoterapii. Jako praktyk i autorytet w dziedzinie technik łączonych, posiada unikalne kompetencje w zakresie rodzajów i parametrów laserów, umiejętnie łącząc różne metody w celu osiągnięcia optymalnych efektów zabiegowych.
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
              alt="Joanna Majdaniuk Ambasadorka" 
              width={400} 
              height={400} 
              className="mx-auto rounded-lg mt-4" 
            />
            <p className="text-center text-gray-300 mt-4">
              Ambasadorka marki<br />
              Ekspertka z ogromnym doświadczeniem w medycynie estetycznej<br />
              Specjalistka od makijażu permanentnego i ceniony szkoleniowiec
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
            <p className="text-center text-gray-300">
              <br />
              Założyciel Alan Dąbrowski Academy, jedyny polski trener akredytowany w brytyjskiej organizacji Beauty ITEC <br/> Szkolenia
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
          <p className="text-center text-gray-300">
            <br />
            Konsultant techniczny, specjalista ds. sprzętu medycznego i wyrobów do medycyny estetycznej
          </p>
        </div>
        <div className="flex justify-center align-middle content-center">
          <p className="mt-4 text-lg md:text-2xl font-light text-center">
            Jacek Olszewski to doświadczony konsultant techniczny specjalizujący się 
            w sprzęcie medycznym dedykowanym branży kosmetologicznej i medycyny estetycznej. 
            Dzięki wieloletniemu doświadczeniu w branży, zapewnia kompleksowe wsparcie 
            techniczne oraz doradztwo w zakresie doboru i obsługi aparatury medycznej.
            <br />
            <br />
            Jako specjalista techniczny, pomaga klientom w optymalizacji wykorzystania 
            technologii medycznych, zapewniając najwyższe standardy bezpieczeństwa 
            i efektywności zabiegów. Jego wiedza i praktyczne podejście sprawiają, 
            że jest cenionym partnerem dla profesjonalistów z branży beauty i medycyny estetycznej.
          </p>
        </div>
      </div>
    </div>

        </section>
      </main>
    </div>
  );
}
