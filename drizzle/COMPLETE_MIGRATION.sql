CREATE TYPE "public"."admin_role" AS ENUM('admin', 'super_admin');--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('Residentieel', 'Commercieel', 'Industrieel');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('image', 'video', 'document');--> statement-breakpoint
CREATE TYPE "public"."setting_type" AS ENUM('text', 'number', 'boolean', 'json', 'image');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "admins_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(320) NOT NULL,
	"passwordHash" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" "admin_role" DEFAULT 'admin' NOT NULL,
	"isActive" integer DEFAULT 1 NOT NULL,
	"lastLoginAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "blogPosts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blogPosts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"image" varchar(500) NOT NULL,
	"category" varchar(100) NOT NULL,
	"authorId" integer NOT NULL,
	"published" integer DEFAULT 0 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blogPosts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contactMessages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contactMessages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(50),
	"message" text NOT NULL,
	"isRead" integer DEFAULT 0 NOT NULL,
	"ipAddress" varchar(45),
	"messageHash" varchar(64),
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "emailSettings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "emailSettings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
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
--> statement-breakpoint
CREATE TABLE "homepageSections" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "homepageSections_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"isVisible" integer DEFAULT 1 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "homepageSections_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "mediaLibrary" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "mediaLibrary_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"filename" varchar(255) NOT NULL,
	"url" varchar(500) NOT NULL,
	"type" "media_type" DEFAULT 'image' NOT NULL,
	"category" varchar(100),
	"size" integer,
	"uploadedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "partners_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"logo" varchar(500) NOT NULL,
	"url" varchar(500),
	"isActive" integer DEFAULT 1 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "passwordResetTokens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "passwordResetTokens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"adminId" integer NOT NULL,
	"token" varchar(255) NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"used" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "passwordResetTokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
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
--> statement-breakpoint
CREATE TABLE "services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"longDescription" text NOT NULL,
	"icon" varchar(50) NOT NULL,
	"features" text NOT NULL,
	"showOnHomepage" integer DEFAULT 0 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "siteSettings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "siteSettings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"key" varchar(255) NOT NULL,
	"value" text NOT NULL,
	"type" "setting_type" DEFAULT 'text' NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "siteSettings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "teamMembers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "teamMembers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
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
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "testimonials_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
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
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" varchar(20) DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
-- Add new tables for Hero Section, Footer Settings, and About Us

-- Create hero_style enum
DO $$ BEGIN
 CREATE TYPE "public"."hero_style" AS ENUM('classic', 'split', 'minimal', 'fullBackground', 'videoBackground');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Create aboutUs table
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

-- Create heroSection table
CREATE TABLE IF NOT EXISTS "heroSection" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "heroSection_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"style" "hero_style" DEFAULT 'classic' NOT NULL,
	"title" varchar(500) NOT NULL,
	"titleEn" varchar(500),
	"subtitle" varchar(500),
	"subtitleEn" varchar(500),
	"description" text,
	"descriptionEn" text,
	"backgroundImage" varchar(500),
	"videoUrl" varchar(500),
	"overlayOpacity" integer DEFAULT 50,
	"textAlignment" varchar(20) DEFAULT 'center',
	"primaryButtonText" varchar(100),
	"primaryButtonTextEn" varchar(100),
	"primaryButtonLink" varchar(500),
	"secondaryButtonText" varchar(100),
	"secondaryButtonTextEn" varchar(100),
	"secondaryButtonLink" varchar(500),
	"showStats" integer DEFAULT 1 NOT NULL,
	"stat1Value" integer DEFAULT 0,
	"stat1Label" varchar(100),
	"stat1LabelEn" varchar(100),
	"stat2Value" integer DEFAULT 0,
	"stat2Label" varchar(100),
	"stat2LabelEn" varchar(100),
	"stat3Value" integer DEFAULT 0,
	"stat3Label" varchar(100),
	"stat3LabelEn" varchar(100),
	"stat4Value" integer DEFAULT 0,
	"stat4Label" varchar(100),
	"stat4LabelEn" varchar(100),
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Create footerSettings table
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

-- Insert default data for heroSection
INSERT INTO "heroSection" (
	"title",
	"titleEn",
	"subtitle",
	"subtitleEn",
	"description",
	"descriptionEn",
	"backgroundImage",
	"primaryButtonText",
	"primaryButtonTextEn",
	"primaryButtonLink",
	"secondaryButtonText",
	"secondaryButtonTextEn",
	"secondaryButtonLink",
	"stat1Value",
	"stat1Label",
	"stat1LabelEn",
	"stat2Value",
	"stat2Label",
	"stat2LabelEn",
	"stat3Value",
	"stat3Label",
	"stat3LabelEn",
	"stat4Value",
	"stat4Label",
	"stat4LabelEn"
) VALUES (
	'Bouw uw dromen',
	'Build Your Dreams',
	'met BuildCraft',
	'with BuildCraft',
	'Professionele bouw- en onderhoudsdiensten voor uw gebouwen.',
	'Professional construction and maintenance services for your buildings.',
	'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80',
	'Neem Contact Op',
	'Get In Touch',
	'/contact',
	'Onze Diensten',
	'Our Services',
	'/diensten',
	15,
	'Jaar ervaring',
	'Years of experience',
	500,
	'Projecten',
	'Projects',
	98,
	'Tevredenheid',
	'Satisfaction',
	50,
	'Team leden',
	'Team members'
) ON CONFLICT DO NOTHING;

-- Insert default data for footerSettings
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
) VALUES (
	'BuildCraft',
	'Uw betrouwbare partner voor alle bouw- en onderhoudswerkzaamheden in Nederland.',
	'Your trusted partner for all construction and maintenance work in the Netherlands.',
	E'Bouwstraat 123\n1234 AB Amsterdam',
	'+31 6 1234 5678',
	'info@buildcraft.nl',
	'https://facebook.com',
	'https://linkedin.com',
	'https://instagram.com',
	'© 2024 BuildCraft. Alle rechten voorbehouden.',
	'© 2024 BuildCraft. All rights reserved.'
) ON CONFLICT DO NOTHING;

-- Insert default data for aboutUs
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
) VALUES (
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
) ON CONFLICT DO NOTHING;
