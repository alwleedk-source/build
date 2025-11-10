-- Create teamMembers table
CREATE TABLE IF NOT EXISTS "teamMembers" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "position" VARCHAR(255) NOT NULL,
  "positionEn" VARCHAR(255),
  "bio" TEXT,
  "bioEn" TEXT,
  "image" VARCHAR(500) NOT NULL,
  "email" VARCHAR(320),
  "phone" VARCHAR(50),
  "order" INTEGER DEFAULT 0 NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create index on order for faster sorting
CREATE INDEX IF NOT EXISTS "teamMembers_order_idx" ON "teamMembers"("order");

-- Insert sample data (optional - remove if not needed)
-- INSERT INTO "teamMembers" ("name", "position", "positionEn", "bio", "bioEn", "image", "email", "phone", "order")
-- VALUES
-- ('John Doe', 'Project Manager', 'Project Manager', 'Ervaren projectmanager', 'Experienced project manager', 'https://via.placeholder.com/400', 'john@example.com', '+31612345678', 1);

SELECT 'teamMembers table created successfully' AS result;

