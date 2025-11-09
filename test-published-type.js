import { Pool } from 'pg';

(async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    // Check column type
    const typeResult = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'blog_posts' AND column_name = 'published'
    `);
    console.log('📊 Column Type:', JSON.stringify(typeResult.rows, null, 2));
    
    // Check actual values
    const valuesResult = await pool.query(`
      SELECT id, title, published, pg_typeof(published) as type
      FROM blog_posts
      ORDER BY id
    `);
    console.log('\n📝 Actual Values:', JSON.stringify(valuesResult.rows, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
})();
