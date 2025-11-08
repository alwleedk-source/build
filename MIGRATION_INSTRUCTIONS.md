# Database Migration Instructions

## Problem
The website is showing 500 errors because the following tables are missing from the database:
- `heroSection`
- `footerSettings`
- `aboutUs`

## Solution
Run the migration script to create these tables with default data.

## How to Run Migration on Railway

### Option 1: Using Railway CLI (Recommended)

1. **Install Railway CLI** (if not already installed):
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Link to your project**:
   ```bash
   railway link
   ```

4. **Run the migration**:
   ```bash
   railway run pnpm db:migrate
   ```

### Option 2: Using Railway Dashboard

1. Go to your Railway project dashboard
2. Click on your service
3. Go to the "Settings" tab
4. Scroll down to "Deploy Triggers"
5. Add a new "One-off Command":
   ```bash
   pnpm db:migrate
   ```
6. Click "Run Command"

### Option 3: Manual SQL Execution

1. Go to Railway Dashboard
2. Click on your PostgreSQL database
3. Click on "Data" tab
4. Click on "Query" button
5. Copy and paste the contents of `drizzle/0001_add_hero_footer_about.sql`
6. Click "Run Query"

## Verify Migration Success

After running the migration, check if the tables were created:

1. Go to Railway Dashboard → PostgreSQL → Data → Query
2. Run this query:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('heroSection', 'footerSettings', 'aboutUs');
   ```
3. You should see all three tables listed

## What the Migration Does

1. **Creates hero_style enum** for hero section layout styles
2. **Creates aboutUs table** with:
   - Bilingual content fields (Dutch/English)
   - Company statistics (years, team size, projects, satisfaction)
   - Mission, vision, and values
   - Default data included

3. **Creates heroSection table** with:
   - 5 different layout styles support
   - Bilingual content fields
   - Customizable buttons and statistics
   - Default data included

4. **Creates footerSettings table** with:
   - Company information
   - Contact details
   - Social media links
   - Bilingual copyright text
   - Default data included

## After Migration

Once the migration is complete:
1. The website should load without 500 errors
2. Admin settings pages will work properly
3. You can customize all content through the admin dashboard at `/admin/settings`

## Troubleshooting

If you still see errors after migration:

1. **Check if tables exist**:
   ```sql
   \dt
   ```

2. **Check table structure**:
   ```sql
   \d "heroSection"
   \d "footerSettings"
   \d "aboutUs"
   ```

3. **Verify default data was inserted**:
   ```sql
   SELECT * FROM "heroSection";
   SELECT * FROM "footerSettings";
   SELECT * FROM "aboutUs";
   ```

4. **Check application logs** in Railway dashboard for any remaining errors

## Need Help?

If you encounter any issues:
1. Check the Railway deployment logs
2. Verify DATABASE_URL environment variable is set correctly
3. Ensure the database is accessible from your application
4. Contact support with the error messages from the logs
