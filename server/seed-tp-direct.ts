import postgres from 'postgres';

export async function seedTestimonialsPartnersDirect(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);
    
    console.log('[Seed TP Direct] Starting...');
    
    // Seed Testimonials
    const testimonials = [
      {
        name: "Jan de Vries",
        position: "Particulier",
        positionEn: "Private",
        company: "Villa Amsterdam Noord",
        companyEn: "Villa Amsterdam Noord",
        content: "BuildCraft heeft ons droomhuis werkelijkheid gemaakt. De aandacht voor detail en vakmanschap zijn ongeëvenaard. Zeer tevreden!",
        contentEn: "BuildCraft made our dream home a reality. The attention to detail and craftsmanship are unmatched. Very satisfied!",
        rating: 5,
        image: "/images/testimonials/jan.jpg",
        featured: true,
        order: 1,
      },
      {
        name: "Maria Jansen",
        position: "Directeur",
        positionEn: "Director",
        company: "TechStart BV",
        companyEn: "TechStart BV",
        content: "Professionele aanpak van A tot Z. Ons kantoorpand is prachtig gerenoveerd en precies zoals we het wilden. Aanrader!",
        contentEn: "Professional approach from A to Z. Our office building has been beautifully renovated and exactly as we wanted. Highly recommended!",
        rating: 5,
        image: "/images/testimonials/maria.jpg",
        featured: true,
        order: 2,
      },
      {
        name: "Peter Bakker",
        position: "Particulier",
        positionEn: "Private",
        company: "Woonhuis Den Haag",
        companyEn: "Residence The Hague",
        content: "Uitstekende communicatie en kwaliteit. De renovatie van onze klassieke stadswoning is perfect uitgevoerd. Top team!",
        contentEn: "Excellent communication and quality. The renovation of our classic townhouse was perfectly executed. Top team!",
        rating: 5,
        image: "/images/testimonials/peter.jpg",
        featured: true,
        order: 3,
      },
    ];
    
    for (const t of testimonials) {
      try {
        await sql`
          INSERT INTO testimonials (name, position, "positionEn", company, "companyEn", content, "contentEn", rating, image, featured, "order")
          VALUES (${t.name}, ${t.position}, ${t.positionEn}, ${t.company}, ${t.companyEn}, ${t.content}, ${t.contentEn}, ${t.rating}, ${t.image}, ${t.featured}, ${t.order})
          ON CONFLICT (name) DO UPDATE SET featured = true
        `;
        console.log(`[Seed TP Direct] ✅ Testimonial: ${t.name}`);
      } catch (error: any) {
        console.error(`[Seed TP Direct] ❌ Testimonial ${t.name}:`, error.message);
      }
    }
    
    // Seed Partners
    const partners = [
      { name: "BAM Bouw", logo: "/images/partners/bam.png", url: "https://www.bam.com", isActive: 1, order: 1 },
      { name: "Dura Vermeer", logo: "/images/partners/dura-vermeer.png", url: "https://www.duravermeer.nl", isActive: 1, order: 2 },
      { name: "VolkerWessels", logo: "/images/partners/volkerwessels.png", url: "https://www.volkerwessels.com", isActive: 1, order: 3 },
      { name: "Heijmans", logo: "/images/partners/heijmans.png", url: "https://www.heijmans.nl", isActive: 1, order: 4 },
      { name: "Ballast Nedam", logo: "/images/partners/ballast-nedam.png", url: "https://www.ballast-nedam.nl", isActive: 1, order: 5 },
      { name: "Van Wijnen", logo: "/images/partners/van-wijnen.png", url: "https://www.vanwijnen.nl", isActive: 1, order: 6 },
    ];
    
    for (const p of partners) {
      try {
        await sql`
          INSERT INTO partners (name, logo, url, "isActive", "order")
          VALUES (${p.name}, ${p.logo}, ${p.url}, ${p.isActive}, ${p.order})
          ON CONFLICT (name) DO UPDATE SET "isActive" = 1
        `;
        console.log(`[Seed TP Direct] ✅ Partner: ${p.name}`);
      } catch (error: any) {
        console.error(`[Seed TP Direct] ❌ Partner ${p.name}:`, error.message);
      }
    }
    
    await sql.end();
    
    console.log('[Seed TP Direct] Complete!');
    
    res.json({
      success: true,
      message: 'Testimonials and partners seeded successfully (direct SQL)',
      testimonials: testimonials.length,
      partners: partners.length
    });
  } catch (error: any) {
    console.error('[Seed TP Direct] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
