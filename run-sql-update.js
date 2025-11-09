// Run SQL update to add missing content
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runUpdate() {
  const DATABASE_URL = process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable not set!');
    console.log('This script needs to run on Railway with access to DATABASE_URL');
    process.exit(1);
  }

  console.log('🔗 Connecting to database...');
  const sql = postgres(DATABASE_URL);

  try {
    // Read SQL file
    const sqlFile = fs.readFileSync(path.join(__dirname, 'add-missing-content.sql'), 'utf8');
    
    console.log('📝 Executing SQL updates...');
    
    // Split by semicolon and execute each statement
    const statements = sqlFile
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (statement.toLowerCase().startsWith('select')) {
        const result = await sql.unsafe(statement);
        console.log('✅ Query result:', result);
      } else {
        await sql.unsafe(statement);
        console.log('✅ Statement executed successfully');
      }
    }

    console.log('\n🎉 All updates completed successfully!');
    console.log('\nVerifying data...');
    
    // Verify blog posts
    const blogs = await sql`SELECT COUNT(*) as count FROM "blogPosts" WHERE published = 1`;
    console.log(`📝 Published blog posts: ${blogs[0].count}`);
    
    // Verify testimonials
    const testimonials = await sql`SELECT COUNT(*) as count FROM testimonials`;
    console.log(`⭐ Testimonials: ${testimonials[0].count}`);
    
    // Verify partners
    const partners = await sql`SELECT COUNT(*) as count FROM partners WHERE "isActive" = 1`;
    console.log(`🤝 Active partners: ${partners[0].count}`);
    
  } catch (error) {
    console.error('❌ Error executing SQL:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runUpdate();
