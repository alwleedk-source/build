import { Request, Response } from 'express';

export async function debugR2Config(req: Request, res: Response) {
  try {
    const config = {
      R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID ? `${process.env.R2_ACCOUNT_ID.substring(0, 8)}...` : 'NOT_SET',
      R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID ? `${process.env.R2_ACCESS_KEY_ID.substring(0, 8)}...` : 'NOT_SET',
      R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY ? 'SET (hidden)' : 'NOT_SET',
      R2_BUCKET_NAME: process.env.R2_BUCKET_NAME || 'NOT_SET',
      R2_PUBLIC_URL: process.env.R2_PUBLIC_URL || 'NOT_SET',
      endpoint: process.env.R2_ACCOUNT_ID ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : 'NOT_SET',
    };

    res.json({
      success: true,
      config,
      allConfigured: !!(
        process.env.R2_ACCOUNT_ID &&
        process.env.R2_ACCESS_KEY_ID &&
        process.env.R2_SECRET_ACCESS_KEY &&
        process.env.R2_BUCKET_NAME &&
        process.env.R2_PUBLIC_URL
      ),
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
