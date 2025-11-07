# BuildCraft Pro - Professional Construction Website

A complete construction company website with admin dashboard, built with React, TypeScript, tRPC, and Drizzle ORM.

## Features

- 🏗️ **Full-stack Application**: React frontend + Express backend
- 📊 **Admin Dashboard**: Complete CRUD operations for all content
- 🖼️ **Cloudflare R2 Integration**: Image upload system
- 📧 **Email System**: Resend integration for contact forms
- 🔒 **Spam Protection**: Rate limiting and duplicate detection
- 🎨 **Professional Design**: Socialectric-inspired golden theme
- 📱 **Responsive**: Works on all devices
- 🌐 **Dutch Language**: Complete Dutch interface

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui
- **Backend**: Express, tRPC, Drizzle ORM
- **Database**: MySQL/TiDB
- **Storage**: Cloudflare R2 (S3-compatible)
- **Email**: Resend API
- **Deployment**: Railway (Docker)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Cloudflare R2
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_URL=https://your-bucket.r2.dev

# Resend Email
RESEND_API_KEY=re_your_api_key

# JWT Secret (for session management)
JWT_SECRET=your_random_secret_key_min_32_chars

# App Configuration
VITE_APP_TITLE=BuildCraft - Professional Construction Services
VITE_APP_LOGO=https://your-logo-url.com/logo.png
VITE_APP_ID=your_unique_app_id
BASE_URL=https://your-domain.com
```

## Local Development

1. **Install dependencies**:
```bash
pnpm install
```

2. **Set up environment variables**:
   - Create `.env` file in root directory
   - Fill in all required values (see above)

3. **Run database migrations**:
```bash
pnpm db:push
```

4. **Start development server**:
```bash
pnpm dev
```

5. **Access the application**:
   - Website: http://localhost:3000
   - Admin: http://localhost:3000/login
   - Username: `admin`
   - Password: `BuildCraft2024!`

## Production Build

```bash
# Build the application
pnpm build

# Start production server
node dist/index.js
```

## Railway Deployment

### Prerequisites
- Railway account
- MySQL database (Railway MySQL or external)
- Cloudflare R2 bucket
- Resend API key

### Deployment Steps

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

2. **Create Railway Project**:
   - Go to [Railway](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Environment Variables in Railway**:
```env
# Database (Railway will auto-generate this)
DATABASE_URL=${{MySQL.DATABASE_URL}}

# Cloudflare R2
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_URL=https://your-bucket.r2.dev

# Resend Email
RESEND_API_KEY=re_your_api_key

# JWT Secret (generate random string)
JWT_SECRET=your_random_secret_key_here

# App Configuration
VITE_APP_TITLE=BuildCraft - Professional Construction Services
VITE_APP_LOGO=https://your-logo-url.com/logo.png
VITE_APP_ID=your_unique_app_id
BASE_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}

# Node Environment
NODE_ENV=production
```

4. **Add MySQL Database**:
   - Click "New" → "Database" → "Add MySQL"
   - Railway will automatically set `DATABASE_URL`

5. **Deploy**:
   - Railway will automatically detect `Dockerfile`
   - Build and deployment will start automatically
   - Wait for deployment to complete

6. **Run Database Migrations**:
   - After first deployment, open Railway service
   - Go to Settings → Deploy
   - Run one-time command: `pnpm db:push`

### Post-Deployment

1. **Test the website**: Visit your Railway URL
2. **Login to admin**: Go to `/login`
3. **Upload images**: Test R2 integration in admin panel
4. **Test contact form**: Verify email delivery

## Project Structure

```
buildcraft-pro/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── lib/           # Utilities
│   └── public/            # Static assets
├── server/                # Backend Express application
│   ├── _core/            # Core server functionality
│   ├── routers.ts        # tRPC routers
│   ├── db.ts             # Database queries
│   ├── r2.ts             # Cloudflare R2 integration
│   └── email.ts          # Email service
├── drizzle/              # Database schema and migrations
├── shared/               # Shared types and constants
├── Dockerfile            # Docker configuration
├── railway.json          # Railway configuration
└── package.json          # Dependencies and scripts
```

## Admin Features

- **Projects Management**: Add, edit, delete, reorder projects
- **Services Management**: Manage services with drag & drop
- **Blog Management**: Create and publish blog posts
- **Partners Management**: Add partner logos
- **Testimonials**: Manage customer reviews
- **Settings**: Configure site settings, colors, SEO
- **Messages**: View contact form submissions
- **Email Settings**: Configure SMTP and auto-replies

## Authentication

The application uses simple username/password authentication:
- Default username: `admin`
- Default password: `BuildCraft2024!`

To change credentials, update the login logic in `server/routers.ts`.

## Support

For issues or questions:
- GitHub Issues: https://github.com/alwleedk-source/build/issues

## License

MIT License - see LICENSE file for details
