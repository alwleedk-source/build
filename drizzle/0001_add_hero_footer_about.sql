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
