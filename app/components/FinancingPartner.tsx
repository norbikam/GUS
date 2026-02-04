const FinancingPartner = () => {
  return (

    <div className="overflow-hidden m-0 my-10 font-sans w-full flex justify-center p-10 md:p-0">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
        
        {/* LEWA STRONA: Główne info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Finansowanie
            </h3>
            {/* Opcjonalnie: mały badge "Partner" */}
            <span className="px-3 py-1 text-xs font-semibold tracking-wide text-black uppercase bg-blue-50 rounded-full text-center">
              Partner Strategiczny
            </span>
          </div>
          
          <p className="text-gray-200 mb-8 text-lg leading-relaxed max-w-2xl">
            Współpracujemy z mLeasing, aby zapewnić najprostsze finansowanie sprzętu medycznego na rynku. 
            Minimum formalności, decyzje w kilka minut.
          </p>

          {/* Grid z konkretami - bez ramek, sama treść */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-8 text-center md:text-left">
            
            {/* Kolumna 1: Lekarze (Najważniejsza) */}
            <div>
              <p className="text-sm  font-medium uppercase tracking-wider mb-1">Dla Lekarzy</p>
              <p className="text-2xl font-bold  mb-1">do 1,5 mln PLN</p>
              <p className="text-sm leading-snug">
                Procedura na dyplom. <br/>
                <span className="text-emerald-600 font-medium">Bez weryfikacji BIK i KRD.</span>
              </p>
            </div>

            {/* Kolumna 2: Kosmetolodzy */}
            <div>
              <p className="text-sm  font-medium uppercase tracking-wider mb-1">Dla Kosmetologów</p>
              <p className="text-2xl font-bold mb-1">do 150 tys. PLN</p>
              <p className="text-sm leading-snug">
                Szybka ścieżka dla branży beauty.
              </p>
            </div>

            {/* Kolumna 3: Standard */}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider mb-1">Standardowo</p>
              <p className="text-2xl font-bold mb-1">do 100 tys. PLN</p>
              <p className="text-sm leading-snug">
                Uproszczona procedura dla każdego.
              </p>
            </div>
          </div>
        </div>

        {/* PRAWA STRONA: Opiekun i Logo - Subtelnie wydzielone */}
        <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-6 bg-gray-50/50 p-6 rounded-xl lg:bg-transparent lg:p-0">
          
          {/* Logo - czyste, bez tła */}
          <div className="w-32 opacity-90 grayscale-2 hover:grayscale-0 transition-all duration-300 bg-gray-50 p-4">
             {/* Pamiętaj o pliku w public/images/mLeasing-logo.png */}
            <img 
              src="/images/mLeasing-logo.png" 
              alt="mLeasing" 
              className="w-full h-auto"
            />
          </div>

          <div className="text-center lg:text-right">
            <p className="text-sm font-medium uppercase tracking-wider mb-1">Twój opiekun</p>
            <p className="text-lg font-bold">Anna Zalewska</p>
            
            <div className="mt-3 flex flex-col gap-1 items-center lg:items-end">
              <a href="tel:+48697902113" className="text-lg font-medium text-blue-600 hover:text-blue-400 transition-colors">
                +48 697 902 113
              </a>
              <a href="mailto:anna.zalewska@mleasing.pl" className="text-sm text-gray-100 hover:text-gray-900 transition-colors border-b border-transparent hover:border-gray-300">
                anna.zalewska@mleasing.pl
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FinancingPartner;