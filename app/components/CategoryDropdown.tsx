"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  key: string;
  label: string;
  icon: string;
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

  // Zamknij dropdown gdy kliknięto poza nim
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
    <div ref={dropdownRef} className="relative w-full md:w-64">
      {/* Przycisk dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-900/30 backdrop-blur-sm border border-white/10 rounded-lg text-left flex items-center justify-between hover:bg-gray-900/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{selectedCategoryData?.icon}</span>
          <span className="font-medium text-gray-200">
            {selectedCategoryData?.label || 'Wybierz kategorię'}
          </span>
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

      {/* Lista dropdown z animacją */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - opcjonalnie dla lepszego UX na mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-[10000] w-full mt-2 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden"
            >
              <div className="py-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(category.key)}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 ${
                      selectedCategory === category.key
                        ? 'bg-yellow-500/20 text-yellow-500 border-l-4 border-yellow-500'
                        : 'hover:bg-white/5 text-gray-300 border-l-4 border-transparent'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.label}</span>
                    
                    {selectedCategory === category.key && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </motion.svg>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
