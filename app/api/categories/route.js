// app/api/categories/route.js
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Usuwamy CATEGORY_ICONS całkowicie

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
        icon: '', // Puste emoji
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
    const { key, label } = await req.json();

    if (!key || !label) {
      return NextResponse.json(
        { error: 'Klucz i nazwa kategorii są wymagane' },
        { status: 400 }
      );
    }

    const existingProducts = await prisma.product.findFirst({
      where: { category: key },
    });

    if (existingProducts) {
      return NextResponse.json(
        { error: 'Kategoria już istnieje' },
        { status: 409 }
      );
    }

    return NextResponse.json({
      key,
      label,
      icon: '', // Puste emoji
      count: 0,
      total: 0,
    });
  } catch (error) {
    console.error('Błąd podczas tworzenia kategorii:', error);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
