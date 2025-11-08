import postgres from 'postgres';

const DATABASE_URL = 'postgresql://postgres:oyxKbUhdabHyXSzkRwINQAXnAenybElr@trolley.proxy.rlwy.net:36394/railway';

async function checkEnum() {
  const sql = postgres(DATABASE_URL, {
    ssl: 'require',
    max: 1
  });

  try {
    console.log('🔍 Checking projects table schema...\n');
    
    const columns = await sql`
      SELECT column_name, data_type, udt_name
      FROM information_schema.columns
      WHERE table_name = 'projects'
      ORDER BY ordinal_position
    `;
    
    console.log('Columns:');
    columns.forEach((col: any) => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.udt_name})`);
    });
    
    // Check enum values
    console.log('\n🔍 Checking enum types...');
    const enums = await sql`
      SELECT t.typname, e.enumlabel
      FROM pg_type t 
      JOIN pg_enum e ON t.oid = e.enumtypid  
      WHERE t.typname LIKE '%category%'
      ORDER BY t.typname, e.enumsortorder
    `;
    
    if (enums.length > 0) {
      console.log('\nEnum values:');
      enums.forEach((e: any) => {
        console.log(`  - ${e.typname}: ${e.enumlabel}`);
      });
    } else {
      console.log('\nNo category enum found');
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await sql.end();
  }
}

checkEnum();
