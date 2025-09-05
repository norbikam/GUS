import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'Nie wybrano pliku' }, { status: 400 });
    }

    // Sprawdź typ pliku
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Dozwolone tylko pliki: JPG, PNG, WebP' }, 
        { status: 400 }
      );
    }

    // Sprawdź rozmiar (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Plik zbyt duży. Maksymalnie 5MB' }, 
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Stwórz unikalną nazwę pliku
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const fileName = `${timestamp}-${originalName}`;
    
    // Ścieżka do zapisu
    const uploadDir = path.join(process.cwd(), 'public', 'products');
    const filePath = path.join(uploadDir, fileName);

    // Stwórz folder jeśli nie istnieje
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Folder już istnieje - ignoruj błąd
    }

    // Zapisz plik
    await writeFile(filePath, buffer);

    // Zwróć URL do pliku
    const fileUrl = `/products/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: fileName
    });

  } catch (error) {
    console.error('Błąd uploadu:', error);
    return NextResponse.json(
      { error: 'Błąd podczas zapisywania pliku' }, 
      { status: 500 }
    );
  }
}
