import postgres from 'postgres';

export async function seedMinimal(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);
    
    console.log('[Seed Minimal] Starting...');
    
    // First, delete all existing data
    await sql`DELETE FROM testimonials`;
    await sql`DELETE FROM partners`;
    console.log('[Seed Minimal] Cleared existing data');
    
    // Insert testimonials with only required columns
    await sql`
      INSERT INTO testimonials (name, content, "contentEn", rating)
      VALUES 
        ('Jan de Vries', 'BuildCraft heeft ons droomhuis werkelijkheid gemaakt. De aandacht voor detail en vakmanschap zijn ongeëvenaard. Zeer tevreden!', 'BuildCraft made our dream home a reality. The attention for detail and craftsmanship are unmatched. Very satisfied!', 5),
        ('Maria Jansen', 'Professionele aanpak van A tot Z. Ons kantoorpand is prachtig gerenoveerd en precies zoals we het wilden. Aanrader!', 'Professional approach from A to Z. Our office building has been beautifully renovated and exactly as we wanted. Highly recommended!', 5),
        ('Peter Bakker', 'Uitstekende communicatie en kwaliteit. De renovatie van onze klassieke stadswoning is perfect uitgevoerd. Top team!', 'Excellent communication and quality. The renovation of our classic townhouse was perfectly executed. Top team!', 5)
    `;
    console.log('[Seed Minimal] ✅ Inserted 3 testimonials');
    
    // Insert partners with only required columns
    await sql`
      INSERT INTO partners (name, logo)
      VALUES 
        ('BAM Bouw', '/images/partners/bam.png'),
        ('Dura Vermeer', '/images/partners/dura-vermeer.png'),
        ('VolkerWessels', '/images/partners/volkerwessels.png'),
        ('Heijmans', '/images/partners/heijmans.png'),
        ('Ballast Nedam', '/images/partners/ballast-nedam.png'),
        ('Van Wijnen', '/images/partners/van-wijnen.png')
    `;
    console.log('[Seed Minimal] ✅ Inserted 6 partners');
    
    // Verify
    const testimonialCount = await sql`SELECT COUNT(*) as count FROM testimonials`;
    const partnerCount = await sql`SELECT COUNT(*) as count FROM partners`;
    
    // Get actual columns
    const testimonialsColumns = await sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'testimonials' ORDER BY ordinal_position
    `;
    
    const partnersColumns = await sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'partners' ORDER BY ordinal_position
    `;
    
    await sql.end();
    
    console.log('[Seed Minimal] Complete!');
    
    res.json({
      success: true,
      message: 'Minimal seeding completed',
      testimonials: testimonialCount[0].count,
      partners: partnerCount[0].count,
      testimonialsColumns: testimonialsColumns.map((c: any) => c.column_name),
      partnersColumns: partnersColumns.map((c: any) => c.column_name)
    });
  } catch (error: any) {
    console.error('[Seed Minimal] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
