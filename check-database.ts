import postgres from 'postgres';

const DATABASE_URL = 'postgresql://postgres:oyxKbUhdabHyXSzkRwINQAXnAenybElr@trolley.proxy.rlwy.net:36394/railway';

async function checkDatabase() {
  const sql = postgres(DATABASE_URL, {
    ssl: 'require',
    max: 1
  });

  try {
    console.log('🔍 Checking database status...\n');
    
    // Check tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    console.log(`✅ Found ${tables.length} tables:`);
    tables.forEach((table: any) => {
      console.log(`  - ${table.table_name}`);
    });
    
    // Check if critical tables exist
    const tableNames = tables.map((t: any) => t.table_name);
    const requiredTables = ['users', 'projects', 'services', 'blogPosts', 'heroSection', 'footerSettings', 'aboutUs'];
    
    console.log('\n📋 Required tables status:');
    requiredTables.forEach(table => {
      const exists = tableNames.includes(table);
      console.log(`  ${exists ? '✅' : '❌'} ${table}`);
    });
    
    // Check content
    if (tableNames.includes('users')) {
      const userCount = await sql`SELECT COUNT(*) as count FROM users`;
      console.log(`\n👥 Users: ${userCount[0].count}`);
    }
    
    if (tableNames.includes('projects')) {
      const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
      console.log(`📁 Projects: ${projectCount[0].count}`);
    }
    
    if (tableNames.includes('services')) {
      const serviceCount = await sql`SELECT COUNT(*) as count FROM services`;
      console.log(`🔧 Services: ${serviceCount[0].count}`);
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await sql.end();
  }
}

checkDatabase();
