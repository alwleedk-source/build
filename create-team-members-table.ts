import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set');
  process.exit(1);
}

async function createTeamMembersTable() {
  const sql = postgres(DATABASE_URL);

  try {
    console.log('🔄 Creating teamMembers table...');

    // Create the table
    await sql`
      CREATE TABLE IF NOT EXISTS "teamMembers" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "position" VARCHAR(255) NOT NULL,
        "positionEn" VARCHAR(255),
        "bio" TEXT,
        "bioEn" TEXT,
        "image" VARCHAR(500) NOT NULL,
        "email" VARCHAR(320),
        "phone" VARCHAR(50),
        "order" INTEGER DEFAULT 0 NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    console.log('✅ teamMembers table created');

    // Create index
    await sql`
      CREATE INDEX IF NOT EXISTS "teamMembers_order_idx" 
      ON "teamMembers"("order")
    `;

    console.log('✅ Index created');

    // Check if table exists and has data
    const result = await sql`
      SELECT COUNT(*) as count FROM "teamMembers"
    `;

    console.log(`📊 Current team members count: ${result[0].count}`);

    console.log('✅ All done!');
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

createTeamMembersTable()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });

