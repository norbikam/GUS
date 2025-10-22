import { ImageItem } from '@/app/types/product';

/**
 * Parsuje pole images z Prismy (JsonValue) na tablicę ImageItem[]
 * Używaj tego w API endpoints przy GET/POST/PUT
 */
export function parseImages(images: unknown): ImageItem[] | null {
  if (!images) return null;
  
  try {
    if (Array.isArray(images)) {
      // Filtruj tylko prawidłowe ImageItem obiekty
      return images.filter(
        (img): img is ImageItem => 
          typeof img === 'object' && 
          img !== null && 
          'id' in img && 
          'url' in img &&
          typeof img.id === 'string' &&
          typeof img.url === 'string'
      );
    }
    return null;
  } catch (error) {
    console.error('Błąd parsowania images:', error);
    return null;
  }
}

/**
 * Waliduje tablicę images przed zapisem do bazy
 */
// Add this helper function at the top
function isValidImageItem(img: unknown): img is { id: string; url: string } {
  return (
    typeof img === 'object' &&
    img !== null &&
    'id' in img &&
    'url' in img &&
    typeof (img as { url: unknown }).url === 'string' &&
    Boolean((img as { id: unknown }).id)
  );
}

export function validateImages(images: unknown): boolean {
  if (!Array.isArray(images)) return false;
  
  for (const img of images) {
    if (!isValidImageItem(img)) {
      return false;
    }
  }
  
  return true;
}


	
	/**
	 * Upewnia się że przynajmniej jedno zdjęcie jest główne
	 */
	export function ensurePrimaryImage(images: ImageItem[]): ImageItem[] {
	  if (!images || images.length === 0) return [];
	  
	  const hasPrimary = images.some(img => img.isPrimary);
	  
	  if (!hasPrimary) {
	    images[0].isPrimary = true;
	  }
	  
	  return images;
	}
	
	/**
	 * Pobiera główne zdjęcie z tablicy images
	 */
	export function getPrimaryImageUrl(images: ImageItem[]): string {
	  if (!images || images.length === 0) return '';
	  
	  const primary = images.find(img => img.isPrimary);
   return primary ? primary.url : images[0].url;
 }