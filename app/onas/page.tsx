export default function KatalogPage() {
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
        o nas
      </h1>
    </div>
  </section>
    <div className="flex flex-col md:grid grid-cols-2 gap-10 p-10 pt-20">
        <div className="flex flex-col items-center justify-center text-center col-span-2">
            <p className="mt-4 text-lg md:text-2xl font-light px-20">
            Jesteśmy firmą zajmującą się sprzedażą najwyższej klasy urządzeń dla salonów kosmetycznych. Nasza oferta obejmuje szeroki asortyment sprzętu, który pomoże Ci zadbać o najwyższy poziom usług dla swoich klientów.
            </p>
        </div>
        <div className="flex flex-col items-center  text-left">
            <h1 className="text-3xl mt-6">Nasza misja</h1>
            <p className="mt-4 text-lg md:text-2xl font-light">
            Naszą misją jest dostarczanie innowacyjnych rozwiązań, które ułatwiają pracę w salonach kosmetycznych. Wierzymy, że odpowiedni sprzęt może znacząco poprawić jakość usług i zadowolenie klientów. 
            Dlatego nieustannie poszukujemy nowych technologii i rozwiązań, które mogą wspierać rozwój branży kosmetycznej. Naszym celem jest budowanie długotrwałych relacji z klientami, opartych na zaufaniu i profesjonalizmie.
            </p>
        </div>
        <div className="flex flex-col items-center  text-center">
            <h1 className="text-3xl mt-6">Nasza oferta</h1>
            <p className="mt-4 text-lg md:text-2xl font-light">
            Oferujemy szeroki wybór urządzeń, w tym lasery, urządzenia do mikrodermabrazji, sprzęt do depilacji i wiele innych. Nasze produkty są starannie wyselekcjonowane, aby zapewnić najwyższą jakość i efektywność.
            </p>
        </div>

    </div>
    </div>
  );
}
