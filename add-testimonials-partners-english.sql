-- Add English fields to testimonials table
ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "positionEn" VARCHAR(255);
ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "companyEn" VARCHAR(255);
ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "contentEn" TEXT;

-- No English fields needed for partners table (name and logo are language-neutral)
