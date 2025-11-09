import { Router } from 'express';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import crypto from 'crypto';
import path from 'path';

const router = Router();

// Configure R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
    }
  },
});

// Upload endpoint
router.post('/upload-r2', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check R2 configuration
    if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET_NAME) {
      console.error('R2 configuration missing');
      return res.status(500).json({ error: 'R2 storage not configured' });
    }

    const folder = req.body.folder || 'general';
    const timestamp = Date.now();
    const randomStr = crypto.randomBytes(4).toString('hex');
    const ext = path.extname(req.file.originalname);
    const basename = path.basename(req.file.originalname, ext)
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .substring(0, 50);
    
    const filename = `${basename}-${timestamp}-${randomStr}${ext}`;
    const key = `${folder}/${filename}`;

    // Upload to R2
    const uploadParams = {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await r2Client.send(new PutObjectCommand(uploadParams));

    // Return public URL
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
    
    console.log(`✅ File uploaded to R2: ${key}`);
    
    res.json({
      success: true,
      url: publicUrl,
      filename: filename,
      key: key,
    });
  } catch (error: any) {
    console.error('R2 upload error:', error);
    res.status(500).json({ 
      error: 'Upload failed',
      message: error.message 
    });
  }
});

// Delete endpoint
router.delete('/upload-r2/:folder/:filename', async (req, res) => {
  try {
    const { folder, filename } = req.params;
    const key = `${folder}/${filename}`;

    const { DeleteObjectCommand } = await import('@aws-sdk/client-s3');
    await r2Client.send(new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }));

    console.log(`✅ File deleted from R2: ${key}`);
    
    res.json({ success: true });
  } catch (error: any) {
    console.error('R2 delete error:', error);
    res.status(500).json({ 
      error: 'Delete failed',
      message: error.message 
    });
  }
});

export default router;
