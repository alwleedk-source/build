import postgres from 'postgres';

export async function publishAllTestimonials(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);
    
    // Check current state
    const current = await sql`
      SELECT id, name, featured 
      FROM testimonials
    `;
    
    console.log('[Publish Testimonials] Current state:', current);
    
    // Update all testimonials to featured = true
    const result = await sql`
      UPDATE testimonials 
      SET featured = true
      RETURNING id, name, featured
    `;
    
    console.log('[Publish Testimonials] Updated:', result);
    
    await sql.end();
    
    res.json({
      success: true,
      message: 'All testimonials published',
      count: result.length,
      testimonials: result
    });
  } catch (error: any) {
    console.error('[Publish Testimonials] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
