import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function checkAndMigrate() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not set');
    process.exit(1);
  }

  console.log('🔄 Connecting to database...');
  const client = postgres(databaseUrl, { max: 1 });
  const db = drizzle(client);

  try {
    // Check which tables exist
    console.log('🔍 Checking existing tables...');
    const result = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    const existingTables = result.rows.map((row: any) => row.table_name);
    console.log(`✅ Found ${existingTables.length} tables:`, existingTables);
    
    const requiredTables = [
      'heroSection',
      'footerSettings',
      'aboutUs',
      'projects',
      'services',
      'blogPosts',
      'testimonials',
      'partners',
      'admins',
      'users'
    ];
    
    const missingTables = requiredTables.filter(t => !existingTables.includes(t));
    
    if (missingTables.length === 0) {
      console.log('✅ All required tables exist! No migration needed.');
      
      // Check if data exists
      console.log('\n🔍 Checking data...');
      try {
        const heroData = await db.execute(sql`SELECT COUNT(*) as count FROM "heroSection"`);
        const footerData = await db.execute(sql`SELECT COUNT(*) as count FROM "footerSettings"`);
        const aboutData = await db.execute(sql`SELECT COUNT(*) as count FROM "aboutUs"`);
        
        console.log(`- heroSection: ${heroData.rows[0].count} rows`);
        console.log(`- footerSettings: ${footerData.rows[0].count} rows`);
        console.log(`- aboutUs: ${aboutData.rows[0].count} rows`);
      } catch (err) {
        console.log('⚠️ Some tables exist but may be empty');
      }
      
      await client.end();
      return;
    }
    
    console.log(`⚠️ Missing tables: ${missingTables.join(', ')}`);
    console.log('🔄 Running complete migration...');
    
    // Read and execute the complete migration file
    const migrationPath = join(__dirname, 'drizzle/COMPLETE_MIGRATION.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');
    
    // Split by statement breakpoint and execute each statement
    const statements = migrationSQL
      .split('--> statement-breakpoint')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`📝 Executing ${statements.length} SQL statements...`);
    
    let successCount = 0;
    let skipCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        await db.execute(sql.raw(statement));
        successCount++;
        if ((i + 1) % 10 === 0) {
          console.log(`   Progress: ${i + 1}/${statements.length} statements...`);
        }
      } catch (error: any) {
        // Ignore "already exists" errors
        if (error.message?.includes('already exists') || 
            error.message?.includes('duplicate')) {
          skipCount++;
        } else {
          console.error(`   ⚠️ Error in statement ${i + 1}:`, error.message.substring(0, 100));
        }
      }
    }
    
    console.log(`\n✅ Migration completed!`);
    console.log(`   - Executed: ${successCount} statements`);
    console.log(`   - Skipped (already exists): ${skipCount} statements`);
    
    // Verify tables again
    console.log('\n🔍 Verifying tables...');
    const finalResult = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    const finalTables = finalResult.rows.map((row: any) => row.table_name);
    console.log(`✅ Total tables now: ${finalTables.length}`);
    console.log('Tables:', finalTables.join(', '));
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

checkAndMigrate();
