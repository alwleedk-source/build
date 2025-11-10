import { getDb } from './db';
import { sql } from 'drizzle-orm';

/**
 * Manual migration endpoint to run all necessary migrations
 * This can be called via /api/run-migration endpoint
 */
export async function runManualMigration() {
  try {
    console.log('🔧 Starting manual migration...');
    const db = await getDb();
    
    const results = [];
    
    // 1. Add videoBackground to hero_style enum if it doesn't exist
    try {
      await db.execute(sql`
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1
                FROM pg_enum e
                JOIN pg_type t ON e.enumtypid = t.oid
                WHERE t.typname = 'hero_style'
                AND e.enumlabel = 'videoBackground'
            ) THEN
                ALTER TYPE hero_style ADD VALUE 'videoBackground';
                RAISE NOTICE 'Added videoBackground to hero_style enum';
            ELSE
                RAISE NOTICE 'videoBackground already exists in hero_style enum';
            END IF;
        END$$;
      `);
      results.push('✅ hero_style enum updated');
      console.log('✅ Step 1: hero_style enum updated');
    } catch (error) {
      results.push(`⚠️ hero_style enum: ${error.message}`);
      console.log('⚠️ Step 1 error (continuing):', error.message);
    }
    
    // 2. Create aboutUs table if it doesn't exist
    try {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "aboutUs" (
          "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          "title" varchar(500) NOT NULL,
          "titleEn" varchar(500),
          "subtitle" varchar(500),
          "subtitleEn" varchar(500),
          "description" text NOT NULL,
          "descriptionEn" text,
          "image" varchar(500),
          "yearsExperience" integer DEFAULT 15,
          "teamSize" integer DEFAULT 50,
          "projectsCompleted" integer DEFAULT 500,
          "clientSatisfaction" integer DEFAULT 98,
          "mission" text,
          "missionEn" text,
          "vision" text,
          "visionEn" text,
          "values" text,
          "valuesEn" text,
          "updatedAt" timestamp DEFAULT now() NOT NULL
        );
      `);
      results.push('✅ aboutUs table created');
      console.log('✅ Step 2: aboutUs table created');
    } catch (error) {
      results.push(`⚠️ aboutUs table: ${error.message}`);
      console.log('⚠️ Step 2 error (continuing):', error.message);
    }
    
    // 3. Insert default data for aboutUs if table is empty
    try {
      const checkResult = await db.execute(sql`SELECT COUNT(*) as count FROM "aboutUs"`);
      const count = checkResult.rows[0]?.count || 0;
      
      if (count === 0 || count === '0') {
        await db.execute(sql`
          INSERT INTO "aboutUs" (
            "title", "titleEn", "subtitle", "subtitleEn",
            "description", "descriptionEn", "image",
            "mission", "missionEn", "vision", "visionEn",
            "values", "valuesEn"
          ) VALUES (
            'Over Ons',
            'About Us',
            'Uw betrouwbare bouwpartner',
            'Your trusted construction partner',
            'BuildCraft is een toonaangevend bouwbedrijf met meer dan 15 jaar ervaring in de bouwsector.',
            'BuildCraft is a leading construction company with over 15 years of experience.',
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80',
            'Onze missie is om hoogwaardige bouwdiensten te leveren.',
            'Our mission is to deliver high-quality construction services.',
            'Wij streven ernaar de meest vertrouwde bouwpartner te worden.',
            'We strive to become the most trusted construction partner.',
            'Kwaliteit, Integriteit, Innovatie, Klanttevredenheid',
            'Quality, Integrity, Innovation, Customer Satisfaction'
          );
        `);
        results.push('✅ aboutUs default data inserted');
        console.log('✅ Step 3: aboutUs default data inserted');
      } else {
        results.push('ℹ️ aboutUs already has data');
        console.log('ℹ️ Step 3: aboutUs already has data');
      }
    } catch (error) {
      results.push(`⚠️ aboutUs data: ${error.message}`);
      console.log('⚠️ Step 3 error (continuing):', error.message);
    }
    
    // 4. Create footerSettings table if it doesn't exist
    try {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "footerSettings" (
          "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          "companyName" varchar(255) NOT NULL,
          "companyDescription" text,
          "companyDescriptionEn" text,
          "address" text,
          "phone" varchar(50),
          "email" varchar(320),
          "facebookUrl" varchar(500),
          "twitterUrl" varchar(500),
          "linkedinUrl" varchar(500),
          "instagramUrl" varchar(500),
          "youtubeUrl" varchar(500),
          "copyrightText" varchar(500),
          "copyrightTextEn" varchar(500),
          "updatedAt" timestamp DEFAULT now() NOT NULL
        );
      `);
      results.push('✅ footerSettings table created');
      console.log('✅ Step 4: footerSettings table created');
    } catch (error) {
      results.push(`⚠️ footerSettings table: ${error.message}`);
      console.log('⚠️ Step 4 error (continuing):', error.message);
    }
    
    // 5. Insert default data for footerSettings if table is empty
    try {
      const checkResult = await db.execute(sql`SELECT COUNT(*) as count FROM "footerSettings"`);
      const count = checkResult.rows[0]?.count || 0;
      
      if (count === 0 || count === '0') {
        await db.execute(sql`
          INSERT INTO "footerSettings" (
            "companyName", "companyDescription", "companyDescriptionEn",
            "address", "phone", "email",
            "facebookUrl", "linkedinUrl", "instagramUrl",
            "copyrightText", "copyrightTextEn"
          ) VALUES (
            'BuildCraft',
            'Uw betrouwbare partner voor alle bouw- en onderhoudswerkzaamheden.',
            'Your trusted partner for all construction and maintenance work.',
            'Bouwstraat 123, 1234 AB Amsterdam',
            '+31 6 1234 5678',
            'info@buildcraft.nl',
            'https://facebook.com',
            'https://linkedin.com',
            'https://instagram.com',
            '© 2024 BuildCraft. Alle rechten voorbehouden.',
            '© 2024 BuildCraft. All rights reserved.'
          );
        `);
        results.push('✅ footerSettings default data inserted');
        console.log('✅ Step 5: footerSettings default data inserted');
      } else {
        results.push('ℹ️ footerSettings already has data');
        console.log('ℹ️ Step 5: footerSettings already has data');
      }
    } catch (error) {
      results.push(`⚠️ footerSettings data: ${error.message}`);
      console.log('⚠️ Step 5 error (continuing):', error.message);
    }
    
    console.log('✅ Migration process completed!');
    return { 
      success: true, 
      message: 'Migration process completed',
      results: results
    };
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error: error.message };
  }
}
