import postgres from 'postgres';

export async function checkTestimonialsColumns(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);

    // Check columns in testimonials table
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'testimonials'
      ORDER BY ordinal_position
    `;

    // Get sample data
    const data = await sql`
      SELECT * FROM testimonials LIMIT 1
    `;

    await sql.end();

    res.json({ 
      success: true, 
      columns,
      sampleData: data[0] || null
    });
  } catch (error: any) {
    console.error('Check columns error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
