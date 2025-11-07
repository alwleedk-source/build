# Railway Deployment Guide - BuildCraft Pro

## Prerequisites

1. Railway account (https://railway.app)
2. Neon PostgreSQL database (https://neon.tech) - **Already created** ✅
3. GitHub repository connected

---

## Step 1: Deploy to Railway

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose: `alwleedk-source/build`
5. Railway will automatically detect the Dockerfile and start building

---

## Step 2: Add Environment Variables

Go to your project → **Variables** tab → Click **"Raw Editor"** and paste:

```env
# Neon PostgreSQL (from your Neon dashboard)
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Cloudflare R2 Storage
R2_ACCOUNT_ID=b64f82cfcef1137e14debdd974ecc017
R2_ACCESS_KEY_ID=a5aed61b166e5737a3526c9b1c1afb23
R2_SECRET_ACCESS_KEY=f49acd44611c82a4d8265c402ce83aeb1b26280b311ad597a26c175733f89361
R2_BUCKET_NAME=buildo-images
R2_PUBLIC_URL=https://pub-80fcef09babe44708477ae81b08c8c41.r2.dev

# Resend Email
RESEND_API_KEY=re_UPiidPck_E68S37XW9Fb5as9W8sgCdQ7C

# JWT Secret
JWT_SECRET=m3ykK6Yx8Jk4LkiZr3CRpk

# App Configuration
VITE_APP_TITLE=BuildCraft - Professional Construction Services
VITE_APP_LOGO=https://files.manuscdn.com/user_upload_by_module/web_dev_logo/310519663204237360/sZgxUbRadMHCpdLE.png
VITE_APP_ID=RvJDY4Kv7DP2d6KMfMpU4s
BASE_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}

# Node Environment
NODE_ENV=production
```

**Important:** Replace `DATABASE_URL` with your actual Neon PostgreSQL connection string!

---

## Step 3: Push Database Schema

After deployment completes, you need to create the database tables.

### Option A: Using Railway CLI (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run pnpm drizzle-kit push
```

### Option B: Using Neon SQL Editor

1. Go to your Neon dashboard
2. Open **SQL Editor**
3. Run the schema from `drizzle/schema.ts` manually

---

## Step 4: Create Admin User

After schema is pushed, create the initial admin:

```bash
# Using Railway CLI
railway run npx tsx server/seed-admin-pg.ts
```

This will create:
- **Email:** waleed.qodami@gmail.com
- **Password:** 3505490qwE@@
- **Role:** super_admin

---

## Step 5: Access Your Application

1. Go to your Railway project
2. Click on your service
3. Go to **Settings** → **Networking**
4. Copy the **Public Domain** (e.g., `your-app.up.railway.app`)
5. Visit `https://your-app.up.railway.app/login`
6. Login with the admin credentials above

---

## Troubleshooting

### "Database not available" error

- Make sure `DATABASE_URL` is set correctly in Railway
- Verify Neon database is active (not paused)
- Check Railway logs for connection errors

### Build fails

- Check Railway build logs
- Ensure all environment variables are set
- Verify Dockerfile is correct

### Can't login

- Make sure you ran the seed script (`seed-admin-pg.ts`)
- Check database has `admins` table
- Verify `DATABASE_URL` is correct

---

## Post-Deployment

### Custom Domain (Optional)

1. Go to **Settings** → **Networking**
2. Click **"Add Custom Domain"**
3. Follow instructions to configure DNS

### Monitoring

- Railway provides automatic metrics
- Check **Deployments** tab for build history
- View **Logs** for runtime errors

---

## Important Notes

✅ **Database:** Using Neon PostgreSQL (not MySQL)
✅ **File Storage:** Using Cloudflare R2
✅ **Email:** Using Resend
✅ **Authentication:** Custom JWT-based system

---

## Support

If you encounter issues:
1. Check Railway logs
2. Verify all environment variables
3. Ensure Neon database is accessible
4. Test locally first with Neon DATABASE_URL

---

**Status:** Ready for production deployment! 🚀
