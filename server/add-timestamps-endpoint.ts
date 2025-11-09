import postgres from 'postgres';

export async function addTimestampsEndpoint(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);

    // Add createdAt and updatedAt to testimonials
    await sql`
      ALTER TABLE testimonials 
      ADD COLUMN IF NOT EXISTS createdat TIMESTAMP DEFAULT NOW() NOT NULL,
      ADD COLUMN IF NOT EXISTS updatedat TIMESTAMP DEFAULT NOW() NOT NULL
    `;

    // Add missing columns to partners
    await sql`
      ALTER TABLE partners 
      ADD COLUMN IF NOT EXISTS url VARCHAR(500),
      ADD COLUMN IF NOT EXISTS createdat TIMESTAMP DEFAULT NOW() NOT NULL,
      ADD COLUMN IF NOT EXISTS updatedat TIMESTAMP DEFAULT NOW() NOT NULL
    `;

    await sql.end();

    res.json({ 
      success: true, 
      message: 'Timestamps added successfully' 
    });
  } catch (error: any) {
    console.error('Add timestamps error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
