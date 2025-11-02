import Image from "next/image";
import Particles from "../components/Particles";
import Link from "next/link";

export default function SzkoleniaPage() {
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
        <h1 className="text-4xl md:text-6xl text-white text-center">Szkolenia</h1>

        {/* Wstęp */}
        <section className="text-center">
          <p className="mt-4 text-lg md:text-2xl font-light md:px-10">
            Oferujemy kompleksowe szkolenia z obsługi urządzeń medycyny estetycznej prowadzone przez najlepszych ekspertów branży. Dzięki naszym programom edukacyjnym, Ty i Twój zespół będziecie mogli w pełni wykorzystać potencjał zakupionej aparatury od pierwszego dnia.
          </p>
        </section>

        {/* Separator */}
        <div className="w-full">
          <div className="mx-auto h-[2px] w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Co oferujemy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Karta: Szkolenia na miejscu */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full">
              <h2 className="text-3xl mb-4">Szkolenia na miejscu</h2>
              <p className="text-lg md:text-2xl font-light">
                Każde zakupione urządzenie obejmuje <b>bezpłatne szkolenie podstawowe</b> przeprowadzone bezpośrednio w Twoim salonie.
                <br />
                <br />
                Szkolenie obejmuje:
              </p>
              <ul className="mt-4 text-lg md:text-xl font-light space-y-2 list-disc list-inside">
                <li>Instalację i uruchomienie urządzenia</li>
                <li>Podstawową obsługę i programowanie</li>
                <li>Zasady bezpieczeństwa i konserwacji</li>
                <li>Praktyczne demonstracje zabiegów</li>
                <li>Materiały szkoleniowe i certyfikaty</li>
              </ul>
            </div>
          </div>

          {/* Karta: Szkolenia zaawansowane */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full">
              <h2 className="text-3xl mb-4">Szkolenia zaawansowane</h2>
              <p className="text-lg md:text-2xl font-light">
                Dla profesjonalistów pragnących pogłębić swoją wiedzę, oferujemy <b>zaawansowane programy edukacyjne</b> prowadzone przez uznanych ekspertów.
                <br />
                <br />
                W programie:
              </p>
              <ul className="mt-4 text-lg md:text-xl font-light space-y-2 list-disc list-inside">
                <li>Zaawansowane techniki zabiegowe</li>
                <li>Łączenie różnych technologii</li>
                <li>Protokoły zabiegowe dla różnych wskazań</li>
                <li>Rozwiązywanie problemów i optymalizacja</li>
                <li>Aktualizacje o nowościach technologicznych</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="mt-4 w-full">
          <div className="mx-auto h-[2px] w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Nasi trenerzy */}
        <section>
          <h2 className="text-4xl md:text-5xl text-center mb-8">Nasi eksperci szkoleniowi</h2>

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
                    Główny ekspert szkoleniowy<br />
                    Wykształcenie i kwalifikacje akademickie<br />
                    Specjalista laseroterapii
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <p className="mt-4 text-lg md:text-2xl font-light text-center">
                    Dr Michał Ekkert, absolwent Śląskiej Akademii Medycznej i doktor nauk medycznych, od ponad 25 lat łączy praktykę kliniczną z działalnością naukową i dydaktyczną. Jako główny ekspert szkoleniowy Glowupskin, realizuje autorskie programy edukacyjne dla lekarzy i kosmetologów.
                    <br />
                    <br />
                    Jego szkolenia obejmują m.in. laseroterapię frakcyjną, pikosekundową oraz terapie z wykorzystaniem technologii INDIBA® 448 kHz. Promuje bezpieczne i świadome podejście do medycyny estetycznej, kładąc nacisk na indywidualne podejście do pacjenta i najwyższe standardy etyki zawodowej.
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
                    Założycielka Warszawskiej Szkoły Medycyny Estetycznej i Kosmetologii
                  </p>
                </div>
                <div className="flex justify-center align-middle content-center">
                  <p className="mt-4 text-lg md:text-2xl font-light text-center">
                    Edyta Babula-Frątczak to ceniony autorytet w branży kosmetologicznej i medycyny estetycznej. Posiada unikalne, interdyscyplinarne wykształcenie, łączące specjalizację w marketingu z zaawansowaną kosmetologią.
                    <br />
                    <br />
                    Jako właściciel i główny dydaktyk Warszawskiej Szkoły Medycyny Estetycznej i Kosmetologii, jest pionierem w kreowaniu innowacyjnych programów edukacyjnych. Jej misją jest nie tylko przekazywanie wiedzy, ale i wdrażanie najwyższych standardów zawodowych.
                  </p>
                </div>
              </div>
            </div>

            {/* Alan Dąbrowski */}
            {/* <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
                <div>
                  <h2 className="text-3xl text-center">Alan Dąbrowski</h2>
                  <Image 
                    src="/cooperations/alan-dabrowski.jpg" 
                    alt="Alan Dąbrowski" 
                    width={400} 
                    height={400} 
                    className="mx-auto rounded-lg mt-4" 
                  />
                  <p className="text-center text-gray-300 mt-4">
                    Założyciel Alan Dąbrowski Academy<br />
                    Jedyny polski trener akredytowany w brytyjskiej organizacji Beauty ITEC
                  </p>
                </div>
                <div className="flex justify-center align-middle content-center">
                  <p className="mt-4 text-lg md:text-2xl font-light text-center">
                    Alan Dąbrowski to uznany ekspert i wizjoner w dziedzinie edukacji kosmetologicznej. Jako założyciel Alan Dąbrowski Academy, stworzył miejsce oferujące edukację zawodową na najwyższym poziomie w Polsce i na świecie.
                    <br />
                    <br />
                    Jest jedynym polskim trenerem akredytowanym w brytyjskiej organizacji Beauty ITEC, co gwarantuje międzynarodowe standardy edukacji oraz dyplomy akceptowane w 39 krajach świata. Łączy nowoczesne technologie z unikalnym podejściem opartym na misji &quot;być Mistrzem.&quot;
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* Separator */}
        <div className="mt-4 w-full">
          <div className="mx-auto h-[2px] w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Korzyści ze szkoleń */}
        <section>
          <h2 className="text-4xl md:text-5xl text-center mb-8">Dlaczego warto?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Korzyść 1 */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-6 h-full text-center">
                <h3 className="text-2xl mb-3">Certyfikaty</h3>
                <p className="text-lg font-light">
                  Otrzymasz certyfikat potwierdzający ukończenie szkolenia, który podniesie prestiż Twojego salonu.
                </p>
              </div>
            </div>

            {/* Korzyść 2 */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-6 h-full text-center">
                <h3 className="text-2xl mb-3">Praktyka</h3>
                <p className="text-lg font-light">
                  Nasze szkolenia są maksymalnie praktyczne – uczysz się na rzeczywistych przypadkach i urządzeniach.
                </p>
              </div>
            </div>

            {/* Korzyść 3 */}
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
              <div className="rounded-xl bg-black/30 backdrop-blur-sm p-6 h-full text-center">
                <h3 className="text-2xl mb-3">Przewaga</h3>
                <p className="text-lg font-light">
                  Zdobędziesz wiedzę, która wyróżni Cię na tle konkurencji i pozwoli oferować zabiegi najwyższej jakości.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-8">
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent inline-block">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm px-10 py-6">
              <h3 className="text-2xl md:text-3xl mb-4">Chcesz dowiedzieć się więcej o naszych szkoleniach?</h3>
              <p className="text-lg font-light mb-6">
                Skontaktuj się z nami, aby poznać pełną ofertę i terminy najbliższych szkoleń!
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
