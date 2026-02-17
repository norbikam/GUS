"use client";

import React from 'react';

interface Laser {
  id: number;
  category: string;
  name: string;
  desc: string;
  isAvailableFromStock: boolean;
}

const lasersData: Laser[] = [
  { id: 1, category: 'Lasery Ablacyjne', name: 'Laser CO₂ (10,600 nm)', desc: 'Resurfacing, blizny, głębokie zmarszczki', isAvailableFromStock: true },
  { id: 2, category: 'Lasery Ablacyjne', name: 'Laser Er:YAG (2,940 nm)', desc: 'Precyzyjny resurfacing, blizny potrądzikowe', isAvailableFromStock: false },
  { id: 3, category: 'Lasery Ablacyjne', name: 'Laser Er:YSGG (2,790 nm) Pearl', desc: 'Fotouszkodzenia, pigmentacja powierzchowna', isAvailableFromStock: false },
  
  { id: 4, category: 'Lasery Nieablacyjne / Frakcyjne', name: 'Laser Tulowy / Thulium (1,927 nm)', desc: 'Melasma, rozjaśnianie, tekstura skóry', isAvailableFromStock: true },
  { id: 5, category: 'Lasery Nieablacyjne / Frakcyjne', name: 'Laser Erbium:Glass (1,540-1,550 nm)', desc: 'Odmładzanie, drobne zmarszczki', isAvailableFromStock: true },
  
  { id: 6, category: 'Lasery Depilacyjne', name: 'Laser Diodowy (800-810 nm)', desc: 'Uniwersalny, najpopularniejszy', isAvailableFromStock: true },
  { id: 7, category: 'Lasery Depilacyjne', name: 'Laser Aleksandrytowy (755 nm)', desc: 'Jasna skóra, bardzo szybki', isAvailableFromStock: false },
  
  { id: 8, category: 'Lasery Naczyniowe i Pigmentacyjne', name: 'Laser Nd:YAG (1,064 nm)', desc: 'Głębokie naczynia, ciemna skóra', isAvailableFromStock: true },
  { id: 9, category: 'Lasery Naczyniowe i Pigmentacyjne', name: 'PDL (585-595 nm)', desc: 'Złoty standard na naczyniaki płaskie', isAvailableFromStock: false },
  { id: 10, category: 'Lasery Naczyniowe i Pigmentacyjne', name: 'Laser KTP (532 nm)', desc: 'Powierzchowne naczynka i rumień', isAvailableFromStock: true },
  { id: 11, category: 'Lasery Naczyniowe i Pigmentacyjne', name: 'Lasery Pikosekundowe', desc: 'Tatuaże wielokolorowe, przebarwienia', isAvailableFromStock: true },
  
  { id: 12, category: 'Biostymulacja', name: 'Lasery LLLT (Klasa III)', desc: 'Regeneracja tkanek, stany zapalne', isAvailableFromStock: false },
];

const MedicalLasersComponent: React.FC = () => {
  const groupedLasers = lasersData.reduce<Record<string, Laser[]>>((acc, laser) => {
    if (!acc[laser.category]) acc[laser.category] = [];
    acc[laser.category].push(laser);
    return acc;
  }, {});

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-10 font-sans text-gray-200">
      
      {/* Tytuł i minimalistyczna legenda */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Dostępność Laserów
          </h2>
          <p className="text-sm text-gray-400 mt-1">Sprawdź modele dostępne od ręki i na zamówienie.</p>
        </div>
        
        {/* Kompaktowa legenda */}
        <div className="flex gap-4 text-xs font-medium bg-white/5 px-4 py-2 rounded-md border border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-green-400">Od ręki</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
            <span className="text-red-400">Na zamówienie</span>
          </div>
        </div>
      </div>

      {/* Lista wierszowa */}
      <div className="space-y-8 bg-gradient-to-br from-gray-900 via-[#111] to-gray-900 p-4 md:p-8 rounded-xl border border-white/10 shadow-lg">
        {Object.entries(groupedLasers).map(([category, lasers]) => (
          <div key={category} className="w-full">
            {/* Tytuł kategorii */}
            <h3 className="text-lg font-medium mb-3 text-[#d4af37] border-b border-[#d4af37]/20 pb-1 inline-block">
              {category}
            </h3>
            
            <div className="flex flex-col">
              {lasers.map((laser) => (
                <div 
                  key={laser.id} 
                  className="group flex flex-col sm:flex-row justify-between sm:items-center py-3 px-2 md:px-4 hover:bg-white/5 rounded-lg transition-colors border-b border-white/5 last:border-0"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                    <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors w-64">
                      {laser.name}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500 w-auto md:w-80 truncate">
                      {laser.desc}
                    </p>
                  </div>
                  
                  {/* Status w formie minimalistycznej kropki z tekstem */}
                  <div className="mt-2 sm:mt-0 flex items-center gap-2 min-w-[120px] justify-end">
                    <span className={`w-2 h-2 rounded-full ${
                      laser.isAvailableFromStock 
                        ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' 
                        : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                    }`}></span>
                    <span className={`text-xs font-medium ${
                      laser.isAvailableFromStock ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {laser.isAvailableFromStock ? 'Dostępny od ręki' : 'Na zamówienie'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-sm text-gray-300 mt-4 text-center">Czas oczekiwania 14 dni</p>
      </div>

    </section>
  );
};

export default MedicalLasersComponent;