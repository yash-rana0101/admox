import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const logosDir = path.join(process.cwd(), 'public', 'logos');
    
    if (!fs.existsSync(logosDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(logosDir);
    // Only return SVG files
    const svgFiles = files.filter(file => file.toLowerCase().endsWith('.svg'));
    
    return NextResponse.json(svgFiles);
  } catch (error) {
    console.error('Failed to read logos directory:', error);
    return NextResponse.json([], { status: 500 });
  }
}
