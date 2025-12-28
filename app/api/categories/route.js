// app/api/categories/route.js
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

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
    const products = await prisma.product.findMany({
      select: { category: true, active: true },
    });

    const categoryCounts = {};
    products.forEach((product) => {
      if (product.category) {
        if (!categoryCounts[product.category]) {
          categoryCounts[product.category] = { total: 0, active: 0 };
        }
        categoryCounts[product.category].total++;
        if (product.active) {
          categoryCounts[product.category].active++;
        }
      }
    });

    const categories = Object.entries(categoryCounts)
      .map(([key, counts]) => ({
        key,
        label: CATEGORY_LABELS[key] || key,
        count: counts.active,
        total: counts.total,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pl'));

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Błąd podczas pobierania kategorii:', error);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    // Pobierz dane zgodnie z tym, co wysyła frontend
    const { category, label } = await req.json();

    // Walidacja
    if (!category || !label) {
      return NextResponse.json(
        { error: 'Klucz i nazwa kategorii są wymagane' },
        { status: 400 }
      );
    }

    // Sprawdź czy kategoria już istnieje
    const existingProducts = await prisma.product.findFirst({
      where: { category: category },
    });

    if (existingProducts) {
      return NextResponse.json(
        { error: 'Kategoria już istnieje' },
        { status: 409 }
      );
    }

    // Zwróć odpowiedź w strukturze, której oczekuje frontend
    return NextResponse.json({
      category: {
        key: category,
        label: label,
        count: 0,
        total: 0,
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Błąd podczas tworzenia kategorii:', error);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
