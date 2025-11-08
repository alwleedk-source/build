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
    const migrationPath = join(process.cwd(), 'drizzle', 'COMPLETE_MIGRATION.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');
    
    console.log('📝 Running migration...');
    console.log(`Migration file size: ${migrationSQL.length} characters`);
    
    // Execute migration
    await sql.unsafe(migrationSQL);
    
    console.log('✅ Migration completed successfully!');
    
    // Verify tables
    console.log('\n🔍 Verifying tables...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    console.log(`\n✅ Found ${tables.length} tables:`);
    tables.forEach((table: any) => {
      console.log(`  - ${table.table_name}`);
    });
    
    // Check content counts
    console.log('\n📊 Content counts:');
    const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
    const serviceCount = await sql`SELECT COUNT(*) as count FROM services`;
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    
    console.log(`  - Projects: ${projectCount[0].count}`);
    console.log(`  - Services: ${serviceCount[0].count}`);
    console.log(`  - Users: ${userCount[0].count}`);
    
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runMigration();
