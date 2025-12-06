// app/api/categories/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mapowanie kategorii na ikony
const CATEGORY_ICONS = {
  'laser': '🔬',
  'hifu': '💎',
  'depilacja': '✨',
  'plazma': '⚡',
  'mikronakłuwanie': '💉',
  'inne': '🏥',
};

// Mapowanie kategorii na ładne nazwy
const CATEGORY_LABELS = {
  'laser': 'Lasery',
  'hifu': 'Urządzenia HIFU',
  'depilacja': 'Depilacja laserowa',
  'plazma': 'Urządzenia plazmowe',
  'mikronakłuwanie': 'Mikronakłuwanie',
  'inne': 'Inne urządzenia',
};

export async function GET() {
  try {
    // Pobierz unikalne kategorie z bazy
    const categoriesFromDB = await prisma.product.findMany({
      where: {
        active: true,
        category: {
          not: null
        }
      },
      select: {
        category: true
      },
      distinct: ['category']
    });

    // Zlicz produkty w każdej kategorii
    const categoriesWithCount = await Promise.all(
      categoriesFromDB.map(async ({ category }) => {
        const count = await prisma.product.count({
          where: {
            category: category,
            active: true
          }
        });

        return {
          key: category,
          label: CATEGORY_LABELS[category] || category,
          icon: CATEGORY_ICONS[category] || '📦', // Domyślna ikona dla nowych kategorii
          count: count
        };
      })
    );

    // Sortuj alfabetycznie i dodaj "Wszystkie" na początku
    const sortedCategories = categoriesWithCount.sort((a, b) => 
      a.label.localeCompare(b.label, 'pl')
    );

    // Policz wszystkie produkty
    const totalCount = await prisma.product.count({
      where: { active: true }
    });

    const allCategories = [
      {
        key: 'all',
        label: 'Wszystkie kategorie',
        icon: '🔍',
        count: totalCount
      },
      ...sortedCategories
    ];

    return NextResponse.json(allCategories);
    
  } catch (error) {
    console.error('❌ Błąd podczas pobierania kategorii:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Dodaj nową kategorię
export async function POST(request) {
  try {
    const { category, label, icon } = await request.json();

    // Walidacja
    if (!category || typeof category !== 'string') {
      return NextResponse.json(
        { error: 'Nazwa kategorii (klucz) jest wymagana' },
        { status: 400 }
      );
    }

    const trimmedCategory = category.trim().toLowerCase();
    const trimmedLabel = label?.trim() || category.trim();
    const trimmedIcon = icon?.trim() || '📦';

    if (trimmedCategory.length === 0) {
      return NextResponse.json(
        { error: 'Nazwa kategorii nie może być pusta' },
        { status: 400 }
      );
    }

    // Sprawdź czy kategoria już istnieje
    const existingProduct = await prisma.product.findFirst({
      where: { category: trimmedCategory }
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Kategoria już istnieje' },
        { status: 409 }
      );
    }

    // Zwróć nową kategorię (nie zapisujemy do osobnej tabeli, kategorie są częścią produktów)
    return NextResponse.json({ 
      success: true, 
      category: {
        key: trimmedCategory,
        label: trimmedLabel,
        icon: trimmedIcon
      }
    });
  } catch (error) {
    console.error('❌ Błąd podczas tworzenia kategorii:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
