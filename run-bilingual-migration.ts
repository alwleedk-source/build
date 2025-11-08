import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

const DATABASE_URL = 'postgresql://postgres:oyxKbUhdabHyXSzkRwINQAXnAenybElr@trolley.proxy.rlwy.net:36394/railway';

async function runMigration() {
  console.log('🔄 Adding bilingual columns...');
  
  const sql = postgres(DATABASE_URL, {
    ssl: 'require',
    max: 1
  });

  try {
    const migrationPath = join(process.cwd(), 'add-bilingual-columns.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');
    
    await sql.unsafe(migrationSQL);
    
    console.log('✅ Bilingual columns added successfully!');
    
    // Verify
    console.log('\n🔍 Verifying services table schema...');
    const columns = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'services'
      ORDER BY ordinal_position
    `;
    
    console.log(`\nServices table now has ${columns.length} columns:`);
    columns.forEach((col: any) => {
      console.log(`  - ${col.column_name}`);
    });
    
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runMigration();
