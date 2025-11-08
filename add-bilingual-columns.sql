-- Add bilingual columns to existing tables

-- Services table
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "titleEn" text;
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "descriptionEn" text;
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "longDescriptionEn" text;
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "featuresEn" text;

-- Update titleEn to NOT NULL after adding default values
UPDATE "services" SET "titleEn" = "title" WHERE "titleEn" IS NULL;
UPDATE "services" SET "descriptionEn" = "description" WHERE "descriptionEn" IS NULL;
UPDATE "services" SET "longDescriptionEn" = "longDescription" WHERE "longDescriptionEn" IS NULL;
UPDATE "services" SET "featuresEn" = "features" WHERE "featuresEn" IS NULL;

-- Projects table
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "titleEn" text;
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "descriptionEn" text;
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "categoryEn" varchar(100);

UPDATE "projects" SET "titleEn" = "title" WHERE "titleEn" IS NULL;
UPDATE "projects" SET "descriptionEn" = "description" WHERE "descriptionEn" IS NULL;
UPDATE "projects" SET "categoryEn" = "category" WHERE "categoryEn" IS NULL;

-- Testimonials table - check if columns exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='position') THEN
        ALTER TABLE "testimonials" ADD COLUMN "position" varchar(255);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='positionEn') THEN
        ALTER TABLE "testimonials" ADD COLUMN "positionEn" varchar(255);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='content') THEN
        ALTER TABLE "testimonials" RENAME COLUMN "text" TO "content";
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='testimonials' AND column_name='contentEn') THEN
        ALTER TABLE "testimonials" ADD COLUMN "contentEn" text;
    END IF;
END $$;

UPDATE "testimonials" SET "contentEn" = "content" WHERE "contentEn" IS NULL;

-- Partners table
ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "description" text;
ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "descriptionEn" text;
