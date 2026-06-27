import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import sharp from 'sharp';

// Configure Cloudinary with user credentials
cloudinary.config({ 
  cloud_name: 'dfbz0q4et', 
  api_key: '169177641576116', 
  api_secret: 'qFBi00CD1yT6nmloVdO5XfhwYok'
});

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

function uploadLarge(filePath: string, options: any): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(filePath, options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result as UploadApiResponse);
      }
    });
  });
}

export async function GET() {
  try {
    const assetsDir = path.join(process.cwd(), 'public', 'assets');
    const mappingFilePath = path.join(process.cwd(), 'public', 'reels-cloudinary.json');
    
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

    // Load existing mapping if it exists
    let mapping: { [key: string]: { original: string; optimized: string; fullScale: string; size: number; mtime: number } } = {};
    if (fs.existsSync(mappingFilePath)) {
      try {
        mapping = JSON.parse(fs.readFileSync(mappingFilePath, 'utf8'));
      } catch (err) {
        console.error('Failed to parse Cloudinary mapping JSON:', err);
      }
    }

    let needsWrite = false;

    // Check if any local file is missing from mapping or modified, and upload it dynamically
    for (const file of imageFiles) {
      const filePath = path.join(assetsDir, file);
      const stats = fs.statSync(filePath);
      
      const cached = mapping[file];
      const isModified = cached && (cached.size !== stats.size || cached.mtime !== stats.mtime.getTime());

      if (!cached || isModified) {
        try {
          const publicId = `reels/${file.replace(/\./g, '_')}`;
          
          let uploadFilePath = filePath;
          let tempCompressedPath = '';
          
          // If file size exceeds 9.5MB, compress it on-the-fly to JPEG (retaining full width/height) to stay under Cloudinary's 10MB limit
          if (stats.size > 9.5 * 1024 * 1024) {
            tempCompressedPath = path.join(process.cwd(), 'public', `temp_${file.replace(/\./g, '_')}.jpg`);
            console.log(`Image ${file} is too large (${(stats.size / 1024 / 1024).toFixed(2)} MB). Compressing to full-scale JPEG...`);
            
            await sharp(filePath)
              .jpeg({ quality: 90, progressive: true })
              .toFile(tempCompressedPath);
              
            uploadFilePath = tempCompressedPath;
          }

          console.log(`Uploading ${isModified ? 'modified' : 'new'} reel image ${file} to Cloudinary...`);
          
          const uploadResult = await cloudinary.uploader.upload(uploadFilePath, {
            public_id: publicId,
            overwrite: true,
            invalidate: true
          });

          // Clean up temp file if created
          if (tempCompressedPath && fs.existsSync(tempCompressedPath)) {
            try {
              fs.unlinkSync(tempCompressedPath);
            } catch (unlinkError) {
              console.error(`Failed to delete temp file ${tempCompressedPath}:`, unlinkError);
            }
          }

          mapping[file] = {
            original: uploadResult.secure_url,
            // Optimized version: resized to max 1000px, auto quality, auto format for smooth performance
            optimized: uploadResult.secure_url.replace('/upload/', '/upload/q_auto,f_auto,w_1000,c_limit/'),
            // Full-scale version: original width/height, auto quality, auto format
            fullScale: uploadResult.secure_url.replace('/upload/', '/upload/q_auto,f_auto/'),
            size: stats.size,
            mtime: stats.mtime.getTime()
          };
          needsWrite = true;
          console.log(`  Uploaded successfully: ${uploadResult.secure_url}`);
        } catch (uploadError) {
          console.error(`Failed to upload ${file} to Cloudinary:`, uploadError);
        }
      }
    }

    // Write updated mapping back to disk if new/modified uploads occurred
    if (needsWrite) {
      try {
        fs.writeFileSync(mappingFilePath, JSON.stringify(mapping, null, 2));
      } catch (writeError) {
        console.error('Failed to write Cloudinary mapping JSON:', writeError);
      }
    }

    // Helper function to extract number from filename for sorting
    const getFileNumber = (filename: string): number => {
      const match = filename.match(/^(\d+)/);
      return match ? parseInt(match[1], 10) : 9999;
    };

    // Sort files numerically
    imageFiles.sort((a, b) => {
      const numA = getFileNumber(a);
      const numB = getFileNumber(b);
      if (numA !== numB) {
        return numA - numB;
      }
      return a.localeCompare(b);
    });

    // Map to final GalleryItem format
    const items = imageFiles.map((file) => {
      const num = getFileNumber(file);
      const title = REEL_TITLES[num] || `REEL ${String(num).padStart(2, '0')}`;
      
      const cloudinaryData = mapping[file];
      
      return {
        // Optimized for gallery, fullScale for modal
        image: cloudinaryData ? cloudinaryData.optimized : `/assets/${file}`,
        fullScale: cloudinaryData ? cloudinaryData.fullScale : `/assets/${file}`,
        text: title,
      };
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to read reels assets directory:', error);
    return NextResponse.json([], { status: 500 });
  }
}
