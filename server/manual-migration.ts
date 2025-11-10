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
    
    // 1. Add videoBackground to hero_style enum if it doesn't exist
    await db.execute(sql`
      DO $$
      BEGIN
          -- Check if videoBackground value already exists in the enum
          IF NOT EXISTS (
              SELECT 1
              FROM pg_enum e
              JOIN pg_type t ON e.enumtypid = t.oid
              WHERE t.typname = 'hero_style'
              AND e.enumlabel = 'videoBackground'
          ) THEN
              -- Add videoBackground to the enum
              ALTER TYPE hero_style ADD VALUE 'videoBackground';
              RAISE NOTICE 'Added videoBackground to hero_style enum';
          ELSE
              RAISE NOTICE 'videoBackground already exists in hero_style enum';
          END IF;
      END$$;
    `);
    
    console.log('✅ Step 1: hero_style enum updated');
    
    // 2. Create aboutUs table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "aboutUs" (
        "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "aboutUs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
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
    
    console.log('✅ Step 2: aboutUs table created');
    
    // 3. Insert default data for aboutUs if table is empty
    await db.execute(sql`
      INSERT INTO "aboutUs" (
        "title",
        "titleEn",
        "subtitle",
        "subtitleEn",
        "description",
        "descriptionEn",
        "image",
        "mission",
        "missionEn",
        "vision",
        "visionEn",
        "values",
        "valuesEn"
      ) 
      SELECT 
        'Over Ons',
        'About Us',
        'Uw betrouwbare bouwpartner',
        'Your trusted construction partner',
        'BuildCraft is een toonaangevend bouwbedrijf met meer dan 15 jaar ervaring in de bouwsector. Wij zijn gespecialiseerd in nieuwbouw, renovatie, afwerking en onderhoud van residentiële en commerciële gebouwen.',
        'BuildCraft is a leading construction company with over 15 years of experience in the construction industry. We specialize in new construction, renovation, finishing and maintenance of residential and commercial buildings.',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80',
        'Onze missie is om hoogwaardige bouwdiensten te leveren die de verwachtingen van onze klanten overtreffen.',
        'Our mission is to deliver high-quality construction services that exceed our clients'' expectations.',
        'Wij streven ernaar de meest vertrouwde bouwpartner in Nederland te worden.',
        'We strive to become the most trusted construction partner in the Netherlands.',
        'Kwaliteit, Integriteit, Innovatie, Klanttevredenheid',
        'Quality, Integrity, Innovation, Customer Satisfaction'
      WHERE NOT EXISTS (SELECT 1 FROM "aboutUs" LIMIT 1);
    `);
    
    console.log('✅ Step 3: Default data inserted');
    
    // 4. Create footerSettings table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "footerSettings" (
        "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "footerSettings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
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
    
    console.log('✅ Step 4: footerSettings table created');
    
    // 5. Insert default data for footerSettings if table is empty
    await db.execute(sql`
      INSERT INTO "footerSettings" (
        "companyName",
        "companyDescription",
        "companyDescriptionEn",
        "address",
        "phone",
        "email",
        "facebookUrl",
        "linkedinUrl",
        "instagramUrl",
        "copyrightText",
        "copyrightTextEn"
      )
      SELECT
        'BuildCraft',
        'Uw betrouwbare partner voor alle bouw- en onderhoudswerkzaamheden in Nederland.',
        'Your trusted partner for all construction and maintenance work in the Netherlands.',
        'Bouwstraat 123
1234 AB Amsterdam',
        '+31 6 1234 5678',
        'info@buildcraft.nl',
        'https://facebook.com',
        'https://linkedin.com',
        'https://instagram.com',
        '© 2024 BuildCraft. Alle rechten voorbehouden.',
        '© 2024 BuildCraft. All rights reserved.'
      WHERE NOT EXISTS (SELECT 1 FROM "footerSettings" LIMIT 1);
    `);
    
    console.log('✅ Step 5: Default footer data inserted');
    
    console.log('✅ All migrations completed successfully!');
    return { 
      success: true, 
      message: 'All migrations completed successfully',
      steps: [
        'hero_style enum updated',
        'aboutUs table created',
        'aboutUs default data inserted',
        'footerSettings table created',
        'footerSettings default data inserted'
      ]
    };
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error: error.message };
  }
}
