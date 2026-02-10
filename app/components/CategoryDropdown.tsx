"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Category {
  key: string;
  label: string;
  icon: string;
  count?: number;
}

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Category[];
}

export default function CategoryDropdown({ 
  selectedCategory, 
  onCategoryChange, 
  categories 
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- BLOKADA BODY (Dla pewności) ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Na iOS to pomaga zablokować "bounce" całej strony
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Zamknij klikając poza (Desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCategoryData = categories.find(cat => cat.key === selectedCategory);

  const handleSelect = (categoryKey: string) => {
    onCategoryChange(categoryKey);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full md:w-64 z-[100]">
      {/* --- PRZYCISK OTWIERAJĄCY --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-lg text-left flex items-center justify-between hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{selectedCategoryData?.icon}</span>
          <div className="flex flex-col">
            <span className="font-medium text-gray-200">
              {selectedCategoryData?.label || 'Wybierz kategorię'}
            </span>
            {selectedCategoryData?.count !== undefined && (
              <span className="text-xs text-gray-400">
                {selectedCategoryData.count} {selectedCategoryData.count === 1 ? 'produkt' : 'produktów'}
              </span>
            )}
          </div>
        </div>
        
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* --- MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP (Desktop) */}
            <div 
              className="fixed inset-0 z-[90] bg-transparent hidden md:block" 
              onClick={() => setIsOpen(false)} 
            />

            {/* GŁÓWNY KONTENER MENU 
               Mobile: fixed inset-0 (PEŁNY EKRAN) -> To klucz ze StackOverflow
               Desktop: absolute dropdown
            */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`
                z-[9999] bg-[#0f0f0f] border-t md:border border-white/10 shadow-2xl flex flex-col
                
                /* MOBILE: FULL SCREEN OVERLAY */
                fixed inset-0 top-[0px] h-[100dvh] w-full
                
                /* DESKTOP: STANDARD DROPDOWN */
                md:absolute md:top-full md:left-0 md:bottom-auto md:w-full md:h-auto md:mt-2 md:rounded-lg md:max-h-[60vh]
              `}
            >
              {/* --- HEADER (Tylko Mobile) --- */}
              {/* Sztywna wysokość, nie scrolluje się */}
              <div className="flex md:hidden items-center justify-between px-6 py-6 border-b border-white/10 bg-[#1a1a1a] shrink-0">
                <div>
                    <span className="text-lg font-bold text-white uppercase tracking-wider block">Kategorie</span>
                    <span className="text-xs text-gray-400">Wybierz, co Cię interesuje</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 active:scale-95 transition-transform"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* --- LISTA KATEGORII --- */}
              {/* 1. flex-1: Zajmuje całą dostępną resztę miejsca
                  2. overflow-y-auto: Scrolluje się TYLKO to wnętrze
                  3. overscroll-contain: Nie przekazuje scrolla do body
                  4. -webkit-overflow-scrolling: touch (native iOS scroll)
              */}
              <div 
                className="flex-1 overflow-y-auto overscroll-contain p-2 md:p-2 custom-scrollbar"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {/* Header Desktop */}
                <div className="hidden md:block px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/5 mb-2">
                  Kategorie Główne
                </div>

                {categories.map((category, index) => (
                  <motion.button
                    key={category.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleSelect(category.key)}
                    className={`
                      w-full px-5 py-5 md:py-3 text-left flex items-center gap-4 transition-all duration-200 
                      border-b border-white/5 md:border-b-0 md:border-l-4 md:mb-1 md:rounded-r-lg group
                      ${selectedCategory === category.key
                        ? 'bg-white/5 md:border-yellow-500 text-yellow-500'
                        : 'hover:bg-white/5 text-gray-300 md:border-transparent'
                      }
                    `}
                  >
                    <span className="text-3xl md:text-2xl min-w-[40px] text-center opacity-80 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                    
                    <div className="flex-1">
                      <span className="font-medium block text-xl md:text-base">
                        {category.label}
                      </span>
                      {category.count !== undefined && (
                        <span className="text-sm md:text-xs text-gray-500 block group-hover:text-gray-400 mt-1 md:mt-0">
                          {category.count} urządzeń
                        </span>
                      )}
                    </div>

                    <svg 
                      className={`w-6 h-6 md:w-5 md:h-5 transition-transform duration-300 ${
                        selectedCategory === category.key ? 'text-yellow-500 translate-x-1' : 'text-gray-600 group-hover:text-gray-400'
                      }`} 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                ))}
                
                {/* Padding na dole, żeby ostatni element nie był ucięty */}
                <div className="h-24 md:h-0"></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(212, 175, 55, 0.5);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}