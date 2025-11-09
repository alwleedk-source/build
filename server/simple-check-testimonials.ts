import postgres from 'postgres';

export async function simpleCheckTestimonials(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);

    // Get testimonials columns - exact table name
    const columns = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'testimonials'
      ORDER BY ordinal_position
    `;

    // Get sample row
    const sampleRow = await sql`
      SELECT * FROM testimonials LIMIT 1
    `;

    await sql.end();

    res.json({ 
      success: true, 
      columns,
      sampleRow: sampleRow[0] || null,
      columnNames: columns.map((c: any) => c.column_name)
    });
  } catch (error: any) {
    console.error('Simple check error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
