// Insert all missing content into database
import postgres from 'postgres';
import fs from 'fs';

async function insertContent() {
  const DATABASE_URL = process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL not set!');
    process.exit(1);
  }

  console.log('🔗 Connecting to database...');
  const sql = postgres(DATABASE_URL);

  try {
    // Insert Blog Posts
    console.log('\n📝 Inserting blog posts...');
    
    // Check if blogs already exist
    const existingBlogs = await sql`SELECT COUNT(*) FROM "blogPosts"`;
    if (existingBlogs[0].count > 0) {
      console.log('⚠️  Blog posts already exist, skipping...');
    } else {
    
    const blog1 = await sql`
      INSERT INTO "blogPosts" (
        title, "titleEn", slug, excerpt, "excerptEn", content, "contentEn",
        image, category, "categoryEn", "authorId", published, "order"
      ) VALUES (
        'Trends in Modern Bouwontwerp 2024',
        'Trends in Modern Construction Design 2024',
        'trends-modern-bouwontwerp-2024',
        'Ontdek de nieuwste trends in modern bouwontwerp voor 2024.',
        'Discover the latest trends in modern construction design for 2024.',
        '# Trends in Modern Bouwontwerp 2024\n\nDe bouwsector evolueert constant...',
        '# Trends in Modern Construction Design 2024\n\nThe construction industry is constantly evolving...',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        'Trends', 'Trends', 1, 1, 1
      ) RETURNING id, title
    `;
    console.log('✅ Blog 1:', blog1[0].title);

    const blog2 = await sql`
      INSERT INTO "blogPosts" (
        title, "titleEn", slug, excerpt, "excerptEn", content, "contentEn",
        image, category, "categoryEn", "authorId", published, "order"
      ) VALUES (
        'Renoveren of Nieuwbouw? Maak de Juiste Keuze',
        'Renovation or New Construction? Make the Right Choice',
        'renoveren-of-nieuwbouw-juiste-keuze',
        'Twijfelt u tussen renoveren en nieuwbouw?',
        'Doubting between renovation and new construction?',
        '# Renoveren of Nieuwbouw?\n\nEen van de belangrijkste beslissingen...',
        '# Renovation or New Construction?\n\nOne of the most important decisions...',
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
        'Advies', 'Advice', 1, 1, 2
      ) RETURNING id, title
    `;
    console.log('✅ Blog 2:', blog2[0].title);

    const blog3 = await sql`
      INSERT INTO "blogPosts" (
        title, "titleEn", slug, excerpt, "excerptEn", content, "contentEn",
        image, category, "categoryEn", "authorId", published, "order"
      ) VALUES (
        '5 Tips voor Duurzaam Bouwen',
        '5 Tips for Sustainable Building',
        '5-tips-duurzaam-bouwen',
        'Duurzaam bouwen is goed voor het milieu én uw portemonnee.',
        'Sustainable building is good for the environment and your wallet.',
        '# 5 Tips voor Duurzaam Bouwen\n\nDuurzaam bouwen wordt steeds belangrijker...',
        '# 5 Tips for Sustainable Building\n\nSustainable building is becoming increasingly important...',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'Duurzaamheid', 'Sustainability', 1, 1, 3
      ) RETURNING id, title
    `;
    console.log('✅ Blog 3:', blog3[0].title);
    }

    // Insert Testimonials
    console.log('\n⭐ Inserting testimonials...');
    
    await sql`
      INSERT INTO testimonials (
        name, position, "positionEn", company, "companyEn", 
        content, "contentEn", rating, "order"
      ) VALUES 
      (
        'Jan de Vries', 'Eigenaar', 'Owner',
        'Villa Amsterdam Noord', 'Villa Amsterdam North',
        'BuildCraft heeft ons droomhuis werkelijkheid gemaakt. Van het eerste ontwerp tot de oplevering was alles perfect geregeld.',
        'BuildCraft made our dream home a reality. From the first design to delivery, everything was perfectly arranged.',
        5, 1
      ),
      (
        'Maria Jansen', 'Directeur', 'Director',
        'TechStart BV', 'TechStart BV',
        'Voor de renovatie van ons kantoorpand hebben we BuildCraft ingeschakeld. Ze hebben het project binnen tijd en budget opgeleverd.',
        'For the renovation of our office building we hired BuildCraft. They delivered the project on time and within budget.',
        5, 2
      ),
      (
        'Peter Bakker', 'Huiseigenaar', 'Homeowner',
        'Woonhuis Den Haag', 'Residence The Hague',
        'De renovatie en uitbreiding van onze klassieke stadswoning was een groot project. BuildCraft heeft dit vakkundig uitgevoerd.',
        'The renovation and extension of our classic townhouse was a major project. BuildCraft executed this professionally.',
        5, 3
      )
    `;
    console.log('✅ 3 testimonials inserted');

    // Insert Partners
    console.log('\n🤝 Inserting partners...');
    
    await sql`
      INSERT INTO partners (name, logo, url, "isActive", "order") VALUES 
      ('BAM Bouw', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Royal_BAM_Group_logo.svg/320px-Royal_BAM_Group_logo.svg.png', 'https://www.bam.com', 1, 1),
      ('Dura Vermeer', 'https://www.duravermeer.nl/themes/custom/duravermeer/logo.svg', 'https://www.duravermeer.nl', 1, 2),
      ('VolkerWessels', 'https://www.volkerwessels.com/themes/custom/vw/logo.svg', 'https://www.volkerwessels.com', 1, 3),
      ('Heijmans', 'https://www.heijmans.nl/themes/custom/heijmans/logo.svg', 'https://www.heijmans.nl', 1, 4),
      ('Ballast Nedam', 'https://www.ballast-nedam.com/themes/custom/ballast_nedam/logo.svg', 'https://www.ballast-nedam.com', 1, 5),
      ('Van Wijnen', 'https://www.vanwijnen.nl/themes/custom/vanwijnen/logo.svg', 'https://www.vanwijnen.nl', 1, 6)
    `;
    console.log('✅ 6 partners inserted');

    // Verify
    console.log('\n🔍 Verifying data...');
    const blogCount = await sql`SELECT COUNT(*) FROM "blogPosts" WHERE published = 1`;
    const testimonialCount = await sql`SELECT COUNT(*) FROM testimonials`;
    const partnerCount = await sql`SELECT COUNT(*) FROM partners WHERE "isActive" = 1`;
    
    console.log(`\n📊 Results:`);
    console.log(`   📝 Published blogs: ${blogCount[0].count}`);
    console.log(`   ⭐ Testimonials: ${testimonialCount[0].count}`);
    console.log(`   🤝 Active partners: ${partnerCount[0].count}`);
    
    console.log('\n🎉 All content inserted successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === '23505') {
      console.log('⚠️  Data already exists (duplicate key). This is OK if running multiple times.');
    } else {
      throw error;
    }
  } finally {
    await sql.end();
  }
}

insertContent();
