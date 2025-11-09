import { Request, Response } from 'express';
import postgres from 'postgres';

export async function handlePublishAll(req: Request, res: Response) {
  let sql: ReturnType<typeof postgres> | null = null;
  
  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'DATABASE_URL not configured' });
    }

    sql = postgres(process.env.DATABASE_URL);

    console.log('📢 Publishing all blog posts...');

    // Update all blog posts to published = true
    const result = await sql`
      UPDATE "blogPosts" 
      SET published = true, "updatedAt" = NOW()
      WHERE published = false OR published IS NULL
      RETURNING id, title, published
    `;

    console.log(`✅ Published ${result.length} blog posts`);

    // Get all blog posts to verify
    const allPosts = await sql`
      SELECT id, title, published 
      FROM "blogPosts" 
      ORDER BY id
    `;

    await sql.end();

    res.json({
      success: true,
      message: `Published ${result.length} blog posts`,
      updated: result,
      allPosts: allPosts,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Publish All] Error:', error);
    
    if (sql) {
      try {
        await sql.end();
      } catch (e) {
        console.error('Failed to close connection:', e);
      }
    }
    
    res.status(500).json({
      error: 'Publish failed',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
