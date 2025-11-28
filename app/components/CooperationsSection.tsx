import Image from "next/image";
import Link from "next/link";

interface CooperationsSectionProps {
  variant?: "homepage" | "full";
}

export default function CooperationsSection({}: CooperationsSectionProps) {
  const cooperations = [
    {
      name: "Dr n. med. Michał Ekkert",
      role: "Ekspert laseroterapii",
      subtitle: "Główny ekspert szkoleniowy",
      description: "Ponad 25 lat doświadczenia w medycynie estetycznej. Założyciel Instytutu Kosmetologii i Badań Leków.",
      image: "/cooperations/michal-ekkert.jpeg",
      type: "trainer",
      isOwner: false,
    },
    {
      name: "Joanna Majdaniuk",
      role: "Ekspertka medycyny estetycznej",
      subtitle: "Specjalistka makijażu permanentnego",
      description: "Certyfikowana linergistka Master. Specjalizacja: autologia, radiofrekwencja, wypełnianie ust.",
      image: "/cooperations/joanna-majdaniuk.jpg",
      type: "ambasador",
      isOwner: false,
    },
    {
      name: "Magda Batraniec",
      role: "Ekspertka kosmetologii zaawansowanej, Manager ds. Programu Ambasadorskiego",
      subtitle: "Specjalistka technologii laserowych, Manager ds. Programu Ambasadorskiego",
      description: "Ambasadorka marki GUS Medic. Specjalistka anti-aging i makijażu permanentnego. Prowadzi gabinety w Niemczech i Polsce.",
      image: "/cooperations/magda-batraniec.jpg",
      type: "expert",
      isOwner: false,
    },
    {
      name: "Edyta Babula-Frątczak",
      role: "Ekspert, dydaktyk",
      subtitle: "Założycielka Warszawskiej Szkoły",
      description: "Autorytet w branży kosmetologicznej. Pioneer w kreowaniu innowacyjnych programów edukacyjnych.",
      image: "/cooperations/edyta-babula-fratczak.jpeg",
      type: "expert",
      isOwner: false,
    },
    {
      name: "Anna Goc",
      role: "Absolwentka ŚUM",
      subtitle: "Specjalistka anti-aging",
      description: "Ekspertka w peelingach chemicznych i terapiach anti-aging. Łączy wiedzę naukową z praktyką.",
      image: "/cooperations/anna-goc.jpg",
      type: "trainer",
      isOwner: false,
    },
    
    {
      name: "Alan Dąbrowski",
      role: "Założyciel A.D. Academy",
      subtitle: "Trener Beauty ITEC",
      description: "Jedyny polski trener akredytowany w brytyjskiej organizacji Beauty ITEC. Dyplomy akceptowane w 39 krajach.",
      image: "/cooperations/alan-dabrowski.png",
      type: "trainer",
      isOwner: false,
    },
    {
      name: "Sławomir Sobusiak",
      role: "Ekspert medycyny estetycznej",
      subtitle: "Wykładowca, prelegent",
      description: "Ponad 20 lat doświadczenia w branży sprzętu medycznego. Specjalista technik łączonych.",
      image: "/cooperations/slawomir-sobusiak.jpg",
      type: "expert",
      isOwner: false,
    },
    {
      name: "Jacek Olszewski",
      role: "Konsultant techniczny",
      subtitle: "Specjalista sprzętu medycznego",
      description: "Doświadczony konsultant techniczny w branży kosmetologicznej i medycyny estetycznej.",
      image: "/cooperations/jacek-olszewski.jpg",
      type: "expert",
      isOwner: false,
    },
  ];

  // Funkcja pomocnicza do określenia stylów na podstawie typu
  const getCardStyles = (type: string) => {
    switch (type) {
      case "ambasador":
        return {
          gradient: "bg-gradient-to-br from-[#d4af37]/20 via-[#f7e199]/10 to-transparent",
          border: "border-[#d4af37]/40 hover:border-[#d4af37]",
          ring: "ring-[#d4af37] group-hover:ring-[#f7e199]",
          badge: {
            bg: "bg-gradient-to-r from-[#d4af37] to-[#f7e199]",
            text: "text-black",
            label: "AMBASADOR"
          }
        };
      case "trainer":
        return {
          gradient: "bg-gradient-to-br from-blue-500/15 via-blue-400/8 to-transparent",
          border: "border-blue-400/30 hover:border-blue-400",
          ring: "ring-blue-400/50 group-hover:ring-blue-400",
          badge: {
            bg: "bg-gradient-to-r from-blue-500 to-blue-400",
            text: "text-white",
            label: "SZKOLENIA"
          }
        };
      case "expert":
        return {
          gradient: "bg-gradient-to-br from-purple-500/15 via-purple-400/8 to-transparent",
          border: "border-purple-400/30 hover:border-purple-400",
          ring: "ring-purple-400/50 group-hover:ring-purple-400",
          badge: {
            bg: "bg-gradient-to-r from-purple-500 to-purple-400",
            text: "text-white",
            label: "EKSPERT"
          }
        };
      default:
        return {
          gradient: "bg-gradient-to-br from-white/10 via-white/5 to-transparent",
          border: "border-white/10 hover:border-[#d4af37]/50",
          ring: "ring-[#d4af37]/30 group-hover:ring-[#d4af37]",
          badge: {
            bg: "bg-gray-500",
            text: "text-white",
            label: "WSPÓŁPRACA"
          }
        };
    }
  };

  // Renderowanie karty
  const renderCard = (cooperation: typeof cooperations[0], index: number) => {
    const styles = getCardStyles(cooperation.type);
    
    return (
      <div
        key={index}
        className={`group relative overflow-hidden rounded-xl backdrop-blur-sm border transition-all duration-300 ${styles.gradient} ${styles.border}`}
      >
        {/* Badge w prawym górnym rogu */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 items-end">
          <span className={`inline-block px-3 py-1 ${styles.badge.bg} ${styles.badge.text} text-xs font-bold rounded-full`}>
            {styles.badge.label}
          </span>
          
          {/* SPECJALNY BADGE dla współwłaściciela */}
          {cooperation.isOwner && (
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-xs font-bold rounded-full">
              WSPÓŁWŁAŚCICIEL
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col items-center text-center h-full">
          {/* Zdjęcie */}
          <div className={`relative w-32 h-32 mb-4 rounded-full overflow-hidden ring-2 transition-all ${styles.ring}`}>
            <Image
              src={cooperation.image}
              alt={cooperation.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Nazwa */}
          <h3 className="text-xl font-semibold mb-2">{cooperation.name}</h3>

          {/* Rola i podtytuł */}
          <p className="text-sm text-gray-400 mb-3">
            {cooperation.role}
            <br />
            {cooperation.subtitle}
          </p>

          {/* Opis */}
          <p className="text-sm font-light text-gray-300 line-clamp-3">
            {cooperation.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-8 md:px-10 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Nagłówek sekcji */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">Nasze Współprace</h2>
          <p className="text-lg md:text-xl font-light text-gray-300">
            Współpracujemy z najlepszymi ekspertami w branży medycyny estetycznej
          </p>
        </div>

        {/* Grid - 2 kolumny na desktop (automatycznie układa się 4+4) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8 max-w-5xl mx-auto">
          {cooperations.map((cooperation, index) => renderCard(cooperation, index))}
        </div>

        {/* CTA - Zobacz więcej */}
        <div className="text-center">
          <Link
            href="/onas"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#f7e199] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Poznaj wszystkich
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
