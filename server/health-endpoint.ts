import { Request, Response } from 'express';
import * as db from './db';

export async function handleHealthCheck(req: Request, res: Response) {
  try {
    // Check database connection
    const database = await db.getDb();
    const dbStatus = database ? 'connected' : 'disconnected';
    
    // Check environment variables
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      R2_CONFIGURED: !!(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET_NAME),
    };

    // If database is not connected, return 503
    if (!database) {
      return res.status(503).json({
        status: 'unhealthy',
        database: dbStatus,
        environment: envCheck,
        timestamp: new Date().toISOString(),
      });
    }

    // Everything is OK
    res.json({
      status: 'healthy',
      database: dbStatus,
      environment: envCheck,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Health Check] Error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
