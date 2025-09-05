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

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Dozwolone tylko pliki: JPG, PNG, WebP' }, 
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Plik zbyt duży. Maksymalnie 5MB' }, 
        { status: 500 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload do Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'products',
      public_id: `${Date.now()}-${file.name.split('.')[0]}`,
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto' },
        { format: 'webp' }
      ]
    });

    return NextResponse.json({ 
      success: true, 
      url: result.secure_url,
      fileName: result.public_id
    });

  } catch (error) {
    console.error('Błąd uploadu:', error);
    return NextResponse.json(
      { error: 'Błąd podczas zapisywania pliku' }, 
      { status: 500 }
    );
  }
}
