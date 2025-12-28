// app/api/upload-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'Nie wybrano pliku' }, { status: 400 });
    }

    // Walidacja typu pliku
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Dozwolone tylko pliki PDF' }, 
        { status: 400 }
      );
    }

    // Walidacja rozmiaru (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Plik zbyt duży. Maksymalnie 10MB' }, 
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // ✅ Upload do Cloudinary jako raw z flagą delivery_type: upload
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'products/pdfs',
      resource_type: 'raw',
      public_id: `${Date.now()}-${file.name.replace('.pdf', '')}`,
      type: 'upload', // ✅ WAŻNE: ustaw type na 'upload'
      access_mode: 'public' // ✅ Publiczny dostęp
    });

    // ✅ Pobierz poprawny URL dla raw resources
    const pdfUrl = cloudinary.url(result.public_id, {
      resource_type: 'raw',
      type: 'upload',
      secure: true
    });

    console.log('✅ PDF uploaded:', pdfUrl);

    return NextResponse.json({ 
      success: true, 
      url: pdfUrl, // ✅ Używamy wygenerowanego URL
      publicId: result.public_id
    });

  } catch (error) {
    console.error('Błąd uploadu PDF:', error);
    return NextResponse.json(
      { error: 'Błąd podczas zapisywania pliku PDF' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ error: 'Brak ID pliku' }, { status: 400 });
    }

    // Usuń z Cloudinary
    await cloudinary.uploader.destroy(publicId, { 
      resource_type: 'raw',
      type: 'upload'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Błąd usuwania PDF:', error);
    return NextResponse.json(
      { error: 'Błąd podczas usuwania pliku PDF' }, 
      { status: 500 }
    );
  }
}
