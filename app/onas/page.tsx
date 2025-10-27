import Image from "next/image";
import Particles from "../components/Particles";
import Link from "next/link";

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
            Jesteśmy firmą zajmującą się sprzedażą najwyższej klasy urządzeń dla salonów medycyny estetycznej. Nasza oferta obejmuje szeroki asortyment sprzętu, który pomoże Ci zapewnić najwyższy poziom usług dla Twoich klientów.          </p>
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
                Każde zakupione u nas rozwiązanie objęte jest <b>3-letnią gwarancją serwisową</b>, co daje Ci spokój i bezpieczeństwo. Dostarczamy sprzęt bezpośrednio do Twojego salonu.
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
          {/* Karta: misja */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full">
              <h2 className="text-3xl text-center">Dr Michał Ekkert</h2>
              <Link href="https://drekkert.pl/" className="cursor-default"><Image src="/cooperations/michal-ekkert-qr.webp" alt="Dr Michał Ekkert" width={400} height={400} className="mx-auto rounded-lg mt-4 cursor-pointer hover:scale-[1.05] transition-all duration-200" /></Link>
            </div>
          </div>

          {/* Współprace */}
          <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
            <div className="rounded-xl bg-black/30 backdrop-blur-sm p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 content-center align-middle">
            <div>
              <h2 className="text-3xl text-center">Edyta Babula-Frątczak</h2>
              <Image src="/cooperations/edyta-babula-fratczak.jpeg" alt="Edyta Babula-Frątczak" width={400} height={400} className="mx-auto rounded-lg mt-4" />
              <p className="text-center text-gray-300"><br></br>Ekspert, dydaktyk, założycielka Warszawskiej Szkoły Medycyny Estetycznej i Kosmetologii</p>
              </div>
              <div className="flex justify-center align-middle content-center">
              <p className="mt-4 text-lg md:text-2xl font-light text-center">
                Edyta Babula-Frątczak to ceniony autorytet w branży kosmetologicznej i medycyny estetycznej. Posiada unikalne, interdyscyplinarne wykształcenie, łączące specjalizację w marketingu z zaawansowaną kosmetologią, co pozwala jej na holistyczne podejście do rozwoju biznesu i edukacji w sektorze beauty.
                <br />
                <br />
                Jako właściciel i główny dydaktyk Warszawskiej Szkoły Medycyny Estetycznej i Kosmetologii, Edyta jest pionierem w kreowaniu innowacyjnych programów edukacyjnych. Jej misją jest nie tylko przekazywanie wiedzy, ale i wdrażanie najwyższych standardów zawodowych, co czyni ją liderem w kształtowaniu przyszłych pokoleń specjalistów..
                </p>
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
