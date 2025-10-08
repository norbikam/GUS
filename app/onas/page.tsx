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
      </main>
    </div>
  );
}
