import postgres from 'postgres';

export async function publishAllPartners(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);
    
    // Check current state
    const current = await sql`
      SELECT id, name, "isActive" 
      FROM partners
    `;
    
    console.log('[Publish Partners] Current state:', current);
    
    // Update all partners to isActive = 1
    const result = await sql`
      UPDATE partners 
      SET "isActive" = 1
      RETURNING id, name, "isActive"
    `;
    
    console.log('[Publish Partners] Updated:', result);
    
    await sql.end();
    
    res.json({
      success: true,
      message: 'All partners published',
      count: result.length,
      partners: result
    });
  } catch (error: any) {
    console.error('[Publish Partners] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
