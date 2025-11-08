-- Add missing tables only

-- Create enum for hero style if not exists
DO $$ BEGIN
  CREATE TYPE hero_style AS ENUM ('classic', 'modern', 'minimal', 'split', 'video');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Hero Section table
CREATE TABLE IF NOT EXISTS "heroSection" (
  "id" serial PRIMARY KEY,
  "style" hero_style DEFAULT 'classic',
  "title" text NOT NULL,
  "titleEn" text NOT NULL,
  "subtitle" text,
  "subtitleEn" text,
  "description" text,
  "descriptionEn" text,
  "backgroundImage" text,
  "videoUrl" text,
  "overlayOpacity" integer DEFAULT 50,
  "textAlignment" varchar(20) DEFAULT 'left',
  "primaryButtonText" varchar(100),
  "primaryButtonTextEn" varchar(100),
  "primaryButtonLink" text,
  "secondaryButtonText" varchar(100),
  "secondaryButtonTextEn" varchar(100),
  "secondaryButtonLink" text,
  "showStats" boolean DEFAULT false,
  "stat1Value" integer,
  "stat1Label" varchar(100),
  "stat1LabelEn" varchar(100),
  "stat2Value" integer,
  "stat2Label" varchar(100),
  "stat2LabelEn" varchar(100),
  "stat3Value" integer,
  "stat3Label" varchar(100),
  "stat3LabelEn" varchar(100),
  "stat4Value" integer,
  "stat4Label" varchar(100),
  "stat4LabelEn" varchar(100),
  "updatedAt" timestamp DEFAULT now()
);

-- Footer Settings table
CREATE TABLE IF NOT EXISTS "footerSettings" (
  "id" serial PRIMARY KEY,
  "companyName" varchar(255) NOT NULL,
  "description" text,
  "descriptionEn" text,
  "address" text,
  "phone" varchar(50),
  "email" varchar(255),
  "facebookUrl" text,
  "twitterUrl" text,
  "linkedinUrl" text,
  "instagramUrl" text,
  "youtubeUrl" text,
  "copyrightText" text,
  "copyrightTextEn" text,
  "updatedAt" timestamp DEFAULT now()
);

-- About Us table
CREATE TABLE IF NOT EXISTS "aboutUs" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "titleEn" text NOT NULL,
  "subtitle" text,
  "subtitleEn" text,
  "description" text NOT NULL,
  "descriptionEn" text NOT NULL,
  "image" text,
  "yearsExperience" integer,
  "teamSize" integer,
  "projectsCompleted" integer,
  "clientSatisfaction" integer,
  "mission" text,
  "missionEn" text,
  "vision" text,
  "visionEn" text,
  "values" text,
  "valuesEn" text,
  "updatedAt" timestamp DEFAULT now()
);

-- Blog Posts table
CREATE TABLE IF NOT EXISTS "blogPosts" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "titleEn" text NOT NULL,
  "slug" varchar(255) UNIQUE NOT NULL,
  "excerpt" text,
  "excerptEn" text,
  "content" text NOT NULL,
  "contentEn" text NOT NULL,
  "image" text,
  "category" varchar(100),
  "categoryEn" varchar(100),
  "authorId" integer,
  "published" boolean DEFAULT false,
  "order" integer DEFAULT 0,
  "createdAt" timestamp DEFAULT now(),
  "updatedAt" timestamp DEFAULT now()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS "testimonials" (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "position" varchar(255),
  "positionEn" varchar(255),
  "company" varchar(255),
  "content" text NOT NULL,
  "contentEn" text NOT NULL,
  "image" text,
  "rating" integer DEFAULT 5,
  "featured" boolean DEFAULT false,
  "order" integer DEFAULT 0,
  "createdAt" timestamp DEFAULT now()
);

-- Partners table
CREATE TABLE IF NOT EXISTS "partners" (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "logo" text NOT NULL,
  "website" text,
  "description" text,
  "descriptionEn" text,
  "featured" boolean DEFAULT false,
  "order" integer DEFAULT 0,
  "createdAt" timestamp DEFAULT now()
);

-- Insert default data

-- Hero Section default
INSERT INTO "heroSection" (
  "style", "title", "titleEn", "subtitle", "subtitleEn", 
  "description", "descriptionEn", "backgroundImage",
  "showStats", "stat1Value", "stat1Label", "stat1LabelEn",
  "stat2Value", "stat2Label", "stat2LabelEn",
  "stat3Value", "stat3Label", "stat3LabelEn",
  "stat4Value", "stat4Label", "stat4LabelEn"
)
VALUES (
  'classic',
  'Uw Droomhuis Begint Hier',
  'Your Dream Home Starts Here',
  'Professionele Bouwoplossingen',
  'Professional Construction Solutions',
  'Wij zijn een toonaangevend bouwbedrijf met meer dan 20 jaar ervaring in het leveren van hoogwaardige bouwprojecten.',
  'We are a leading construction company with over 20 years of experience in delivering high-quality construction projects.',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000',
  true,
  20, 'Jaar Ervaring', 'Years Experience',
  750, 'Projecten Voltooid', 'Projects Completed',
  50, 'Professionals', 'Professionals',
  99, 'Klanttevredenheid', 'Client Satisfaction'
)
ON CONFLICT DO NOTHING;

-- Footer Settings default
INSERT INTO "footerSettings" (
  "companyName", "description", "descriptionEn",
  "address", "phone", "email",
  "copyrightText", "copyrightTextEn"
)
VALUES (
  'BuildCraft',
  'Uw partner voor professionele bouwoplossingen',
  'Your partner for professional construction solutions',
  'Bouwstraat 123, 1234 AB Amsterdam',
  '+31 20 123 4567',
  'info@buildcraft.nl',
  '© 2024 BuildCraft. Alle rechten voorbehouden.',
  '© 2024 BuildCraft. All rights reserved.'
)
ON CONFLICT DO NOTHING;

-- About Us default
INSERT INTO "aboutUs" (
  "title", "titleEn", "subtitle", "subtitleEn",
  "description", "descriptionEn",
  "yearsExperience", "teamSize", "projectsCompleted", "clientSatisfaction",
  "mission", "missionEn", "vision", "visionEn", "values", "valuesEn"
)
VALUES (
  'Over BuildCraft',
  'About BuildCraft',
  'Uw Betrouwbare Bouwpartner',
  'Your Trusted Construction Partner',
  'BuildCraft is een toonaangevend bouwbedrijf met meer dan 20 jaar ervaring in de bouwsector. Wij zijn gespecialiseerd in nieuwbouw, renovatie, en onderhoud van residentiële en commerciële projecten.',
  'BuildCraft is a leading construction company with over 20 years of experience in the construction industry. We specialize in new construction, renovation, and maintenance of residential and commercial projects.',
  20, 50, 750, 99,
  'Onze missie is om hoogwaardige bouwprojecten te leveren die de verwachtingen van onze klanten overtreffen.',
  'Our mission is to deliver high-quality construction projects that exceed our clients expectations.',
  'Wij streven ernaar de meest vertrouwde bouwpartner in Nederland te worden.',
  'We strive to become the most trusted construction partner in the Netherlands.',
  'Kwaliteit, Integriteit, Innovatie, Klanttevredenheid',
  'Quality, Integrity, Innovation, Customer Satisfaction'
)
ON CONFLICT DO NOTHING;

-- Add homeSettings table if missing
CREATE TABLE IF NOT EXISTS "homeSettings" (
  "id" serial PRIMARY KEY,
  "heroTitle" text NOT NULL,
  "heroTitleEn" text NOT NULL,
  "heroSubtitle" text,
  "heroSubtitleEn" text,
  "heroDescription" text,
  "heroDescriptionEn" text,
  "heroImage" text,
  "heroButtonText" varchar(100),
  "heroButtonTextEn" varchar(100),
  "heroButtonLink" text,
  "showServices" boolean DEFAULT true,
  "showProjects" boolean DEFAULT true,
  "showTestimonials" boolean DEFAULT true,
  "showPartners" boolean DEFAULT true,
  "updatedAt" timestamp DEFAULT now()
);

-- Insert default homeSettings
INSERT INTO "homeSettings" (
  "heroTitle", "heroTitleEn", "heroSubtitle", "heroSubtitleEn",
  "heroDescription", "heroDescriptionEn", "heroImage",
  "heroButtonText", "heroButtonTextEn", "heroButtonLink"
)
VALUES (
  'Welkom bij BuildCraft',
  'Welcome to BuildCraft',
  'Professionele Bouwdiensten',
  'Professional Construction Services',
  'Uw partner voor hoogwaardige bouwprojecten',
  'Your partner for high-quality construction projects',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000',
  'Neem Contact Op',
  'Contact Us',
  '/contact'
)
ON CONFLICT DO NOTHING;

-- Add emailSettings table if missing
CREATE TABLE IF NOT EXISTS "emailSettings" (
  "id" serial PRIMARY KEY,
  "smtpHost" varchar(255),
  "smtpPort" integer,
  "smtpUser" varchar(255),
  "smtpPassword" varchar(255),
  "fromEmail" varchar(255),
  "fromName" varchar(255),
  "notificationEmail" varchar(255),
  "updatedAt" timestamp DEFAULT now()
);
