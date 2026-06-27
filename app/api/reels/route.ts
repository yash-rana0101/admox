import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Predefined premium cinematic titles matching the reel items
const REEL_TITLES: { [key: number]: string } = {
  1: 'NEON DREAMS',
  2: 'FUTURE COUTURE',
  3: 'MONOLITH',
  4: 'ABYSSAL',
  5: 'ORION PROTOCOL',
  6: 'MIRAGE',
  7: 'PANDORA',
  8: 'MERCURY',
  9: 'CYBERNETIC',
  10: 'ECLIPSE',
  11: 'CHRONOS',
  12: 'GLITCH SHIFT',
  13: 'SYNAPSE Core',
  14: 'DEEP STATE',
  15: 'AETHER FLUX',
  16: 'KINETIC MATRIX',
  17: 'QUANTUM LINK',
  18: 'HYPERION',
  19: 'STELLAR DRIFT',
  20: 'NEBULA PROBE'
};

export async function GET() {
  try {
    const assetsDir = path.join(process.cwd(), 'public', 'assets');
    
    if (!fs.existsSync(assetsDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(assetsDir);
    
    // Filter out backup files and only include image formats
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext) && !file.includes('-backup');
    });

    // Helper function to extract number from filename for sorting
    const getFileNumber = (filename: string): number => {
      const match = filename.match(/^(\d+)/);
      return match ? parseInt(match[1], 10) : 9999;
    };

    // Sort numerically (e.g. 1.jpg, 2.jpg, 2.png, 3.jpg, ..., 19.png)
    imageFiles.sort((a, b) => {
      const numA = getFileNumber(a);
      const numB = getFileNumber(b);
      if (numA !== numB) {
        return numA - numB;
      }
      return a.localeCompare(b); // Alphabetical fallback for same number with different extension
    });

    // Map to GalleryItem format
    const items = imageFiles.map((file) => {
      const num = getFileNumber(file);
      const title = REEL_TITLES[num] || `REEL ${String(num).padStart(2, '0')}`;
      return {
        image: `/assets/${file}`,
        text: title,
      };
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to read reels assets directory:', error);
    return NextResponse.json([], { status: 500 });
  }
}
