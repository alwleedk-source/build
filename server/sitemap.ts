import { Router } from 'express';
import { getDb } from './db';
import { projects, services, blogPosts } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const router = Router();

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

function generateSitemapXML(urls: SitemapURL[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

// Main sitemap
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL || 'https://build-production-09b2.up.railway.app';
    const db = await getDb();

    if (!db) {
      console.error('Database connection failed');
      return res.status(500).send('Database connection failed');
    }

    const urls: SitemapURL[] = [];

    // Static pages
    urls.push(
      { loc: baseUrl, changefreq: 'daily', priority: 1.0 },
      { loc: `${baseUrl}/projecten`, changefreq: 'weekly', priority: 0.9 },
      { loc: `${baseUrl}/diensten`, changefreq: 'weekly', priority: 0.9 },
      { loc: `${baseUrl}/over-ons`, changefreq: 'monthly', priority: 0.8 },
      { loc: `${baseUrl}/blog`, changefreq: 'daily', priority: 0.8 },
    );

    // Projects
    const allProjects = await db.select({
      slug: projects.slug,
      updatedAt: projects.updatedAt,
    }).from(projects);

    allProjects.forEach(project => {
      urls.push({
        loc: `${baseUrl}/projects/${project.slug}`,
        lastmod: project.updatedAt.toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.7,
      });
    });

    // Services
    const allServices = await db.select({
      slug: services.slug,
      updatedAt: services.updatedAt,
    }).from(services);

    allServices.forEach(service => {
      urls.push({
        loc: `${baseUrl}/diensten/${service.slug}`,
        lastmod: service.updatedAt.toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.7,
      });
    });

    // Blog posts (published only)
    const publishedPosts = await db.select({
      slug: blogPosts.slug,
      updatedAt: blogPosts.updatedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.published, true));

    publishedPosts.forEach(post => {
      urls.push({
        loc: `${baseUrl}/blog/${post.slug}`,
        lastmod: post.updatedAt.toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.6,
      });
    });

    const xml = generateSitemapXML(urls);

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

export default router;

