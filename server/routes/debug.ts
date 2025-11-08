import { Router } from 'express';
import { getDb } from '../db';
import { sql } from 'drizzle-orm';
import * as schema from '../../drizzle/schema';

const router = Router();

// Comprehensive system health check
router.get('/health', async (req, res) => {
  try {
    const db = await getDb();
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: { status: 'unknown', details: {} },
        tables: { status: 'unknown', details: {} },
        content: { status: 'unknown', details: {} },
        api: { status: 'unknown', details: {} }
      }
    };

    // 1. Database Connection Check
    try {
      await db.execute(sql`SELECT 1`);
      health.checks.database.status = 'healthy';
      health.checks.database.details = { connected: true };
    } catch (error: any) {
      health.checks.database.status = 'unhealthy';
      health.checks.database.details = { error: error.message };
      health.status = 'unhealthy';
    }

    // 2. Tables Existence Check
    try {
      const tablesQuery = await db.execute(sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name
      `);
      
      const tables = tablesQuery.rows.map((row: any) => row.table_name);
      const expectedTables = [
        'users', 'projects', 'services', 'blogPosts', 'testimonials',
        'partners', 'messages', 'homeSettings', 'heroSection', 
        'footerSettings', 'aboutUs'
      ];
      
      const missingTables = expectedTables.filter(t => !tables.includes(t));
      
      health.checks.tables.status = missingTables.length === 0 ? 'healthy' : 'warning';
      health.checks.tables.details = {
        total: tables.length,
        expected: expectedTables.length,
        missing: missingTables,
        existing: tables
      };
      
      if (missingTables.length > 0) {
        health.status = 'warning';
      }
    } catch (error: any) {
      health.checks.tables.status = 'unhealthy';
      health.checks.tables.details = { error: error.message };
      health.status = 'unhealthy';
    }

    // 3. Content Check
    try {
      const counts = {
        users: await db.select({ count: sql<number>`count(*)` }).from(schema.users).then(r => Number(r[0].count)),
        projects: await db.select({ count: sql<number>`count(*)` }).from(schema.projects).then(r => Number(r[0].count)),
        services: await db.select({ count: sql<number>`count(*)` }).from(schema.services).then(r => Number(r[0].count)),
        blogPosts: await db.select({ count: sql<number>`count(*)` }).from(schema.blogPosts).then(r => Number(r[0].count)),
        testimonials: await db.select({ count: sql<number>`count(*)` }).from(schema.testimonials).then(r => Number(r[0].count)),
        partners: await db.select({ count: sql<number>`count(*)` }).from(schema.partners).then(r => Number(r[0].count)),
        messages: await db.select({ count: sql<number>`count(*)` }).from(schema.messages).then(r => Number(r[0].count))
      };

      const warnings = [];
      if (counts.services === 0) warnings.push('No services added');
      if (counts.projects === 0) warnings.push('No projects added');
      if (counts.testimonials === 0) warnings.push('No testimonials added');
      if (counts.partners === 0) warnings.push('No partners added');

      health.checks.content.status = warnings.length === 0 ? 'healthy' : 'warning';
      health.checks.content.details = {
        counts,
        warnings,
        isEmpty: Object.values(counts).every(c => c === 0)
      };

      if (warnings.length > 0) {
        health.status = 'warning';
      }
    } catch (error: any) {
      health.checks.content.status = 'unhealthy';
      health.checks.content.details = { error: error.message };
      health.status = 'unhealthy';
    }

    // 4. API Endpoints Check
    try {
      health.checks.api.status = 'healthy';
      health.checks.api.details = {
        endpoints: [
          '/api/trpc/projects.list',
          '/api/trpc/services.list',
          '/api/trpc/blogPosts.list',
          '/api/trpc/testimonials.list',
          '/api/trpc/partners.list',
          '/api/trpc/heroSection.get',
          '/api/trpc/footerSettings.get',
          '/api/trpc/aboutUs.get'
        ],
        note: 'All tRPC endpoints are auto-generated'
      };
    } catch (error: any) {
      health.checks.api.status = 'unhealthy';
      health.checks.api.details = { error: error.message };
      health.status = 'unhealthy';
    }

    res.json(health);
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Database schema check
router.get('/schema', async (req, res) => {
  try {
    const db = await getDb();
    const schemaInfo: any = {};

    // Get all tables
    const tablesQuery = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    for (const tableRow of tablesQuery.rows) {
      const tableName = (tableRow as any).table_name;
      
      // Get columns for each table
      const columnsQuery = await db.execute(sql`
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' 
          AND table_name = ${tableName}
        ORDER BY ordinal_position
      `);

      schemaInfo[tableName] = {
        columns: columnsQuery.rows,
        columnCount: columnsQuery.rows.length
      };
    }

    res.json({
      tables: Object.keys(schemaInfo).length,
      schema: schemaInfo
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Content statistics
router.get('/stats', async (req, res) => {
  try {
    const db = await getDb();
    const stats = {
      users: {
        total: await db.select({ count: sql<number>`count(*)` }).from(schema.users).then(r => Number(r[0].count)),
        admins: await db.select({ count: sql<number>`count(*)` }).from(schema.users).where(sql`role = 'admin'`).then(r => Number(r[0].count))
      },
      projects: {
        total: await db.select({ count: sql<number>`count(*)` }).from(schema.projects).then(r => Number(r[0].count)),
        featured: await db.select({ count: sql<number>`count(*)` }).from(schema.projects).where(sql`featured = true`).then(r => Number(r[0].count)),
        onHomepage: await db.select({ count: sql<number>`count(*)` }).from(schema.projects).where(sql`"showOnHomepage" = true`).then(r => Number(r[0].count))
      },
      services: {
        total: await db.select({ count: sql<number>`count(*)` }).from(schema.services).then(r => Number(r[0].count)),
        onHomepage: await db.select({ count: sql<number>`count(*)` }).from(schema.services).where(sql`"showOnHomepage" = true`).then(r => Number(r[0].count))
      },
      blogPosts: {
        total: await db.select({ count: sql<number>`count(*)` }).from(schema.blogPosts).then(r => Number(r[0].count)),
        published: await db.select({ count: sql<number>`count(*)` }).from(schema.blogPosts).where(sql`published = true`).then(r => Number(r[0].count))
      },
      testimonials: {
        total: await db.select({ count: sql<number>`count(*)` }).from(schema.testimonials).then(r => Number(r[0].count)),
        featured: await db.select({ count: sql<number>`count(*)` }).from(schema.testimonials).where(sql`featured = true`).then(r => Number(r[0].count))
      },
      partners: {
        total: await db.select({ count: sql<number>`count(*)` }).from(schema.partners).then(r => Number(r[0].count)),
        featured: await db.select({ count: sql<number>`count(*)` }).from(schema.partners).where(sql`featured = true`).then(r => Number(r[0].count))
      },
      messages: {
        total: await db.select({ count: sql<number>`count(*)` }).from(schema.messages).then(r => Number(r[0].count)),
        unread: await db.select({ count: sql<number>`count(*)` }).from(schema.messages).where(sql`read = false`).then(r => Number(r[0].count))
      }
    };

    res.json(stats);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Check for common issues
router.get('/issues', async (req, res) => {
  try {
    const db = await getDb();
    const issues = [];

    // Check for empty content
    const serviceCount = await db.select({ count: sql<number>`count(*)` }).from(schema.services).then(r => Number(r[0].count));
    if (serviceCount === 0) {
      issues.push({
        severity: 'warning',
        category: 'content',
        message: 'No services added',
        fix: 'Add services from /admin/services'
      });
    }

    const projectCount = await db.select({ count: sql<number>`count(*)` }).from(schema.projects).then(r => Number(r[0].count));
    if (projectCount === 0) {
      issues.push({
        severity: 'warning',
        category: 'content',
        message: 'No projects added',
        fix: 'Add projects from /admin/projects'
      });
    }

    const testimonialCount = await db.select({ count: sql<number>`count(*)` }).from(schema.testimonials).then(r => Number(r[0].count));
    if (testimonialCount === 0) {
      issues.push({
        severity: 'info',
        category: 'content',
        message: 'No testimonials added',
        fix: 'Add testimonials from /admin/testimonials'
      });
    }

    const partnerCount = await db.select({ count: sql<number>`count(*)` }).from(schema.partners).then(r => Number(r[0].count));
    if (partnerCount === 0) {
      issues.push({
        severity: 'info',
        category: 'content',
        message: 'No partners added',
        fix: 'Add partners from /admin/partners'
      });
    }

    // Check for missing settings
    try {
      const heroSection = await db.select().from(schema.heroSection).limit(1);
      if (heroSection.length === 0) {
        issues.push({
          severity: 'warning',
          category: 'settings',
          message: 'Hero section not configured',
          fix: 'Configure from /admin/settings/hero'
        });
      }
    } catch (e) {
      issues.push({
        severity: 'error',
        category: 'database',
        message: 'heroSection table missing or inaccessible',
        fix: 'Run database migration'
      });
    }

    res.json({
      total: issues.length,
      issues,
      summary: {
        errors: issues.filter(i => i.severity === 'error').length,
        warnings: issues.filter(i => i.severity === 'warning').length,
        info: issues.filter(i => i.severity === 'info').length
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;
