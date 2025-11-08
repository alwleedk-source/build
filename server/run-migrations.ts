import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigrations() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }

  console.log('🔄 Connecting to database...');
  const client = postgres(databaseUrl, { max: 1 });
  const db = drizzle(client);

  try {
    console.log('🔄 Running migrations...');
    
    // Read and execute the migration file
    const migrationPath = join(__dirname, '../drizzle/0001_add_hero_footer_about.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');
    
    // Split by statement breakpoint and execute each statement
    const statements = migrationSQL
      .split('--> statement-breakpoint')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    for (const statement of statements) {
      if (statement.startsWith('--')) continue; // Skip comments
      try {
        await db.execute(sql.raw(statement));
      } catch (error: any) {
        // Ignore "already exists" errors
        if (!error.message?.includes('already exists')) {
          console.error('Error executing statement:', error.message);
        }
      }
    }
    
    console.log('✅ Migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
