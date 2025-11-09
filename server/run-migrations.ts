import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { readFileSync, readdirSync } from 'fs';
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
    
    // Get all migration files from drizzle/migrations directory
    const migrationsDir = join(__dirname, '../drizzle/migrations');
    const migrationFiles = readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Sort to run in order
    
    console.log(`Found ${migrationFiles.length} migration file(s)`);
    
    for (const migrationFile of migrationFiles) {
      console.log(`\n📄 Running migration: ${migrationFile}`);
      const migrationPath = join(migrationsDir, migrationFile);
      const migrationSQL = readFileSync(migrationPath, 'utf-8');
      
      // Split by statement breakpoint and execute each statement
      const statements = migrationSQL
        .split('--> statement-breakpoint')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      for (const statement of statements) {
        if (statement.startsWith('--') && !statement.includes('DO $$')) continue; // Skip pure comments
        try {
          await db.execute(sql.raw(statement));
        } catch (error: any) {
          // Ignore "already exists" errors
          if (!error.message?.includes('already exists') && 
              !error.message?.includes('duplicate')) {
            console.error(`  ⚠️  Error in ${migrationFile}:`, error.message);
          } else {
            console.log(`  ℹ️  Skipped (already exists)`);
          }
        }
      }
      
      console.log(`  ✅ ${migrationFile} completed`);
    }
    
    console.log('\n✅ All migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
