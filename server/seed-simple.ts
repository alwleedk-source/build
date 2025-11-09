import postgres from 'postgres';

export async function seedSimple(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);
    
    console.log('[Seed Simple] Starting...');
    
    // First, delete all existing data
    await sql`DELETE FROM testimonials`;
    await sql`DELETE FROM partners`;
    console.log('[Seed Simple] Cleared existing data');
    
    // Insert testimonials with minimal columns
    await sql`
      INSERT INTO testimonials (name, position, content, "contentEn", rating, featured, "order")
      VALUES 
        ('Jan de Vries', 'Particulier', 'BuildCraft heeft ons droomhuis werkelijkheid gemaakt. De aandacht voor detail en vakmanschap zijn ongeëvenaard. Zeer tevreden!', 'BuildCraft made our dream home a reality. The attention for detail and craftsmanship are unmatched. Very satisfied!', 5, true, 1),
        ('Maria Jansen', 'Directeur', 'Professionele aanpak van A tot Z. Ons kantoorpand is prachtig gerenoveerd en precies zoals we het wilden. Aanrader!', 'Professional approach from A to Z. Our office building has been beautifully renovated and exactly as we wanted. Highly recommended!', 5, true, 2),
        ('Peter Bakker', 'Particulier', 'Uitstekende communicatie en kwaliteit. De renovatie van onze klassieke stadswoning is perfect uitgevoerd. Top team!', 'Excellent communication and quality. The renovation of our classic townhouse was perfectly executed. Top team!', 5, true, 3)
    `;
    console.log('[Seed Simple] ✅ Inserted 3 testimonials');
    
    // Insert partners
    await sql`
      INSERT INTO partners (name, logo, url, "isActive", "order")
      VALUES 
        ('BAM Bouw', '/images/partners/bam.png', 'https://www.bam.com', 1, 1),
        ('Dura Vermeer', '/images/partners/dura-vermeer.png', 'https://www.duravermeer.nl', 1, 2),
        ('VolkerWessels', '/images/partners/volkerwessels.png', 'https://www.volkerwessels.com', 1, 3),
        ('Heijmans', '/images/partners/heijmans.png', 'https://www.heijmans.nl', 1, 4),
        ('Ballast Nedam', '/images/partners/ballast-nedam.png', 'https://www.ballast-nedam.nl', 1, 5),
        ('Van Wijnen', '/images/partners/van-wijnen.png', 'https://www.vanwijnen.nl', 1, 6)
    `;
    console.log('[Seed Simple] ✅ Inserted 6 partners');
    
    // Verify
    const testimonialCount = await sql`SELECT COUNT(*) as count FROM testimonials`;
    const partnerCount = await sql`SELECT COUNT(*) as count FROM partners`;
    
    await sql.end();
    
    console.log('[Seed Simple] Complete!');
    
    res.json({
      success: true,
      message: 'Simple seeding completed',
      testimonials: testimonialCount[0].count,
      partners: partnerCount[0].count
    });
  } catch (error: any) {
    console.error('[Seed Simple] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
