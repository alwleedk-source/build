import { Router } from 'express';
import { getDb } from './db.js';
import { footerSettings } from '../drizzle/schema.js';

const router = Router();

router.post('/seed-footer', async (req, res) => {
  try {
    const db = getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not initialized' });
    }

    // Check if footer settings already exist
    const existing = await db.select().from(footerSettings).limit(1);
    
    if (existing.length > 0) {
      return res.json({ 
        success: true, 
        message: 'Footer settings already exist',
        data: existing[0]
      });
    }

    // Insert default footer settings
    const [result] = await db.insert(footerSettings).values({
      companyName: 'BuildCraft',
      companyDescription: 'Uw betrouwbare partner voor alle bouw- en onderhoudswerkzaamheden in Nederland.',
      companyDescriptionEn: 'Your trusted partner for all construction and maintenance work in the Netherlands.',
      address: 'Bouwstraat 123\n1234 AB Amsterdam\nNederland',
      phone: '+31 6 1234 5678',
      email: 'info@buildcraft.nl',
      facebookUrl: 'https://facebook.com/buildcraft',
      twitterUrl: 'https://twitter.com/buildcraft',
      linkedinUrl: 'https://linkedin.com/company/buildcraft',
      instagramUrl: 'https://instagram.com/buildcraft',
      youtubeUrl: 'https://youtube.com/@buildcraft',
      copyrightText: '© 2024 BuildCraft. Alle rechten voorbehouden.',
      copyrightTextEn: '© 2024 BuildCraft. All rights reserved.',
    }).returning();

    res.json({
      success: true,
      message: 'Footer settings created successfully',
      data: result
    });
  } catch (error: any) {
    console.error('Seed footer error:', error);
    res.status(500).json({ 
      error: 'Failed to seed footer settings',
      message: error.message 
    });
  }
});

export default router;
