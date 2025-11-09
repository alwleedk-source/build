import { Router } from 'express';
import { getDb } from './db';
import { projects } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const router = Router();

router.post('/fix-project-images', async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    // Fix Villa Amsterdam Noord - use proper image URL
    await db.update(projects)
      .set({
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=800&q=80',
        ])
      })
      .where(eq(projects.slug, 'villa-amsterdam-noord'));

    // Add images to other projects
    await db.update(projects)
      .set({
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
        ])
      })
      .where(eq(projects.slug, 'kantoorpand-rotterdam'));

    await db.update(projects)
      .set({
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1502672260066-6bc35f0a1e1e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        ])
      })
      .where(eq(projects.slug, 'appartementencomplex-utrecht'));

    await db.update(projects)
      .set({
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
        ])
      })
      .where(eq(projects.slug, 'woonhuis-den-haag'));

    res.json({
      success: true,
      message: 'Project images fixed and gallery added',
      projectsUpdated: 4
    });
  } catch (error: any) {
    console.error('Fix project images error:', error);
    res.status(500).json({
      error: 'Failed to fix project images',
      details: error.message
    });
  }
});

export default router;
