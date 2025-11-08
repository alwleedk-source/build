# 🚨 Quick Fix Guide - Database Setup

## Problem
Your Railway database is **completely empty**. All tables are missing, causing 500 errors.

## ✅ Quick Solution (5 minutes)

### Step 1: Access Railway Database

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click on your project
3. Click on your **PostgreSQL** database (not the service)
4. Click on the **"Data"** tab
5. Click on the **"Query"** button

### Step 2: Run the Complete Migration

1. Open the file: `drizzle/COMPLETE_MIGRATION.sql` in your code editor
2. **Copy ALL the content** (it's a long file, make sure you copy everything)
3. **Paste** it into the Railway Query editor
4. Click **"Run Query"** button
5. Wait for it to complete (may take 10-30 seconds)

### Step 3: Verify Success

Run this query in Railway to check if tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see these tables:
- ✅ aboutUs
- ✅ admins
- ✅ blogPosts
- ✅ contactMessages
- ✅ emailSettings
- ✅ footerSettings
- ✅ heroSection
- ✅ homeSettings
- ✅ homepageSections
- ✅ mediaLibrary
- ✅ partners
- ✅ passwordResetTokens
- ✅ projects
- ✅ services
- ✅ siteSettings
- ✅ testimonials
- ✅ users

### Step 4: Test the Website

1. Go to your website: `https://build-production-09b2.up.railway.app`
2. The homepage should load **without errors**
3. Go to admin: `https://build-production-09b2.up.railway.app/admin`
4. All admin pages should work now

---

## Alternative Method: Using Railway CLI

If you prefer using the command line:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Connect to database and run migration
railway run pnpm db:migrate
```

---

## What This Migration Does

### Creates All Database Tables:

**Core Tables**:
- `users` - User authentication
- `admins` - Admin users
- `passwordResetTokens` - Password reset functionality

**Content Tables**:
- `projects` - Project portfolio (bilingual)
- `services` - Services offered (bilingual)
- `blogPosts` - Blog articles (bilingual)
- `testimonials` - Customer reviews (bilingual)
- `partners` - Partner logos

**Settings Tables**:
- `heroSection` - Hero section content (NEW)
- `footerSettings` - Footer content (NEW)
- `aboutUs` - About us section (NEW)
- `homeSettings` - Homepage statistics
- `siteSettings` - General site settings
- `emailSettings` - Email configuration

**Other Tables**:
- `contactMessages` - Contact form submissions
- `mediaLibrary` - Media files
- `homepageSections` - Section visibility

### Includes Default Data:

✅ **heroSection**: Default hero with "Bouw uw dromen" title
✅ **footerSettings**: Default footer with BuildCraft info
✅ **aboutUs**: Default about us content
✅ **homeSettings**: Default homepage statistics

---

## After Migration is Complete

1. **Refresh your website** - All errors should be gone
2. **Login to admin** at `/admin`
3. **Customize content**:
   - Go to Settings → Hero Settings
   - Go to Settings → Footer Settings
   - Go to Settings → About Us Settings
4. **Add your real content** in Dutch and English
5. **Upload images** for projects and services

---

## Troubleshooting

### If you see "permission denied" errors:
- Make sure you're connected to the correct database
- Check that DATABASE_URL is set correctly in Railway

### If tables already exist:
- The migration uses `CREATE TABLE IF NOT EXISTS`
- It's safe to run multiple times
- Default data uses `ON CONFLICT DO NOTHING`

### If you still see 500 errors:
1. Check Railway deployment logs
2. Verify all tables were created
3. Restart your Railway service
4. Clear browser cache

---

## Need Help?

If you encounter any issues:
1. Check the Railway logs for detailed error messages
2. Verify DATABASE_URL environment variable is set
3. Make sure PostgreSQL database is running
4. Try restarting the Railway service after migration

---

## File Location

The complete migration SQL file is located at:
```
drizzle/COMPLETE_MIGRATION.sql
```

This file contains **everything** needed to set up your database from scratch.
