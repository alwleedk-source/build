import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

const DATABASE_URL = 'postgresql://postgres:oyxKbUhdabHyXSzkRwINQAXnAenybElr@trolley.proxy.rlwy.net:36394/railway';

async function runMigration() {
  console.log('🔄 Connecting to Railway database...');
  
  const sql = postgres(DATABASE_URL, {
    ssl: 'require',
    max: 1
  });

  try {
    // Read migration file
    const migrationPath = join(process.cwd(), 'add-missing-tables.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');
    
    console.log('📝 Adding missing tables...');
    
    // Execute migration
    await sql.unsafe(migrationSQL);
    
    console.log('✅ Migration completed successfully!');
    
    // Verify tables
    console.log('\n🔍 Verifying all tables...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    console.log(`\n✅ Found ${tables.length} tables:`);
    tables.forEach((table: any) => {
      console.log(`  ✓ ${table.table_name}`);
    });
    
    // Check required tables
    const tableNames = tables.map((t: any) => t.table_name);
    const requiredTables = [
      'users', 'projects', 'services', 'blogPosts', 
      'heroSection', 'footerSettings', 'aboutUs',
      'testimonials', 'partners', 'homeSettings'
    ];
    
    console.log('\n📋 Required tables check:');
    let allPresent = true;
    requiredTables.forEach(table => {
      const exists = tableNames.includes(table);
      console.log(`  ${exists ? '✅' : '❌'} ${table}`);
      if (!exists) allPresent = false;
    });
    
    if (allPresent) {
      console.log('\n🎉 All required tables are present!');
    }
    
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runMigration();
