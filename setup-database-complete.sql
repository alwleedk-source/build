-- Complete Database Setup Script for BuildCraft Pro
-- Run this script in Neon SQL Editor to set up the entire database

-- ============================================
-- STEP 1: Drop existing tables if they exist
-- ============================================

DROP TABLE IF EXISTS "passwordResetTokens" CASCADE;
DROP TABLE IF EXISTS "admins" CASCADE;
DROP TABLE IF EXISTS "contactMessages" CASCADE;
DROP TABLE IF EXISTS "emailSettings" CASCADE;
DROP TABLE IF EXISTS "siteSettings" CASCADE;
DROP TABLE IF EXISTS "homepageSections" CASCADE;
DROP TABLE IF EXISTS "blogPosts" CASCADE;
DROP TABLE IF EXISTS "testimonials" CASCADE;
DROP TABLE IF EXISTS "teamMembers" CASCADE;
DROP TABLE IF EXISTS "partners" CASCADE;
DROP TABLE IF EXISTS "services" CASCADE;
DROP TABLE IF EXISTS "projects" CASCADE;
DROP TABLE IF EXISTS "mediaLibrary" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- Drop existing enums
DROP TYPE IF EXISTS "admin_role" CASCADE;
DROP TYPE IF EXISTS "category" CASCADE;
DROP TYPE IF EXISTS "media_type" CASCADE;
DROP TYPE IF EXISTS "setting_type" CASCADE;

-- ============================================
-- STEP 2: Create ENUMs
-- ============================================

CREATE TYPE "admin_role" AS ENUM('admin', 'super_admin');
CREATE TYPE "category" AS ENUM('Residentieel', 'Commercieel', 'Industrieel');
CREATE TYPE "media_type" AS ENUM('image', 'video', 'document');
CREATE TYPE "setting_type" AS ENUM('text', 'number', 'boolean', 'json', 'image');

-- ============================================
-- STEP 3: Create Tables
-- ============================================

-- Admins table
CREATE TABLE "admins" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"email" varchar(320) NOT NULL UNIQUE,
	"passwordHash" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" "admin_role" DEFAULT 'admin' NOT NULL,
	"isActive" integer DEFAULT 1 NOT NULL,
	"lastLoginAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Users table
CREATE TABLE "users" (
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

-- Projects table
CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"category" "category" NOT NULL,
	"image" varchar(500) NOT NULL,
	"featured" integer DEFAULT 0 NOT NULL,
	"showOnHomepage" integer DEFAULT 0 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Services table
CREATE TABLE "services" (
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

-- Blog Posts table
CREATE TABLE "blogPosts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL UNIQUE,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"image" varchar(500) NOT NULL,
	"category" varchar(100) NOT NULL,
	"authorId" integer NOT NULL,
	"published" integer DEFAULT 0 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Testimonials table
CREATE TABLE "testimonials" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"name" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"company" varchar(255),
	"content" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"image" varchar(500),
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Team Members table
CREATE TABLE "teamMembers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"name" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"bio" text,
	"image" varchar(500) NOT NULL,
	"email" varchar(320),
	"phone" varchar(50),
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Site Settings table
CREATE TABLE "siteSettings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"key" varchar(255) NOT NULL UNIQUE,
	"value" text NOT NULL,
	"type" "setting_type" DEFAULT 'text' NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Homepage Sections table
CREATE TABLE "homepageSections" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"name" varchar(100) NOT NULL UNIQUE,
	"isVisible" integer DEFAULT 1 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Contact Messages table
CREATE TABLE "contactMessages" (
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

-- Media Library table
CREATE TABLE "mediaLibrary" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"filename" varchar(255) NOT NULL,
	"url" varchar(500) NOT NULL,
	"type" "media_type" DEFAULT 'image' NOT NULL,
	"category" varchar(100),
	"size" integer,
	"uploadedAt" timestamp DEFAULT now() NOT NULL
);

-- Partners table
CREATE TABLE "partners" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"name" varchar(255) NOT NULL,
	"logo" varchar(500) NOT NULL,
	"url" varchar(500),
	"isActive" integer DEFAULT 1 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Email Settings table
CREATE TABLE "emailSettings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"smtpHost" varchar(255),
	"smtpPort" integer,
	"smtpUser" varchar(320),
	"smtpPassword" varchar(500),
	"fromEmail" varchar(320),
	"fromName" varchar(255),
	"autoReplyEnabled" integer DEFAULT 0 NOT NULL,
	"autoReplySubject" varchar(255) DEFAULT 'Bedankt voor uw bericht' NOT NULL,
	"autoReplyMessage" text,
	"notificationEnabled" integer DEFAULT 0 NOT NULL,
	"notificationEmail" varchar(320),
	"contactPhone" varchar(50),
	"contactEmail" varchar(320),
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Password Reset Tokens table
CREATE TABLE "passwordResetTokens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"adminId" integer NOT NULL,
	"token" varchar(255) NOT NULL UNIQUE,
	"expiresAt" timestamp NOT NULL,
	"used" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);

-- ============================================
-- STEP 4: Insert Admin User
-- ============================================

INSERT INTO "admins" ("email", "passwordHash", "name", "role", "isActive", "createdAt", "updatedAt")
VALUES (
  'waleed.qodami@gmail.com',
  '$2b$12$5yg5UHGdqI50fmZlRD5Tbejd5boNtp/cgIvQxob.eHnpSuLHOL7EK',
  'Waleed Qodami',
  'super_admin',
  1,
  NOW(),
  NOW()
);

-- ============================================
-- STEP 5: Insert Default Site Settings
-- ============================================

INSERT INTO "siteSettings" ("key", "value", "type", "updatedAt")
VALUES
  ('siteName', 'BuildCraft - Professional Construction Services', 'text', NOW()),
  ('siteDescription', 'Professional construction and building services', 'text', NOW()),
  ('contactEmail', 'info@buildcraft.nl', 'text', NOW()),
  ('contactPhone', '+31 20 123 4567', 'text', NOW()),
  ('address', 'Amsterdam, Netherlands', 'text', NOW())
ON CONFLICT ("key") DO NOTHING;

-- ============================================
-- STEP 6: Verify Setup
-- ============================================

-- Check admin user
SELECT id, email, name, role, "isActive", "createdAt" 
FROM "admins" 
WHERE email = 'waleed.qodami@gmail.com';

-- Check site settings
SELECT * FROM "siteSettings";

-- Show all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
