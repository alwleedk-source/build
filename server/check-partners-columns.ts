import postgres from 'postgres';

export async function checkPartnersColumns(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);

    // Get partners columns
    const columns = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'partners'
      ORDER BY ordinal_position
    `;

    // Get sample row
    const sampleRow = await sql`
      SELECT * FROM partners LIMIT 1
    `;

    await sql.end();

    res.json({ 
      success: true, 
      columns,
      sampleRow: sampleRow[0] || null,
      columnNames: columns.map((c: any) => c.column_name)
    });
  } catch (error: any) {
    console.error('Check partners columns error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
