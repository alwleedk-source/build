-- Add English fields to projects table
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "titleEn" VARCHAR(255);
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT;

-- Add English fields to services table
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "titleEn" VARCHAR(255);
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT;
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "longDescriptionEn" TEXT;
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "featuresEn" TEXT;

-- Add English fields to blogPosts table
ALTER TABLE "blogPosts" ADD COLUMN IF NOT EXISTS "titleEn" VARCHAR(255);
ALTER TABLE "blogPosts" ADD COLUMN IF NOT EXISTS "excerptEn" TEXT;
ALTER TABLE "blogPosts" ADD COLUMN IF NOT EXISTS "contentEn" TEXT;
ALTER TABLE "blogPosts" ADD COLUMN IF NOT EXISTS "categoryEn" VARCHAR(100);
