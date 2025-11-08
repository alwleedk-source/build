-- SQL Script to Create Admin User
-- Run this in Neon SQL Editor if you can't use Railway CLI

-- Create admin user with credentials:
-- Email: waleed.qodami@gmail.com
-- Password: 3505490qwE@@

INSERT INTO admins (email, password_hash, name, role, is_active, created_at, updated_at)
VALUES (
  'waleed.qodami@gmail.com',
  '$2b$12$5yg5UHGdqI50fmZlRD5Tbejd5boNtp/cgIvQxob.eHnpSuLHOL7EK',
  'Waleed Qodami',
  'super_admin',
  1,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Verify the user was created
SELECT id, email, name, role, is_active, created_at 
FROM admins 
WHERE email = 'waleed.qodami@gmail.com';
