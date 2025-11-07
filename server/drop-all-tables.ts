import { getDb } from './db';
import { sql } from 'drizzle-orm';

async function dropAllTables() {
  console.log('🗑️  Dropping all existing tables...');
  
  try {
    const db = await getDb();
    
    // Drop all tables
    await db.execute(sql`DROP SCHEMA public CASCADE;`);
    await db.execute(sql`CREATE SCHEMA public;`);
    await db.execute(sql`GRANT ALL ON SCHEMA public TO public;`);
    
    console.log('✅ All tables dropped successfully!');
    console.log('✅ Schema recreated!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error dropping tables:', error);
    process.exit(1);
  }
}

dropAllTables();
