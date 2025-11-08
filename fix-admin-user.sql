-- Fix Admin User Login Issue
-- This script will create or update the admin user with the correct password hash

-- Delete existing admin user if exists (to start fresh)
DELETE FROM "admins" WHERE email = 'waleed.qodami@gmail.com';

-- Insert admin user with correct password hash
-- Password: 3505490qwE@@
-- Hash generated using bcrypt with 12 rounds (matching server configuration)
INSERT INTO "admins" ("email", "passwordHash", "name", "role", "isActive", "createdAt", "updatedAt")
VALUES (
  'waleed.qodami@gmail.com',
  '$2b$12$Vw.lUI/v.TYtE/3.ynW9DuGbqYBHiqpf5TULezOfEuuZfOHX.xCXC',
  'Waleed Qodami',
  'super_admin',
  1,
  NOW(),
  NOW()
);

-- Verify the user was created
SELECT id, email, name, role, "isActive", "createdAt" 
FROM "admins" 
WHERE email = 'waleed.qodami@gmail.com';
