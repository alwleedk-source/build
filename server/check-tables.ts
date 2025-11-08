import { getDb } from './db';
import { sql } from 'drizzle-orm';

async function checkTables() {
  console.log('🔍 Checking database tables...');
  
  try {
    const db = await getDb();
    
    // Get all tables
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log(`\n📊 Total tables: ${tables.length}`);
    console.log('Tables:');
    tables.forEach((table: any) => {
      console.log(`  - ${table.table_name}`);
    });
    
    // Check if admins table exists
    const adminsExists = tables.some((t: any) => t.table_name === 'admins');
    console.log(`\n✅ admins table exists: ${adminsExists}`);
    
    if (adminsExists) {
      // Count admins
      const adminCount = await db.execute(sql`SELECT COUNT(*) as count FROM "admins";`);
      console.log(`✅ Admin users: ${adminCount[0].count}`);
      
      // Show all admins
      const admins = await db.execute(sql`SELECT id, email, name, role FROM "admins";`);
      console.log('\n👥 Admin users:');
      admins.forEach((admin: any) => {
        console.log(`  - ID: ${admin.id}, Email: ${admin.email}, Name: ${admin.name}, Role: ${admin.role}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkTables();
