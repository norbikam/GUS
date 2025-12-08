// components/CategoryModal.tsx
'use client';

import { useState } from 'react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryCreated: (category: { key: string; label: string; icon: string }) => void;
}

export default function CategoryModal({ 
  isOpen, 
  onClose, 
  onCategoryCreated 
}: CategoryModalProps) {
  const [categoryKey, setCategoryKey] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('📦');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sugestie ikon
  const iconSuggestions = ['🔬', '💎', '✨', '⚡', '💉', '🏥', '💊', '🩺', '🧪', '📦', '🎯', '⭐'];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          category: categoryKey.trim().toLowerCase(),
          label: categoryLabel.trim(),
          icon: categoryIcon 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Nie udało się utworzyć kategorii');
        setLoading(false);
        return;
      }

      // Sukces
      onCategoryCreated(data.category);
      setCategoryKey('');
      setCategoryLabel('');
      setCategoryIcon('📦');
      onClose();
    } catch (err) {
      setError('Błąd połączenia. Spróbuj ponownie.');
      console.error('Error creating category:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCategoryKey('');
    setCategoryLabel('');
    setCategoryIcon('📦');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Dodaj nową kategorię</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Klucz kategorii (ID) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Klucz kategorii (ID) *
            </label>
            <input
              type="text"
              value={categoryKey}
              onChange={(e) => setCategoryKey(e.target.value)}
              placeholder="np. kosmetologia, dermatologia..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Małe litery, bez spacji (używane wewnętrznie)
            </p>
          </div>

          {/* Wyświetlana nazwa */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Wyświetlana nazwa *
            </label>
            <input
              type="text"
              value={categoryLabel}
              onChange={(e) => setCategoryLabel(e.target.value)}
              placeholder="np. Urządzenia kosmetologiczne"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Nazwa widoczna dla użytkowników
            </p>
          </div>

          {/* Ikona */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Ikona
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={categoryIcon}
                onChange={(e) => setCategoryIcon(e.target.value)}
                maxLength={2}
                className="w-16 px-3 py-2 border border-gray-300 rounded-md text-center text-xl"
                disabled={loading}
              />
              <span className="text-sm text-gray-600">lub wybierz:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {iconSuggestions.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setCategoryIcon(icon)}
                  className={`w-10 h-10 text-xl rounded border ${
                    categoryIcon === icon 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                  disabled={loading}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Podgląd */}
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 mb-1">Podgląd:</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{categoryIcon}</span>
              <span className="font-medium">{categoryLabel || 'Nazwa kategorii'}</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
              disabled={loading}
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Tworzenie...' : 'Dodaj kategorię'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
