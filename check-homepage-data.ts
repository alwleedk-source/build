import postgres from 'postgres';

const DATABASE_URL = 'postgresql://postgres:oyxKbUhdabHyXSzkRwINQAXnAenybElr@trolley.proxy.rlwy.net:36394/railway';

async function checkHomepageData() {
  const sql = postgres(DATABASE_URL);

  try {
    console.log('🔍 Checking homepage data...\n');

    // Check Services
    const services = await sql`
      SELECT id, title, "titleEn", "showOnHomepage"
      FROM services
      WHERE "showOnHomepage" = 1
      ORDER BY "order" ASC
    `;
    console.log('📦 Services (showOnHomepage=true):', services.length);
    services.forEach(s => console.log(`  - ${s.title} (${s.titleEn})`));

    // Check all services
    const allServices = await sql`SELECT id, title, "showOnHomepage" FROM services`;
    console.log(`\n📦 Total Services: ${allServices.length}`);
    allServices.forEach(s => console.log(`  - ${s.title} (showOnHomepage: ${s.showOnHomepage})`));

    // Check Blog Posts
    const blogPosts = await sql`
      SELECT id, title, "titleEn", published
      FROM "blogPosts"
      WHERE published = true
      ORDER BY "createdAt" DESC
      LIMIT 3
    `;
    console.log(`\n📝 Blog Posts (published=true):`, blogPosts.length);
    blogPosts.forEach(p => console.log(`  - ${p.title || p.titleEn}`));

    // Check all blog posts
    const allPosts = await sql`SELECT id, title, published FROM "blogPosts"`;
    console.log(`\n📝 Total Blog Posts: ${allPosts.length}`);

    // Check Testimonials
    const testimonials = await sql`
      SELECT id, name, featured
      FROM testimonials
      WHERE featured = true
      ORDER BY "order" ASC
    `;
    console.log(`\n💬 Testimonials (featured=true):`, testimonials.length);
    testimonials.forEach(t => console.log(`  - ${t.name}`));

    // Check all testimonials
    const allTestimonials = await sql`SELECT id, name, featured FROM testimonials`;
    console.log(`\n💬 Total Testimonials: ${allTestimonials.length}`);
    allTestimonials.forEach(t => console.log(`  - ${t.name} (featured: ${t.featured})`));

    // Check Partners
    const partners = await sql`
      SELECT id, name, featured
      FROM partners
      WHERE featured = true
      ORDER BY "order" ASC
    `;
    console.log(`\n🤝 Partners (featured=true):`, partners.length);
    partners.forEach(p => console.log(`  - ${p.name}`));

    // Check all partners
    const allPartners = await sql`SELECT id, name, featured FROM partners`;
    console.log(`\n🤝 Total Partners: ${allPartners.length}`);
    allPartners.forEach(p => console.log(`  - ${p.name} (featured: ${p.featured})`));

    console.log('\n✅ Data check complete!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

checkHomepageData();
