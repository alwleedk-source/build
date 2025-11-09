// Clean database endpoint
import { Request, Response } from 'express';
import * as db from './db';

export async function handleCleanRequest(req: Request, res: Response) {
  try {
    console.log('[Clean Endpoint] Received clean request');
    
    // Simple authentication check
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.SEED_SECRET || 'buildcraft-seed-2024'}`) {
      console.log('[Clean Endpoint] ❌ Unauthorized');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    console.log('[Clean Endpoint] ✅ Authorized, cleaning database...');
    
    // Get database connection
    const database = await db.getDb();
    if (!database) {
      throw new Error('Database not available');
    }
    
    // Import schema
    const { blogPosts, testimonials, partners } = await import('../drizzle/schema');
    
    // Delete all data
    await database.delete(blogPosts);
    console.log('[Clean] ✅ Deleted all blog posts');
    
    await database.delete(testimonials);
    console.log('[Clean] ✅ Deleted all testimonials');
    
    await database.delete(partners);
    console.log('[Clean] ✅ Deleted all partners');
    
    console.log('[Clean Endpoint] ✅ Clean completed successfully');
    res.json({ 
      success: true, 
      message: 'Database cleaned successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[Clean Endpoint] ❌ Error:', error);
    res.status(500).json({ 
      error: 'Clean failed', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
