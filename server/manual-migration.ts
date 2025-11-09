import { getDb } from './db';
import { sql } from 'drizzle-orm';

/**
 * Manual migration endpoint to add videoBackground to hero_style enum
 * This can be called via /api/run-migration endpoint
 */
export async function runManualMigration() {
  try {
    console.log('🔧 Starting manual migration...');
    const db = await getDb();
    
    // Add videoBackground to hero_style enum if it doesn't exist
    await db.execute(sql`
      DO $$
      BEGIN
          -- Check if videoBackground value already exists in the enum
          IF NOT EXISTS (
              SELECT 1
              FROM pg_enum e
              JOIN pg_type t ON e.enumtypid = t.oid
              WHERE t.typname = 'hero_style'
              AND e.enumlabel = 'videoBackground'
          ) THEN
              -- Add videoBackground to the enum
              ALTER TYPE hero_style ADD VALUE 'videoBackground';
              RAISE NOTICE 'Added videoBackground to hero_style enum';
          ELSE
              RAISE NOTICE 'videoBackground already exists in hero_style enum';
          END IF;
      END$$;
    `);
    
    console.log('✅ Migration completed successfully!');
    return { success: true, message: 'Migration completed successfully' };
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error: error.message };
  }
}
