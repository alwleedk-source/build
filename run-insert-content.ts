import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

const DATABASE_URL = 'postgresql://postgres:oyxKbUhdabHyXSzkRwINQAXnAenybElr@trolley.proxy.rlwy.net:36394/railway';

async function insertContent() {
  console.log('🏗️ Inserting Dutch construction company content...\n');
  
  const sql = postgres(DATABASE_URL, {
    ssl: 'require',
    max: 1
  });

  try {
    const contentPath = join(process.cwd(), 'insert-content-direct.sql');
    const contentSQL = readFileSync(contentPath, 'utf-8');
    
    await sql.unsafe(contentSQL);
    
    console.log('✅ Content inserted successfully!\n');
    
    // Verify counts
    console.log('📊 Verifying content...');
    
    const serviceCount = await sql`SELECT COUNT(*) as count FROM services`;
    console.log(`  - Services: ${serviceCount[0].count}`);
    
    const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
    console.log(`  - Projects: ${projectCount[0].count}`);
    
    const testimonialCount = await sql`SELECT COUNT(*) as count FROM testimonials`;
    console.log(`  - Testimonials: ${testimonialCount[0].count}`);
    
    const partnerCount = await sql`SELECT COUNT(*) as count FROM partners`;
    console.log(`  - Partners: ${partnerCount[0].count}`);
    
    console.log('\n🎉 All content added successfully!');
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

insertContent();
