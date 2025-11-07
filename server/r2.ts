import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize R2 client (S3-compatible)
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || '';
const PUBLIC_URL = process.env.R2_PUBLIC_URL || '';

/**
 * Generate a presigned URL for uploading a file to R2
 * @param key - The file path/key in R2 (e.g., "projects/image-123.jpg")
 * @param contentType - MIME type of the file
 * @param expiresIn - URL expiration time in seconds (default: 5 minutes)
 * @returns Presigned upload URL
 */
export async function generateUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 300
): Promise<{ uploadUrl: string; publicUrl: string; key: string }> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn });
  const publicUrl = `${PUBLIC_URL}/${key}`;

  return { uploadUrl, publicUrl, key };
}

/**
 * Upload a file buffer directly to R2
 * @param key - The file path/key in R2
 * @param buffer - File buffer
 * @param contentType - MIME type
 * @returns Public URL of the uploaded file
 */
export async function uploadFile(
  key: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await r2Client.send(command);
  return `${PUBLIC_URL}/${key}`;
}

/**
 * Delete a file from R2
 * @param key - The file path/key in R2
 */
export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await r2Client.send(command);
}

/**
 * Extract R2 key from public URL
 * @param url - Public URL (e.g., "https://pub-xxx.r2.dev/projects/image.jpg")
 * @returns R2 key (e.g., "projects/image.jpg")
 */
export function extractKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // Remove leading slash
    return urlObj.pathname.substring(1);
  } catch {
    return null;
  }
}

/**
 * Validate file type
 * @param contentType - MIME type
 * @returns true if valid
 */
export function isValidFileType(contentType: string): boolean {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
  ];
  return allowedTypes.includes(contentType);
}

/**
 * Generate unique file key
 * @param folder - Folder name (e.g., "projects", "services")
 * @param filename - Original filename
 * @returns Unique key with timestamp
 */
export function generateFileKey(folder: string, filename: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const ext = filename.split('.').pop();
  const sanitizedName = filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[^a-z0-9]/gi, '-') // Replace special chars with dash
    .toLowerCase()
    .substring(0, 50); // Limit length

  return `${folder}/${sanitizedName}-${timestamp}-${randomStr}.${ext}`;
}
