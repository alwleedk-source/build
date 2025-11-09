import postgres from 'postgres';

export async function handleCheckFooterColumns(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);
    
    const columns = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'footerSettings'
      ORDER BY ordinal_position
    `;
    
    await sql.end();
    
    res.json({
      success: true,
      columns: columns
    });
  } catch (error: any) {
    console.error('Check footer columns error:', error);
    res.status(500).json({ 
      error: 'Failed to check footer columns',
      message: error.message 
    });
  }
}
