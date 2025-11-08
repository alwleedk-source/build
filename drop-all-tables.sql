-- Drop all existing tables to start fresh
-- This will remove all old MySQL-format tables

DROP TABLE IF EXISTS "about_content" CASCADE;
DROP TABLE IF EXISTS "about_us_page" CASCADE;
DROP TABLE IF EXISTS "analytics_events" CASCADE;
DROP TABLE IF EXISTS "blog_comments" CASCADE;
DROP TABLE IF EXISTS "blog_settings" CASCADE;
DROP TABLE IF EXISTS "company_details" CASCADE;
DROP TABLE IF EXISTS "company_initiatives" CASCADE;
DROP TABLE IF EXISTS "company_initiatives_settings" CASCADE;
DROP TABLE IF EXISTS "contact_form_settings" CASCADE;
DROP TABLE IF EXISTS "blog_articles" CASCADE;
DROP TABLE IF EXISTS "contact_info" CASCADE;
DROP TABLE IF EXISTS "contact_inquiries" CASCADE;
DROP TABLE IF EXISTS "content_backups" CASCADE;
DROP TABLE IF EXISTS "email_logs" CASCADE;
DROP TABLE IF EXISTS "email_settings" CASCADE;
DROP TABLE IF EXISTS "media_files" CASCADE;
DROP TABLE IF EXISTS "footer_settings" CASCADE;
DROP TABLE IF EXISTS "hero_content" CASCADE;
DROP TABLE IF EXISTS "legal_pages" CASCADE;
DROP TABLE IF EXISTS "maatschappelijke_statistics" CASCADE;
DROP TABLE IF EXISTS "newsletter_subscriptions" CASCADE;
DROP TABLE IF EXISTS "email_templates" CASCADE;
DROP TABLE IF EXISTS "partners_settings" CASCADE;
DROP TABLE IF EXISTS "section_settings" CASCADE;
DROP TABLE IF EXISTS "sessions" CASCADE;
DROP TABLE IF EXISTS "site_settings" CASCADE;
DROP TABLE IF EXISTS "social_media_links" CASCADE;
DROP TABLE IF EXISTS "statistics" CASCADE;
DROP TABLE IF EXISTS "statistics_settings" CASCADE;
DROP TABLE IF EXISTS "team_members" CASCADE;
DROP TABLE IF EXISTS "team_settings" CASCADE;
DROP TABLE IF EXISTS "testimonials_settings" CASCADE;

-- Drop any other potential tables
DROP TABLE IF EXISTS "admins" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "projects" CASCADE;
DROP TABLE IF EXISTS "services" CASCADE;
DROP TABLE IF EXISTS "partners" CASCADE;
DROP TABLE IF EXISTS "testimonials" CASCADE;
DROP TABLE IF EXISTS "siteSettings" CASCADE;
DROP TABLE IF EXISTS "contactMessages" CASCADE;
DROP TABLE IF EXISTS "blogPosts" CASCADE;

SELECT 'All tables dropped successfully!' as result;
