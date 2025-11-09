-- Change published column from integer to boolean
ALTER TABLE "blogPosts" ALTER COLUMN "published" TYPE boolean USING (published != 0);
ALTER TABLE "blogPosts" ALTER COLUMN "published" SET DEFAULT false;
