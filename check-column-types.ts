import postgres from "postgres";

const DATABASE_URL = "postgresql://postgres:oyxKbUhdabHyXSzkRwINQAXnAenybElr@trolley.proxy.rlwy.net:36394/railway";

async function checkColumnTypes() {
  const sql = postgres(DATABASE_URL);

  console.log("🔍 Checking column types...\n");

  // Check services table
  const servicesColumns = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'services' 
    AND column_name IN ('showOnHomepage', 'featured')
  `;
  console.log("📦 Services table:");
  console.log(servicesColumns);

  // Check blogPosts table
  const blogColumns = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'blogPosts' 
    AND column_name IN ('published', 'featured')
  `;
  console.log("\n📝 BlogPosts table:");
  console.log(blogColumns);

  // Check testimonials table
  const testimonialsColumns = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'testimonials' 
    AND column_name IN ('featured', 'approved')
  `;
  console.log("\n💬 Testimonials table:");
  console.log(testimonialsColumns);

  // Check partners table
  const partnersColumns = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'partners' 
    AND column_name IN ('featured', 'active')
  `;
  console.log("\n🤝 Partners table:");
  console.log(partnersColumns);

  await sql.end();
}

checkColumnTypes().catch(console.error);
