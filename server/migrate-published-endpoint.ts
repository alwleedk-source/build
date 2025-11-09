import { Request, Response } from 'express';
import * as db from './db';
import { sql } from 'drizzle-orm';

export async function handleMigratePublished(req: Request, res: Response) {
  try {
    const database = await db.getDb();
    if (!database) {
      return res.status(500).json({ error: 'Database not available' });
    }

    console.log('🔄 Starting migration: published integer -> boolean');

    const steps = [];

    // Step 1: Check current type
    try {
      const typeResult = await database.execute(sql`
        SELECT data_type 
        FROM information_schema.columns 
        WHERE table_name = 'blog_posts' AND column_name = 'published'
      `);
      console.log('📊 Current type:', typeResult.rows);
      steps.push({ step: 'check_type', result: typeResult.rows });
    } catch (error: any) {
      console.error('❌ Check type failed:', error.message);
      steps.push({ step: 'check_type', error: error.message });
    }

    // Step 2: Drop default
    try {
      await database.execute(sql.raw(`ALTER TABLE blog_posts ALTER COLUMN published DROP DEFAULT`));
      console.log('✅ Dropped default');
      steps.push({ step: 'drop_default', success: true });
    } catch (error: any) {
      console.log(`⚠️ Drop default failed: ${error.message}`);
      steps.push({ step: 'drop_default', error: error.message });
    }

    // Step 3: Convert type
    try {
      await database.execute(sql.raw(`ALTER TABLE blog_posts ALTER COLUMN published TYPE BOOLEAN USING (published != 0)`));
      console.log('✅ Converted to boolean');
      steps.push({ step: 'convert_type', success: true });
    } catch (error: any) {
      console.log(`⚠️ Convert type failed: ${error.message}`);
      steps.push({ step: 'convert_type', error: error.message });
    }

    // Step 4: Set new default
    try {
      await database.execute(sql.raw(`ALTER TABLE blog_posts ALTER COLUMN published SET DEFAULT false`));
      console.log('✅ Set default false');
      steps.push({ step: 'set_default', success: true });
    } catch (error: any) {
      console.log(`⚠️ Set default failed: ${error.message}`);
      steps.push({ step: 'set_default', error: error.message });
    }

    // Step 5: Set NOT NULL
    try {
      await database.execute(sql.raw(`ALTER TABLE blog_posts ALTER COLUMN published SET NOT NULL`));
      console.log('✅ Set NOT NULL');
      steps.push({ step: 'set_not_null', success: true });
    } catch (error: any) {
      console.log(`⚠️ Set NOT NULL failed: ${error.message}`);
      steps.push({ step: 'set_not_null', error: error.message });
    }

    // Step 6: Verify final type
    try {
      const finalTypeResult = await database.execute(sql`
        SELECT data_type 
        FROM information_schema.columns 
        WHERE table_name = 'blog_posts' AND column_name = 'published'
      `);
      console.log('📊 Final type:', finalTypeResult.rows);
      steps.push({ step: 'verify_type', result: finalTypeResult.rows });
    } catch (error: any) {
      console.error('❌ Verify type failed:', error.message);
      steps.push({ step: 'verify_type', error: error.message });
    }

    // Step 7: Check current values
    try {
      const valuesResult = await database.execute(sql`
        SELECT id, title, published 
        FROM blog_posts 
        ORDER BY id
      `);
      console.log('📝 Current values:', valuesResult.rows);
      steps.push({ step: 'check_values', result: valuesResult.rows });
    } catch (error: any) {
      console.error('❌ Check values failed:', error.message);
      steps.push({ step: 'check_values', error: error.message });
    }

    res.json({
      success: true,
      message: 'Migration completed',
      steps: steps,
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
