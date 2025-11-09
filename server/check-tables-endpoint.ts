import { Request, Response } from 'express';
import postgres from 'postgres';

export async function handleCheckTables(req: Request, res: Response) {
  let sql: ReturnType<typeof postgres> | null = null;
  
  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'DATABASE_URL not configured' });
    }

    sql = postgres(process.env.DATABASE_URL);

    // List all tables
    const tables = await sql`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_type = 'BASE TABLE' 
      AND table_schema NOT IN ('pg_catalog', 'information_schema')
      ORDER BY table_schema, table_name
    `;

    // List all columns for blog-related tables
    const blogColumns = await sql`
      SELECT table_name, column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name LIKE '%blog%'
      ORDER BY table_name, ordinal_position
    `;

    await sql.end();

    res.json({
      success: true,
      tables: tables,
      blogColumns: blogColumns,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Check Tables] Error:', error);
    
    if (sql) {
      try {
        await sql.end();
      } catch (e) {
        console.error('Failed to close connection:', e);
      }
    }
    
    res.status(500).json({
      error: 'Check failed',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
