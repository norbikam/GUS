"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiChevronDown } from 'react-icons/hi';

export interface Category {
  key: string;
  label: string;
  icon: string;
  count?: number;
}

interface CategoryMenuProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function CategoryMenu({ isMobile = false, onLinkClick }: CategoryMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Pobierz kategorie z API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        
        const data: Category[] = await response.json();
        // Filtruj tylko niepuste kategorie (z count > 0)
        const nonEmptyCategories = data.filter(cat => cat.key === 'all' || (cat.count && cat.count > 0));
        setCategories(nonEmptyCategories);
      } catch (error) {
        console.error('❌ Błąd podczas pobierania kategorii:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Zamknij dropdown gdy kliknięto poza nim
  useEffect(() => {
    if (isMobile) return; // Na mobile zamyka się po kliknięciu linku
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleCategoryClick = () => {
    setIsOpen(false);
    if (onLinkClick) onLinkClick();
  };

  if (loading) {
    return isMobile ? (
      <div className="text-gray-400 text-center py-2">Ładowanie kategorii...</div>
    ) : (
      <div className="text-gray-400">Ładowanie...</div>
    );
  }

  // Wersja mobilna (w hamburger menu)
  if (isMobile) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2 py-3 text-xl transition-colors duration-300"
        >
          <span>KATEGORIE</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <HiChevronDown className="w-6 h-6" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pl-6 space-y-2 py-2">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={category.key === 'all' ? '/katalog' : `/katalog?category=${category.key}`}
                      onClick={handleCategoryClick}
                      className="block py-2 text-gray-300 hover:text-yellow-500 transition-colors"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label}
                      {category.count !== undefined && category.key !== 'all' && (
                        <span className="ml-2 text-sm text-gray-500">({category.count})</span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }


  // Wersja desktop (w głównym navbarze)
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors duration-300"
      >
        KATEGORIE
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute top-full left-0 mt-2 w-64 bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[100]"
          >
            <div className="py-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {categories.map((category, index) => (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={category.key === 'all' ? '/katalog' : `/katalog?category=${category.key}`}
                    onClick={handleCategoryClick}
                    className="block px-4 py-3 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-500 transition-all duration-200 border-l-4 border-transparent hover:border-yellow-500"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{category.icon}</span>
                      <div className="flex-1">
                        <span className="font-medium block">{category.label}</span>
                        {category.count !== undefined && category.key !== 'all' && (
                          <span className="text-xs text-gray-500">
                            {category.count} {category.count === 1 ? 'produkt' : 'produktów'}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
