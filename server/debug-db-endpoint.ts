// Debug endpoint to check database connection
import { Request, Response } from 'express';
import * as db from './db';

export async function handleDebugDbRequest(req: Request, res: Response) {
  try {
    console.log('[Debug] Received debug request');
    
    // Simple authentication check
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.SEED_SECRET || 'buildcraft-seed-2024'}`) {
      console.log('[Debug] ❌ Unauthorized');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const database = await db.getDb();
    if (!database) {
      return res.json({ 
        error: 'Database not available',
        DATABASE_URL_exists: !!process.env.DATABASE_URL,
        DATABASE_URL_masked: process.env.DATABASE_URL?.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:****@')
      });
    }
    
    // Get blog posts count
    const { blogPosts } = await import('../drizzle/schema');
    const posts = await database.select().from(blogPosts);
    
    res.json({ 
      success: true,
      DATABASE_URL_exists: !!process.env.DATABASE_URL,
      DATABASE_URL_masked: process.env.DATABASE_URL?.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:****@'),
      blog_posts_count: posts.length,
      blog_posts: posts.map(p => ({ id: p.id, title: p.title, published: p.published })),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[Debug] ❌ Error:', error);
    res.status(500).json({ 
      error: 'Debug failed', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
