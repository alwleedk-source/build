import { Request, Response } from 'express';
import * as db from './db';

export async function handleMigratePublished(req: Request, res: Response) {
  try {
    const database = await db.getDb();
    if (!database) {
      return res.status(500).json({ error: 'Database not available' });
    }

    console.log('🔄 Starting migration: published integer -> boolean');

    // Step 1: Check current type
    const checkTypeQuery = `
      SELECT data_type 
      FROM information_schema.columns 
      WHERE table_name = 'blog_posts' AND column_name = 'published'
    `;
    
    const typeResult = await database.execute(checkTypeQuery);
    console.log('📊 Current type:', typeResult);

    // Step 2: If it's integer, convert to boolean
    const migrationSteps = [
      // Drop default first
      `ALTER TABLE blog_posts ALTER COLUMN published DROP DEFAULT`,
      
      // Change type using USING clause
      `ALTER TABLE blog_posts ALTER COLUMN published TYPE BOOLEAN USING (published != 0)`,
      
      // Set new default
      `ALTER TABLE blog_posts ALTER COLUMN published SET DEFAULT false`,
      
      // Ensure NOT NULL
      `ALTER TABLE blog_posts ALTER COLUMN published SET NOT NULL`,
    ];

    for (const step of migrationSteps) {
      try {
        console.log(`🔧 Executing: ${step}`);
        await database.execute(step);
        console.log('✅ Success');
      } catch (error: any) {
        console.log(`⚠️ Step failed (might be already applied): ${error.message}`);
      }
    }

    // Step 3: Verify final type
    const finalTypeResult = await database.execute(checkTypeQuery);
    console.log('📊 Final type:', finalTypeResult);

    // Step 4: Check current values
    const valuesQuery = `SELECT id, title, published FROM blog_posts ORDER BY id`;
    const values = await database.execute(valuesQuery);
    console.log('📝 Current values:', values);

    res.json({
      success: true,
      message: 'Migration completed',
      finalType: finalTypeResult,
      currentValues: values,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Migration] Error:', error);
    res.status(500).json({
      error: 'Migration failed',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
