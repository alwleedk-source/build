// Simple seed endpoint that can be called via HTTP
import { Request, Response } from 'express';
import { seedAll } from './seed-data';

export async function handleSeedRequest(req: Request, res: Response) {
  try {
    console.log('[Seed Endpoint] Received seed request');
    
    // Simple authentication check
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.SEED_SECRET || 'buildcraft-seed-2024'}`) {
      console.log('[Seed Endpoint] ❌ Unauthorized');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    console.log('[Seed Endpoint] ✅ Authorized, starting seed...');
    await seedAll();
    
    console.log('[Seed Endpoint] ✅ Seed completed successfully');
    res.json({ 
      success: true, 
      message: 'Database seeded successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[Seed Endpoint] ❌ Error:', error);
    res.status(500).json({ 
      error: 'Seed failed', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
