import { db } from './db';

export async function generateSitemap(): Promise<string> {
  const baseUrl = process.env.BASE_URL || 'https://build-production-09b2.up.railway.app';
  
  // Get all projects
  const projects = await db.getAllProjects();
  
  // Get all services
  const services = await db.getAllServices();
  
  // Get all blog posts
  const blogPosts = await db.getAllBlogPosts();

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/diensten', priority: '0.9', changefreq: 'weekly' },
    { url: '/projecten', priority: '0.9', changefreq: 'weekly' },
    { url: '/over-ons', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
  ];

  const dynamicPages = [
    ...services.map(service => ({
      url: `/diensten/${service.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: service.updatedAt || service.createdAt,
    })),
    ...blogPosts.map(post => ({
      url: `/blog/${post.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: post.updatedAt || post.createdAt,
    })),
  ];

  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${new Date(page.lastmod).toISOString()}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}
