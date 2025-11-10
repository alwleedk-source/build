# 🎉 BuildCraft Website - Team Members Update

## ✅ Latest Updates (Nov 10, 2024)

### Team Members Page - Fully Renovated ✨

The Team Members management page has been completely overhauled with:

- ✅ **AdminLayout Integration** - Fully integrated with admin dashboard
- ✅ **Modern Design** - Using Card and Button components
- ✅ **Dutch Translation** - All texts translated to Dutch
- ✅ **Connected to About Us** - Team members display on `/over-ons` page
- ✅ **R2 Image Upload** - Cloudflare R2 for image storage
- ✅ **Complete CRUD** - Add, edit, delete team members

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm
- PostgreSQL database (Railway)
- Cloudflare R2 bucket

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
pnpm db:setup

# Start development server
pnpm dev
```

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📦 Deployment to Railway

### Method 1: Git Push (Automatic)

```bash
# Add remote if not exists
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main

# Railway will automatically deploy!
```

### Method 2: Using Deployment Script

```bash
./deploy.sh
```

## 🔗 Important URLs

### Production
- **Admin Panel**: https://build-production-09b2.up.railway.app/admin
- **Team Management**: https://build-production-09b2.up.railway.app/admin/team
- **About Us (Team Display)**: https://build-production-09b2.up.railway.app/over-ons

## 📁 Project Structure

```
build/
├── client/              # Frontend React app
│   └── src/
│       └── pages/
│           └── admin/
│               └── TeamMembers.tsx  # ✨ Updated!
├── server/              # Backend API
├── dist/                # Built files
├── .env                 # Environment variables
├── deploy.sh            # Railway deployment script
└── README.md            # This file
```

## 🛠️ Environment Variables

Required variables in `.env`:

```env
DATABASE_URL="${{Postgres.DATABASE_URL}}"
JWT_SECRET="your-jwt-secret"
NODE_ENV="production"
R2_ACCESS_KEY_ID="your-r2-access-key"
R2_ACCOUNT_ID="your-r2-account-id"
R2_BUCKET_NAME="buildo-images"
R2_PUBLIC_URL="https://pub-xxx.r2.dev"
R2_SECRET_ACCESS_KEY="your-r2-secret"
RESEND_API_KEY="your-resend-api-key"
```

## 📖 Documentation

- `FINAL_INSTRUCTIONS.md` - Complete deployment instructions
- `GIT_PUSH_GUIDE.md` - Git push guide
- `DEPLOYMENT_GUIDE.md` - Railway deployment guide

## 🎯 Features

### Admin Dashboard
- Projects management
- Services management
- Blog posts management
- **Team members management** ✨ (New!)
- Testimonials management
- Partners management
- Contact messages
- Settings

### Public Website
- Home page
- Projects showcase
- Services page
- About Us (with team members) ✨
- Blog
- Contact form

## 🔧 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express, tRPC, PostgreSQL
- **Storage**: Cloudflare R2
- **Email**: Resend
- **Deployment**: Railway
- **Database**: PostgreSQL (Railway)

## 👥 Team Members Feature

### Admin Panel (`/admin/team`)
- Add new team members
- Edit existing members
- Delete members
- Upload member photos to R2
- Bilingual support (Dutch/English)
- Fields:
  - Name
  - Position (NL + EN)
  - Bio (NL + EN)
  - Email
  - Phone
  - Photo

### Public Display (`/over-ons`)
- Professional team grid
- Responsive design
- Hover effects
- Bilingual support

## 🚀 Ready to Deploy!

The project is fully built and ready for deployment:

1. ✅ All files committed to Git
2. ✅ Application built successfully
3. ✅ No errors
4. ⏳ Just add remote and push!

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Railway will automatically deploy! 🎉

## 📞 Support

For issues or questions, check the documentation files:
- `FINAL_INSTRUCTIONS.md`
- `GIT_PUSH_GUIDE.md`

---

**Built with ❤️ for BuildCraft**

