import postgres from 'postgres';

export async function fixAllColumns(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);
    
    console.log('[Fix All Columns] Starting...');
    
    // Fix testimonials table
    await sql`
      ALTER TABLE testimonials 
      ADD COLUMN IF NOT EXISTS "companyEn" VARCHAR(255)
    `;
    console.log('[Fix All Columns] ✅ Added companyEn to testimonials');
    
    // Fix partners table  
    await sql`
      ALTER TABLE partners 
      ADD COLUMN IF NOT EXISTS url VARCHAR(500),
      ADD COLUMN IF NOT EXISTS "isActive" INTEGER DEFAULT 1 NOT NULL
    `;
    console.log('[Fix All Columns] ✅ Added url and isActive to partners');
    
    // Get final columns
    const testimonialsColumns = await sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'testimonials' ORDER BY ordinal_position
    `;
    
    const partnersColumns = await sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'partners' ORDER BY ordinal_position
    `;
    
    await sql.end();
    
    console.log('[Fix All Columns] Complete!');
    
    res.json({
      success: true,
      message: 'All columns fixed',
      testimonialsColumns: testimonialsColumns.map((c: any) => c.column_name),
      partnersColumns: partnersColumns.map((c: any) => c.column_name)
    });
  } catch (error: any) {
    console.error('[Fix All Columns] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
