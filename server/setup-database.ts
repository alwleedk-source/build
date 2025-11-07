/**
 * Complete Database Setup Script
 * This script will:
 * 1. Run all migrations to create tables
 * 2. Create default admin user
 * 
 * Run with: npx tsx server/setup-database.ts
 * Or on Railway: railway run pnpm db:setup
 */

import { sql } from 'drizzle-orm';
import { getDb } from './db';
import { createAdmin, getAdminByEmail } from './auth';

async function setupDatabase() {
  console.log('🚀 Starting complete database setup...\n');

  try {
    const db = await getDb();
    if (!db) {
      throw new Error('❌ Database connection failed. Check DATABASE_URL environment variable.');
    }

    console.log('✅ Database connection established\n');

    // Step 1: Check if tables exist
    console.log('📋 Step 1: Checking existing tables...');
    const tablesResult = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    const existingTables = (tablesResult.rows || []).map((row: any) => row.table_name);
    console.log(`   Found ${existingTables.length} tables:`, existingTables.join(', ') || 'none');

    // Step 2: Create ENUMs if they don't exist
    console.log('\n📋 Step 2: Creating ENUMs...');
    
    try {
      await db.execute(sql`
        DO $$ BEGIN
          CREATE TYPE admin_role AS ENUM('admin', 'super_admin');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);
      console.log('   ✅ admin_role enum ready');
    } catch (error) {
      console.log('   ⚠️  admin_role enum already exists');
    }

    try {
      await db.execute(sql`
        DO $$ BEGIN
          CREATE TYPE category AS ENUM('Residentieel', 'Commercieel', 'Industrieel');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);
      console.log('   ✅ category enum ready');
    } catch (error) {
      console.log('   ⚠️  category enum already exists');
    }

    try {
      await db.execute(sql`
        DO $$ BEGIN
          CREATE TYPE media_type AS ENUM('image', 'video', 'document');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);
      console.log('   ✅ media_type enum ready');
    } catch (error) {
      console.log('   ⚠️  media_type enum already exists');
    }

    try {
      await db.execute(sql`
        DO $$ BEGIN
          CREATE TYPE setting_type AS ENUM('text', 'number', 'boolean', 'json', 'image');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);
      console.log('   ✅ setting_type enum ready');
    } catch (error) {
      console.log('   ⚠️  setting_type enum already exists');
    }

    // Step 3: Create admins table if it doesn't exist
    console.log('\n📋 Step 3: Creating admins table...');
    
    if (!existingTables.includes('admins')) {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "admins" (
          "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          "email" varchar(320) NOT NULL UNIQUE,
          "passwordHash" varchar(255) NOT NULL,
          "name" varchar(255) NOT NULL,
          "role" admin_role DEFAULT 'admin' NOT NULL,
          "isActive" integer DEFAULT 1 NOT NULL,
          "lastLoginAt" timestamp,
          "createdAt" timestamp DEFAULT now() NOT NULL,
          "updatedAt" timestamp DEFAULT now() NOT NULL
        );
      `);
      console.log('   ✅ admins table created');
    } else {
      console.log('   ⚠️  admins table already exists');
    }

    // Step 4: Create other essential tables
    console.log('\n📋 Step 4: Creating other essential tables...');

    // Users table
    if (!existingTables.includes('users')) {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          "openId" varchar(64) NOT NULL UNIQUE,
          "name" text,
          "email" varchar(320),
          "loginMethod" varchar(64),
          "role" varchar(20) DEFAULT 'user' NOT NULL,
          "createdAt" timestamp DEFAULT now() NOT NULL,
          "updatedAt" timestamp DEFAULT now() NOT NULL,
          "lastSignedIn" timestamp DEFAULT now() NOT NULL
        );
      `);
      console.log('   ✅ users table created');
    }

    // siteSettings table
    if (!existingTables.includes('siteSettings')) {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "siteSettings" (
          "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          "key" varchar(255) NOT NULL UNIQUE,
          "value" text NOT NULL,
          "type" setting_type DEFAULT 'text' NOT NULL,
          "updatedAt" timestamp DEFAULT now() NOT NULL
        );
      `);
      console.log('   ✅ siteSettings table created');

      // Insert default settings
      await db.execute(sql`
        INSERT INTO "siteSettings" ("key", "value", "type", "updatedAt")
        VALUES
          ('siteName', 'BuildCraft - Professional Construction Services', 'text', NOW()),
          ('siteDescription', 'Professional construction and building services', 'text', NOW()),
          ('contactEmail', 'info@buildcraft.nl', 'text', NOW()),
          ('contactPhone', '+31 20 123 4567', 'text', NOW()),
          ('address', 'Amsterdam, Netherlands', 'text', NOW())
        ON CONFLICT ("key") DO NOTHING;
      `);
      console.log('   ✅ Default site settings inserted');
    }

    // Projects table
    if (!existingTables.includes('projects')) {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "projects" (
          "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          "title" varchar(255) NOT NULL,
          "description" text NOT NULL,
          "category" category NOT NULL,
          "image" varchar(500) NOT NULL,
          "featured" integer DEFAULT 0 NOT NULL,
          "showOnHomepage" integer DEFAULT 0 NOT NULL,
          "order" integer DEFAULT 0 NOT NULL,
          "createdAt" timestamp DEFAULT now() NOT NULL,
          "updatedAt" timestamp DEFAULT now() NOT NULL
        );
      `);
      console.log('   ✅ projects table created');
    }

    // Services table
    if (!existingTables.includes('services')) {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "services" (
          "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          "title" varchar(255) NOT NULL,
          "slug" varchar(255) NOT NULL UNIQUE,
          "description" text NOT NULL,
          "longDescription" text NOT NULL,
          "icon" varchar(50) NOT NULL,
          "features" text NOT NULL,
          "showOnHomepage" integer DEFAULT 0 NOT NULL,
          "order" integer DEFAULT 0 NOT NULL,
          "createdAt" timestamp DEFAULT now() NOT NULL,
          "updatedAt" timestamp DEFAULT now() NOT NULL
        );
      `);
      console.log('   ✅ services table created');
    }

    // contactMessages table
    if (!existingTables.includes('contactMessages')) {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "contactMessages" (
          "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          "name" varchar(255) NOT NULL,
          "email" varchar(320) NOT NULL,
          "phone" varchar(50),
          "message" text NOT NULL,
          "isRead" integer DEFAULT 0 NOT NULL,
          "ipAddress" varchar(45),
          "messageHash" varchar(64),
          "createdAt" timestamp DEFAULT now() NOT NULL
        );
      `);
      console.log('   ✅ contactMessages table created');
    }

    // Step 5: Create admin user
    console.log('\n📋 Step 5: Creating default admin user...');
    
    const adminEmail = 'waleed.qodami@gmail.com';
    const adminPassword = '3505490qwE@@';
    const adminName = 'Waleed Qodami';

    const existingAdmin = await getAdminByEmail(adminEmail);

    if (existingAdmin) {
      console.log('   ⚠️  Admin user already exists');
      console.log(`      Email: ${existingAdmin.email}`);
      console.log(`      Name: ${existingAdmin.name}`);
      console.log(`      Role: ${existingAdmin.role}`);
      console.log(`      Active: ${existingAdmin.isActive === 1 ? 'Yes' : 'No'}`);
    } else {
      const admin = await createAdmin({
        email: adminEmail,
        password: adminPassword,
        name: adminName,
        role: 'super_admin',
      });

      console.log('   ✅ Admin user created successfully!');
      console.log(`      Email: ${admin.email}`);
      console.log(`      Name: ${admin.name}`);
      console.log(`      Role: ${admin.role}`);
      console.log(`      Password: ${adminPassword}`);
    }

    // Step 6: Verify setup
    console.log('\n📋 Step 6: Verifying setup...');
    
    const finalTablesResult = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    const finalTables = (finalTablesResult.rows || []).map((row: any) => row.table_name);
    console.log(`   ✅ Total tables: ${finalTables.length}`);
    console.log(`   Tables: ${finalTables.join(', ')}`);

    const adminCount = await db.execute(sql`SELECT COUNT(*) as count FROM "admins";`);
    console.log(`   ✅ Admin users: ${adminCount.rows[0].count}`);

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📝 Login credentials:');
    console.log(`   URL: ${process.env.VITE_APP_URL || 'http://localhost:5000'}/login`);
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error);
    throw error;
  }
}

// Run the setup
setupDatabase()
  .then(() => {
    console.log('\n✅ Setup script finished successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Setup script failed:', error);
    process.exit(1);
  });
